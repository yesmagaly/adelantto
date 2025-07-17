import {
  IonContent,
  IonPage,
  useIonRouter,
  IonHeader,
  IonFooter,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import { MaterialIcon } from "@adelantto/core";
import { useAddApplicationMutation } from "@adelantto/store";
import { hasAtLeastMonthsRemaining } from "@adelantto/utils";

type T_form = {
  lease_monthly_income: number;
  lease_start_date: string;
  lease_end_date: string;
  lease_payment_method: string;

  accept_privacy_policy: boolean;
};

export const MIN_MONTHS_REMAINING = 3;

const LeaseContract: React.FC = () => {
  const router = useIonRouter();
  const [mutation] = useAddApplicationMutation();
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    control,
  } = useForm<T_form>();

  const onSubmit = async (form: T_form) => {
    try {
      const response = await mutation(form).unwrap();
      router.push(`/applications/${response.id}/desired-loan`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h5">
          <Link to="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </Link>
          Solicita tu AdelanttoCash®
        </h1>
        <p className="mt-1 text-dark-gray text-sm">
          Ingresa tus datos de arrendamiento para poder ver la pre-oferta de tu
          AdelanttoCash®
        </p>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="flex justify-between items-center">
          <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h6">
            Contrato de renta
          </h1>
          <span className="badge badge-primary badge-sm">Paso 1/ 2</span>
        </div>
        <progress
          className="mt-2 mb-4 w-full h-[5px] text-indigo-300 progress"
          value="50"
          max="100"
        ></progress>

        <form
          id="form"
          className="gap-4 grid"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="control">
            <label className="control-label">
              Valor de la renta mensual (después de la cuota de mantenimiento)
            </label>
            <Controller
              rules={{
                validate: {
                  greaterThan: (v) =>
                    v >= 15000 || "El monto mínimo es de $15,000 MXN",
                },
              }}
              control={control}
              name="lease_monthly_income"
              render={({ field: { ref, onChange } }) => (
                <NumericFormat
                  onChange={(value) => {
                    const normalizedValue = parseFloat(
                      value.target.value.replaceAll(/\,|\$|\s/g, "")
                    );

                    onChange(normalizedValue);
                  }}
                  className="w-full pattern-format input validator"
                  type="text"
                  required
                  getInputRef={ref}
                  decimalScale={2}
                  thousandSeparator=","
                  prefix={"$"}
                  placeholder="$00,000.00"
                  aria-invalid={errors.lease_monthly_income ? "true" : "false"}
                />
              )}
            />
            <p className="hidden validator-hint">
              {errors?.lease_monthly_income?.message}
            </p>
          </div>

          <div className="control">
            <label className="control-label">
              Fecha de inicio del contrato
            </label>
            <input
              {...register("lease_start_date")}
              type="date"
              required
              className="input validator"
            />
          </div>

          <div className="control">
            <label className="control-label">Fecha de fin del contrato</label>
            <input
              {...register("lease_end_date", {
                validate: (value) =>
                  hasAtLeastMonthsRemaining(value, MIN_MONTHS_REMAINING) ||
                  `El tiempo restante de su contrato debe ser mayor o igual a ${MIN_MONTHS_REMAINING} meses respecto a la fecha actual`,
              })}
              type="date"
              required
              className="input validator"
              aria-invalid={errors.lease_end_date ? "true" : "false"}
            />
            <p className="hidden validator-hint">
              {errors.lease_end_date?.message}
            </p>
          </div>

          <div className="control">
            <h4 className="control-label">
              ¿Cómo recibes el pago de tu renta?
            </h4>
            <div className="flex items-center gap-6">
              <label className="label">
                <input
                  {...register("lease_payment_method")}
                  type="radio"
                  value="cash"
                  className="radio radio-sm validator"
                  required
                />
                <span className="text-sm">Efectivo</span>
              </label>
              <label className="label">
                <input
                  {...register("lease_payment_method")}
                  type="radio"
                  id="payment_transfer"
                  value="transfer"
                  className="radio validator radio-sm"
                  required
                />
                <span className="text-sm">Transferencia</span>
              </label>
            </div>
          </div>

          <label className="label">
            <input
              {...register("accept_privacy_policy")}
              type="checkbox"
              id="agreement"
              className="rounded-sm checkbox checkbox-sm validator"
              required
            />
            <span className="text-xs text-wrap">
              He leído y estoy de acuerdo con los{" "}
              <Link
                to="https://adelanttocash.com/terminos-y-condiciones"
                target="_blank"
                className="text-emerald-700 link"
              >
                Términos y Condiciones
              </Link>
            </span>
          </label>
        </form>
      </IonContent>

      <IonFooter className="ion-padding">
        <button
          type="submit"
          form="form"
          disabled={isSubmitting}
          className="btn-block btn btn-primary"
        >
          Ver Pre-Oferta AdelanttoCash®
        </button>
      </IonFooter>
    </IonPage>
  );
};

export default LeaseContract;
