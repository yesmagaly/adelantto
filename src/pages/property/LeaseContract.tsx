import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import { API_SERVER_URL } from "../../config";
import { useAuth } from "../auth/authContext";
import { NumericFormat } from 'react-number-format';

function removeNumericFormat(value: string) {
  return value.replaceAll(/\,|\$|\s/g, '');
}

const LeaseContract: React.FC = () => {
  const router = useIonRouter();
  const { authInfo } = useAuth()!;

  const {
    handleSubmit,
    register,
    formState: {},
    control,
  } = useForm();

  const onSubmit = async ({ monthly_lease_income, ...data}) => {
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
        <div className="heading heading--blue heading--center mb-10">
          <h1 className="text-4xl">
            Datos de contrato <strong>de arrendamiento</strong>
          </h1>
        </div>

        <div className="px-6 text-center text-sm">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Valor de tu renta mensual</label>
              <Controller
                control={control}
                name="monthly_lease_income"
                render={({ field: { ref, ...field } }) => (
                  <NumericFormat
                    {...field}
                    className="pattern-format"
                    type="text"
                    required
                    getInputRef={ref}
                    decimalScale={2}
                    thousandSeparator=","
                    prefix={'$ '}
                  />
                )}
              />
            </div>
            <div className="border-full !mt-0" />

            <div>
              <label>Fecha de inicio del contrato de arrendamiento</label>
              <input
                {...register("lease_start_date")}
                type="date"
                required
                placeholder=""
              />
            </div>
            <div className="border-full !mt-0" />

            <div>
              <label>Fecha de fin del contrato de arrendamiento</label>
              <input
                {...register("lease_end_date")}
                type="date"
                placeholder=""
                required
              />
            </div>

            <div className="border-full !mt-0" />

            <div>
              <label>Código postal de tu inmueble</label>
              <input
                {...register("property_zip_code")}
                type="text"
                placeholder=""
                required
              />
            </div>
            <div className="border-full !mt-0" />

            <div className="mt-6">
              <h4 className="mb-6 font-bold">
                ¿Cómo recibes el pago de tu renta?
              </h4>
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <input
                    {...register("payment_method")}
                    type="radio"
                    id="payment_cash"
                    value="cash"
                    required
                  />
                  <label htmlFor="payment_cash" className="text-xs font-bold">
                    Efectivo
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    {...register("payment_method")}
                    type="radio"
                    id="payment_transfer"
                    value="transfer"
                    required
                  />
                  <label
                    htmlFor="payment_transfer"
                    className="text-xs font-bold"
                  >
                    Transferencia
                  </label>
                </div>
              </div>
            </div>
            <button className="button button-primary mb-10">Siguiente</button>
            <div className="border-bottom border-primary-blue" />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LeaseContract;
