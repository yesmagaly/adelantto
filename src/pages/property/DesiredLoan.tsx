import { useState, useEffect } from "react";
import { IonContent, IonFooter, IonPage, useIonRouter } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import { applications } from "../../api";
import { atLeastThreeMonths } from "./LeaseContract";
import { useForm } from "react-hook-form";
import {
  T_application,
  useLazyGetApplicationQuery,
  useLazyGetOfferQuery,
  useUpdateApplicationMutation,
} from "@adelantto/store";
import { cn } from "@adelantto/utils";

type T_form = T_application & {
  desired_loan_term_frame?: number;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(value);
}

interface DesiredLoanProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const DesiredLoan: React.FC<DesiredLoanProps> = ({ match }) => {
  const router = useIonRouter();
  const [trigger, { data: application, isLoading }] =
    useLazyGetApplicationQuery();
  const [mutation] = useUpdateApplicationMutation();
  const [getLazyOffer, { data: offer }] = useLazyGetOfferQuery();
  const [options, setOptions] = useState<Array<number>>([]);

  const { register, setValue, handleSubmit, watch } = useForm<T_form>({
    defaultValues: async () => await trigger(match.params.id).unwrap(),
  });

  const desired_loan_term_frame = watch("desired_loan_term_frame");

  useEffect(() => {
    if (application?.lease_end_date) {
      setOptions(
        [3, 6, 8, 12].filter((value) =>
          atLeastThreeMonths(application.lease_end_date, value)
        )
      );
    }
  }, [application]);

  useEffect(() => {
    const fetchLoanContract = async () => {
      if (desired_loan_term_frame && application?.lease_monthly_income) {
        const data = await getLazyOffer({
          principal: application.lease_monthly_income * desired_loan_term_frame,
          months: desired_loan_term_frame,
        }).unwrap();

        setValue("pre_offer_amount", data.principal);
        setValue("pre_offer_fees", data.fees);
        setValue("pre_offer_commissions", data.iva_commission);
        setValue("pre_offer_term_frame", months);
      }
    };
    fetchLoanContract();
  }, [desired_loan_term_frame]);

  const onSubmit = async (form: T_form) => {
    if (application?.lease_monthly_income && desired_loan_term_frame) {
      await mutation({
        ...form,
        desired_loan_amount:
          application.lease_monthly_income * desired_loan_term_frame,
      }).unwrap();

      router.push(`/applications/${match.params.id}/pre-offer`);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <form id="form" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-h6 text-center">Cantidad de meses</h3>
          <div className="flex gap-4">
            {!isLoading &&
              application &&
              options.map((value) => (
                <button
                  key={`dl-${value}`}
                  id={`desired-loan-${value}`}
                  type="button"
                  className={cn(
                    "btn btn-outline flex-1/4 h-30 rounded-xl",
                    value === desired_loan_term_frame && "btn-active"
                  )}
                  onClick={() => setValue("desired_loan_term_frame", value)}
                >
                  <div className="w-full text-2xl">{value}</div>
                </button>
              ))}
          </div>
          Definir manualmente
          {offer && (
            <div className="bg-blue-600 card">
              <div className="gap-4 card-body">
                <div className="text-white text-center">
                  <div className="text-emerald-300 text-h2">
                    {formatCurrency(offer.advance)} MXN
                  </div>
                  <p className="text-purple-200">Total que recibiras</p>
                </div>
                <div className="text-white text-center">
                  <div className="text-h4">
                    {formatCurrency(offer.principal)} MXN
                  </div>
                  <p className="text-purple-200">Total que pagarás</p>
                </div>
                <div className="text-white text-center">
                  <div className="text-h4">
                    {formatCurrency(offer.fees)} MXN
                  </div>
                  <p className="text-purple-200">MXN Pago de seguro</p>
                </div>
              </div>
            </div>
          )}
        </form>
      </IonContent>

      <IonFooter className="ion-padding">
        <button type="submit" form="form" className="btn-block btn btn-primary">
          Subir documentación
        </button>
      </IonFooter>
    </IonPage>
  );
};

export default DesiredLoan;
