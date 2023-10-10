import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import { API_SERVER_URL } from "../../config";
import { useAuth } from "../auth/authContext";
import { NumericFormat } from 'react-number-format';
import * as Page from "../../components/page"

function removeNumericFormat(value: string) {
  return parseFloat(value.replaceAll(/\,|\$|\s/g, ''));
}

function addMonths(date, months) {
  date.setMonth(date.getMonth() + months);

  return date;
}

function parseDate(str: string) {
  const [year, month, day] = str.split('-');
  return new Date(+year, month - 1, +day);
}

// Validate minimum period of contract time
function validateMinContractTime(startDateStr: string, endDateStr: string) {
  const minMonths = 6;
  const oneDayTimestamp = 86400000;
  const endDate = parseDate(endDateStr);
  const minEndDate = addMonths(parseDate(startDateStr), minMonths);

  return (minEndDate.getTime() - oneDayTimestamp) <= endDate.getTime();
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

  const onSubmit = async ({ monthly_lease_income, ...data }) => {
    // Validate minimum period of contract time
    if (!validateMinContractTime(data.lease_start_date, data.lease_end_date)) {
      return setError('lease_end_date', { message: "El contrato mínima es de 6 meses" })
    }

    const response = await fetch(`${API_SERVER_URL}/api/leasing-contracts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authInfo.user.token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({ monthly_lease_income: removeNumericFormat(monthly_lease_income), ...data }),
    });

    const leaseContract = await response.json();

    if (response.status === 200) {
      router.push(`/lease-contract/${leaseContract.id}/desired-loan`);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Page.Root>
            <Page.Header>
              <div className="heading heading--blue heading--center">
                <h1 className="text-4xl">
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
                      greaterThan: v => removeNumericFormat(v) >= 15000 || 'El monto mínimo es de $15,000 MXN',
                    }
                  }}
                  control={control}
                  name="monthly_lease_income"
                  render={({ field: { ref, ...field } }) => (
                    <NumericFormat
                      {...field}
                      className="pattern-format"
                      type="text"
                      required
                      getInputRef={ref}
                      decimalScale={2} a
                      thousandSeparator=","
                      prefix={'$'}
                    />
                  )}
                />
                {errors?.monthly_lease_income && (
                  <div className="description">
                    {errors?.monthly_lease_income?.message}
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
                <input
                  {...register("lease_end_date")}
                  type="date"
                  required
                />

                {errors?.lease_end_date && (
                  <div className="description is-danger">
                    {errors?.lease_end_date?.message}
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
                      {...register("payment_method")}
                      type="radio"
                      id="payment_cash"
                      value="cash"
                      required
                    />
                    <label className="ml-2" htmlFor="payment_cash">Efectivo</label>
                  </div>
                  <div>
                    <input
                      {...register("payment_method")}
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
              <button className="button button-primary">Siguiente</button>
            </Page.Footer>
          </Page.Root>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default LeaseContract;
