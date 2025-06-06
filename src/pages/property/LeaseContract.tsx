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
        <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h5">
          <a href="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </a>
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
            <a href="/" className="inline-flex items-center"></a>
            Contrato de renta
          </h1>
          <span className="badge badge-primary badge-sm">Paso 1/ 2</span>
        </div>
        <progress
          className="mt-2 mb-4 w-full h-[5px] text-indigo-300 progress"
          value="50"
          max="100"
        ></progress>

        <form className="gap-4 grid" onSubmit={handleSubmit(onSubmit)}>
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
                  className="w-full pattern-format input"
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
              className="input"
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
              className="input"
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
            <div className="flex items-center gap-6">
              <label className="label">
                <input
                  {...register("lease_payment_method")}
                  type="radio"
                  value="cash"
                  className="radio radio-sm"
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
                  className="radio radio-sm"
                  required
                />
                <span className="text-sm">Transferencia</span>
              </label>
            </div>
          </div>

          <label className="items-start gap-2 mt-2 label">
            <input
              type="checkbox"
              id="agreement"
              className="rounded-sm checkbox checkbox-sm"
              required
            />
            <span className="text-sm text-wrap">
              He leído y estoy de acuerdo con los{" "}
              <a
                href="https://adelanttocash.com/terminos-y-condiciones"
                target="_blank"
                className="text-emerald-700 link"
              >
                Términos y Condiciones
              </a>
            </span>
          </label>
        </form>
      </IonContent>
      <IonFooter>
        <button className="btn-block btn btn-primary">
          Ver Pre-Oferta AdelanttoCash®
        </button>
      </IonFooter>
    </IonPage>
  );
};

export default LeaseContract;
