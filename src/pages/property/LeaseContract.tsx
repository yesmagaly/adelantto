import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import { API_SERVER_URL } from "../../config";
import { useAuth } from "../auth/authContext";
import { NumericFormat } from "react-number-format";
import * as Page from "../../components/page";

import { applications } from "../../api";

function removeNumericFormat(value: string) {
  return parseFloat(value.replaceAll(/\,|\$|\s/g, ""));
}

function addMonths(date: any, months: number) {
  date.setMonth(date.getMonth() + months);

  return date;
}

function parseDate(str: string) {
  const [year, month, day] = str.split("-").map(i => Number.parseInt(i));
  
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

const LeaseContract: React.FC = () => {
  const router = useIonRouter();
  const { authInfo } = useAuth()!;

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async ({ lease_monthly_income, ...data }: any) => {
    // Validate minimum period of contract time
    if (!validateMinContractTime(data.lease_start_date, data.lease_end_date)) {
      return setError("lease_end_date", {
        message: "El contrato mínimo es de 6 meses",
      });
    }

    const response = await applications.leaseContract({
      lease_monthly_income: removeNumericFormat(lease_monthly_income),
      ...data,
    });

    const application = await response.json();

    if (response.status === 200) {
      router.push(`/applications/${application.id}/desired-loan`);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Page.Root>
            <Page.Header className="text-center">
              <div className="heading heading--blue">
                <h1 className="heading-3">
                  Datos de contrato <strong>de arrendamiento</strong>
                </h1>
              </div>
            </Page.Header>
            <Page.Body>
              <div className="form-control is-center">
                <label>Valor de tu renta mensual</label>
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
                      className="pattern-format"
                      type="text"
                      required
                      getInputRef={ref}
                      decimalScale={2}
                      a
                      thousandSeparator=","
                      prefix={"$"}
                    />
                  )}
                />
                {errors?.lease_monthly_income && (
                  <div className="description">
                    {errors?.lease_monthly_income?.message}
                  </div>
                )}
              </div>

              <div className="form-control is-center">
                <label>Fecha de inicio del contrato de arrendamiento</label>
                <input
                  {...register("lease_start_date")}
                  type="date"
                  required
                  placeholder=""
                />
              </div>

              <div className="form-control is-center">
                <label>Fecha de fin del contrato de arrendamiento</label>
                <input {...register("lease_end_date")} type="date" required />

                {errors?.lease_end_date && (
                  <div className="description is-danger">
                    {errors.lease_end_date?.message}
                  </div>
                )}
              </div>
              <div className="form-control is-center">
                <label>Código postal de tu inmueble</label>
                <input
                  {...register("property_zip_code")}
                  type="text"
                  placeholder=""
                  required
                />
              </div>

              <div className="form-control is-center is-inline">
                <h4 className="mb-2 font-medium">
                  ¿Cómo recibes el pago de tu renta?
                </h4>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <input
                      {...register("lease_payment_method")}
                      type="radio"
                      id="payment_cash"
                      value="cash"
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
                      required
                    />
                    <label className="ml-2" htmlFor="payment_transfer">
                      Transferencia
                    </label>
                  </div>

                </div>
              </div>
            </Page.Body>
            <Page.Footer>
              <button className="button is-primary">Siguiente</button>
            </Page.Footer>
          </Page.Root>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default LeaseContract;
