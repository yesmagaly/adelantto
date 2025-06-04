import {
  IonContent,
  IonPage,
  useIonRouter,
  IonHeader,
  IonFooter,
} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import * as Page from "../../components/page";

import { checkZipCode } from "../../api";
import { applications } from "../../api";
import { MaterialIcon } from "@adelantto/core";

function removeNumericFormat(value: string) {
  return parseFloat(value.replaceAll(/\,|\$|\s/g, ""));
}

function addMonths(date: any, months: number) {
  date.setMonth(date.getMonth() + months);

  return date;
}

function parseDate(str: string) {
  const [year, month, day] = str.split("-").map((i) => Number.parseInt(i));

  return new Date(+year, month - 1, +day);
}

// Validate minimum period of contract time
function validateMinContractTime(startDateStr: string, endDateStr: string) {
  const minMonths = 6;
  const oneDayTimestamp = 86400000;
  const endDate = parseDate(endDateStr);
  const minEndDate = addMonths(parseDate(startDateStr), minMonths);

  return minEndDate.getTime() - oneDayTimestamp <= endDate.getTime();
}

export function atLeastThreeMonths(end_date, months_number) {
  const date1 = new Date();
  const date2 = new Date(end_date);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const diffMonths = diffDays / 30.44;

  return diffMonths >= months_number;
}

type FormData = {
  lease_monthly_income: number;
  lease_maintenance_fee: number;
  lease_start_date: string;
  lease_end_date: string;
  lease_payment_method: string;
  lease_renting_time: number;
  property_zip_code: string;
};

const LeaseContract: React.FC = () => {
  const router = useIonRouter();

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
    control,
  } = useForm<FormData>();

  const onSubmit = async ({
    lease_monthly_income,
    lease_maintenance_fee,
    ...data
  }: any) => {
    const zipCodeResponse = await checkZipCode(data.property_zip_code);

    if (zipCodeResponse.status === 200) {
      const data = await zipCodeResponse.json();

      if (data.state !== "Ciudad de México") {
        return setError("property_zip_code", {
          message:
            "El código postal no pertenece al estado de Ciudad de México.",
        });
      }
    } else {
      return setError("property_zip_code", {
        message: "No es un código postal válido.",
      });
    }

    const response = await applications.leaseContract({
      lease_monthly_income: removeNumericFormat(lease_monthly_income),
      lease_maintenance_fee: removeNumericFormat(lease_maintenance_fee),
      ...data,
    });

    const application = await response.json();

    if (response.status === 200) {
      router.push(`/applications/${application.id}/desired-loan`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <h1 className="text-h5 text-dark-blue-700 gap-2 inline-flex items-center">
          <a href="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </a>
          Solicita tu AdelanttoCash®
        </h1>
        <p className="text-sm text-dark-gray mt-1">
          Ingresa tus datos de arrendamiento para poder ver la pre-oferta de tu
          AdelanttoCash®
        </p>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="flex items-center justify-between">
          <h1 className="text-h6 text-dark-blue-700 gap-2 inline-flex items-center">
            <a href="/" className="inline-flex items-center"></a>
            Contrato de renta
          </h1>
          <span className="badge badge-primary badge-sm">Paso 1/ 2</span>
        </div>
        <progress
          className="progress text-indigo-300 w-full h-[5px] mt-2 mb-4"
          value="50"
          max="100"
        ></progress>

        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="control">
            <label className="control-label">
              Valor de la renta mensual (después de la cuota de mantenimiento)
            </label>
            <Controller
              rules={{
                validate: {
                  greaterThan: (v) =>
                    removeNumericFormat(v) >= 15000 ||
                    "El monto mínimo es de $15,000 MXN",
                },
              }}
              control={control}
              name="lease_monthly_income"
              render={({ field: { ref, ...field } }) => (
                <NumericFormat
                  {...field}
                  className="pattern-format input w-full"
                  type="text"
                  required
                  getInputRef={ref}
                  decimalScale={2}
                  thousandSeparator=","
                  prefix={"$"}
                  placeholder="$00,000.00"
                />
              )}
            />
            {errors?.lease_monthly_income && (
              <div className="description">
                {errors?.lease_monthly_income?.message}
              </div>
            )}
          </div>

          <div className="control">
            <label className="control-label">
              Fecha de inicio del contrato
            </label>
            <input
              {...register("lease_start_date")}
              type="date"
              required
              placeholder=""
              className="input w-full"
            />
          </div>

          <div className="control">
            <label className="control-label">Fecha de fin del contrato</label>
            <input
              {...register("lease_end_date", {
                validate: {
                  atLeastSixMonths: (v) =>
                    atLeastThreeMonths(v, 6) ||
                    "El tiempo restante de su contrato debe ser mayor o igual a 6 meses",
                },
              })}
              type="date"
              required
              className="input w-full"
            />

            {errors?.lease_end_date && (
              <div className="description is-danger">
                {errors.lease_end_date?.message}
              </div>
            )}
          </div>

          <div className="control">
            <h4 className="control-label">
              ¿Cómo recibes el pago de tu renta?
            </h4>
            <div className="flex w-full items-center justify-between">
              <div>
                <input
                  {...register("lease_payment_method")}
                  type="radio"
                  id="payment_cash"
                  value="cash"
                  className="radio"
                  required
                />
                <label className="ml-2" htmlFor="payment_cash">
                  Efectivo
                </label>
              </div>
              <div>
                <input
                  {...register("lease_payment_method")}
                  type="radio"
                  id="payment_transfer"
                  value="transfer"
                  className="radio"
                  required
                />
                <label className="ml-2" htmlFor="payment_transfer">
                  Transferencia
                </label>
              </div>
            </div>
          </div>

          <div>
            <input
              type="checkbox"
              id="agreement"
              className="checkbox"
              required
            />
            <label className="control-label">
              He leído y estoy de acuerdo con los
              <a
                href="https://adelanttocash.com/terminos-y-condiciones"
                target="_blank"
                className="font-medium bold"
              >
                Términos y Condiciones
              </a>
            </label>
          </div>
        </form>
      </IonContent>
      <IonFooter>
        <button className="btn btn-primary btn-block">
          Ver Pre-Oferta AdelanttoCash®
        </button>
      </IonFooter>
    </IonPage>
  );
};

export default LeaseContract;
