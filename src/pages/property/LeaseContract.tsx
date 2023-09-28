import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import { API_SERVER_URL } from "../../config";
import { useAuth } from "../auth/authContext";

const LeaseContract: React.FC = () => {
  const router = useIonRouter();
  const { authInfo } = useAuth()!;

  const {
    handleSubmit,
    register,
    formState: { },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch(`${API_SERVER_URL}/api/leasing-contracts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authInfo.user.token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(data),
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

        <div>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input {...register("monthly_lease_income")} type="numeric" placeholder="valor de tu renta mensual" required />
            </div>
            <div className="border-full !mt-0" />

            <div>
              <input {...register("lease_start_date")} type="date" required placeholder="Fecha de inicio del contrato de arrendamiento" />
            </div>
            <div className="border-full !mt-0" />

            <div>
              <input {...register("lease_end_date")} type="date"
                placeholder="Fecha de fin del contrato de arrendamiento"
                required
              />
            </div>
            <div className="border-full !mt-0" />

            <div>
              <input
                {...register("property_zip_code")}
                type="text"
                placeholder="Código postal de tu inmueble"
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
