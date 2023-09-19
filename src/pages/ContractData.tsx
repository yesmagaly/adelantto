import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const ContractData: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue heading--center mb-10">
          <h1 className="text-4xl">
            Datos de contrato <strong>de arrendamiento</strong>
          </h1>
        </div>

        <div>
          <form className="form">
            <div>
              <input type="text" placeholder="valor de tu renta mensual" />
            </div>
            <div className="border-full !mt-0" />

            <div>
              <input
                type="text"
                placeholder="Fecha de inicio del contrato de arrendamiento"
              />
            </div>
            <div className="border-full !mt-0" />

            <div>
              <input
                type="text"
                placeholder="Fecha de fin del contrato de arrendamiento"
              />
            </div>
            <div className="border-full !mt-0" />

            <div>
              <input type="text" placeholder="Código postal de tu inmueble" />
            </div>
            <div className="border-full !mt-0" />

            <div className="mt-6">
              <h4 className="mb-6 font-bold">
                ¿Cómo recibes el pago de tu renta?
              </h4>
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="payment_cash"
                    name="rent_payment"
                    value="cash"
                  />
                  <label htmlFor="payment_cash" className="text-xs font-bold">
                    Efectivo
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="payment_transfer"
                    name="rent_payment"
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
            <button
              className="button button-primary mb-10"
              onClick={() => router.push("/verification-email")}
            >
              Siguiente
            </button>
            <div className="border-bottom border-primary-blue" />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ContractData;
