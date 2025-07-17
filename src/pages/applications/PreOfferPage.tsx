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
  useLazyGetApplicationQuery,
  useLazyGetOfferQuery,
  useUpdateApplicationMutation,
} from "@adelantto/store";
import { cn, formatCurrency } from "@adelantto/utils";
import { MaterialIcon } from "@adelantto/core";
import { Link } from "react-router-dom";

type T_form = {
  pre_offer_amount?: number;
  pre_offer_fees?: number;
  pre_offer_commissions?: number;
  pre_offer_term_frame?: number;
};

interface T_props
  extends RouteComponentProps<{
    id: string;
  }> {}

export const PreOfferPage: React.FC<T_props> = ({ match }) => {
  const router = useIonRouter();
  const [trigger, { data: application, isLoading }] =
    useLazyGetApplicationQuery();
  const [mutation] = useUpdateApplicationMutation();
  const [getLazyOffer, { data: offer }] = useLazyGetOfferQuery();
  const [options, setOptions] = useState<Array<number>>([]);

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<T_form>({
    defaultValues: async () => {
      try {
        const values = await trigger(match.params.id).unwrap();
        const options = [3, 6, 8, 12].filter((value) =>
          atLeastThreeMonths(values.lease_end_date, value)
        );

        setOptions(options);
        return values;
      } catch {
        return {};
      }
    },
  });

  const pre_offer_term_frame = watch("pre_offer_term_frame");

  useEffect(() => {
    if (application?.lease_end_date && !application?.pre_offer_term_frame) {
      setValue(
        "pre_offer_term_frame",
        options.length > 0 ? options[options.length - 1] : undefined
      );
    }
  }, [application, options]);

  useEffect(() => {
    const fetchLoanContract = async () => {
      if (pre_offer_term_frame && application?.lease_monthly_income) {
        const data = await getLazyOffer({
          principal: application.lease_monthly_income * pre_offer_term_frame,
          months: pre_offer_term_frame,
        }).unwrap();

        setValue("pre_offer_amount", data.principal);
        setValue("pre_offer_fees", data.fees);
        setValue("pre_offer_commissions", data.iva_commission);
      }
    };
    fetchLoanContract();
  }, [pre_offer_term_frame]);

  const onSubmit = async (form: T_form) => {
    await mutation(form).unwrap();
    router.push(`/applications/${match.params.id}/property-documents`);
  };

  return (
    <IonPage>
      <IonHeader>
        <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h5">
          <Link to="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </Link>
          Pre-Oferta AdelanttoCash®
        </h1>
        <p className="mt-1 text-dark-gray text-sm">
          Revisa aquí el cálculo preliminar de tu adelanto, incluyendo montos y
          costos, antes de iniciar la validación de documentos.
        </p>
      </IonHeader>

      <IonContent className="ion-padding">
        <form
          id="form"
          className="gap-4 grid"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-h6 text-center">Cantidad de meses</h3>
          <div className="flex justify-center gap-4">
            {!isLoading &&
              application &&
              options.map((value) => (
                <button
                  key={`dl-${value}`}
                  id={`desired-loan-${value}`}
                  type="button"
                  className={cn(
                    "flex-1/4 rounded-xl btn-outline max-w-1/4 h-30 btn",
                    value === pre_offer_term_frame && "btn-active"
                  )}
                  onClick={() => setValue("pre_offer_term_frame", value)}
                >
                  <div className="w-full text-2xl">{value}</div>
                </button>
              ))}
          </div>

          <h4 className="text-center link">Definir manualmente</h4>

          {offer && (
            <div className="bg-linear-to-r from-indigo-600 to-indigo-300 text-white card">
              <div className="gap-4 card-body">
                <div className="text-center">
                  <div className="text-emerald-300 text-h2">
                    {formatCurrency(offer.advance)} MXN
                  </div>
                  <p className="text-purple-200">Total que recibiras</p>
                </div>
                <div className="text-center">
                  <div className="text-h4">
                    {formatCurrency(offer.principal)} MXN
                  </div>
                  <p className="text-purple-200">Total que pagarás</p>
                </div>
                <div className="text-center">
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
        <button
          type="submit"
          form="form"
          disabled={isSubmitting}
          className="btn-block btn btn-primary"
        >
          Subir documentación
        </button>

        <p className="mt-4 text-gray-900 text-xs text-center text-wrap">
          He leído y estoy de acuerdo con el{" "}
          <Link
            to="https://adelanttocash.com/aviso-de-privacidad"
            target="_blank"
            className="text-emerald-700 no-underline link"
          >
            Aviso de Privacidad
          </Link>
        </p>
      </IonFooter>
    </IonPage>
  );
};
