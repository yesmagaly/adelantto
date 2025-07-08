import { useState, useEffect } from "react";
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { RouteComponentProps } from "react-router";

import { atLeastThreeMonths } from "./LeaseContract";
import { useForm } from "react-hook-form";
import {
  T_application,
  useLazyGetApplicationQuery,
  useLazyGetOfferQuery,
  useUpdateApplicationMutation,
} from "@adelantto/store";
import { cn, formatCurrency } from "@adelantto/utils";
import { MaterialIcon } from "@adelantto/core";

type T_form = T_application & {
  desired_loan_term_frame?: number;
};

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
      const options = [3, 6, 8, 12].filter((value) =>
        atLeastThreeMonths(application.lease_end_date, value)
      );

      setValue(
        "desired_loan_term_frame",
        options.length > 0 ? options[options.length - 1] : undefined
      );

      setOptions(options);
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

      router.push(`/applications/${match.params.id}/property-documents`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h5">
          <a href="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </a>
          Pre-Oferta AdelanttoCash®
        </h1>
        <p className="mt-1 text-dark-gray text-sm">
          Revisa aquí el cálculo preliminar de tu adelanto, incluyendo montos y
          costos, antes de iniciar la validación de documentos.
        </p>
      </IonHeader>

      <IonContent className="ion-padding">
        <form id="form" className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
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
          <h4 className="text-center underline font-semibold">
            Definir manualmente
          </h4>
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
                  <p className="text-purple-200">Pago de seguro</p>
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
        <span className="text-gray-900 text-xs text-wrap text-center">
          He leído y estoy de acuerdo con el{" "}
          <a
            href="https://adelanttocash.com/aviso-de-privacidad"
            target="_blank"
            className="text-emerald-800"
          >
            Aviso de Privacidad
          </a>
        </span>
      </IonFooter>
    </IonPage>
  );
};

export default DesiredLoan;
