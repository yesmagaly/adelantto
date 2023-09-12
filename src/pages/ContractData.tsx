import { IonContent, IonPage, IonCheckbox, useIonRouter } from "@ionic/react";

const ContractData: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue heading--center mb-7">
          <h1 className="text-[40px]">
            Datos de contrato <strong>de arrendamiento</strong>
          </h1>
        </div>

        <div>
          <form className="form">
            <input type="text" placeholder="valor de tu renta mensual" />
            <div className="border-full" />

            <input
              type="text"
              placeholder="Fecha de inicio del contrato de arrendamiento"
            />
            <div className="border-full" />

            <input
              type="text"
              placeholder="Fecha de fin del contrato de arrendamiento"
            />
            <div className="border-full" />

            <input type="text" placeholder="Código postal de tu inmueble" />

            <div className="border-full" />

            <div>
              <p className="mb-6 font-bold text-[16px]">
                ¿Cómo recibes el pago de tu renta?
              </p>
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center">
                  <input type="radio" />
                  <label
                    htmlFor="scales"
                    className="text-[12px] font-bold ml-2"
                  >
                    {" "}
                    Efectivo{" "}
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="radio" />
                  <label
                    htmlFor="scales"
                    className="text-[12px] font-bold ml-2"
                  >
                    {" "}
                    Transferencia{" "}
                  </label>
                </div>
              </div>
            </div>
            <button
              className="button button-primary mb-16"
              onClick={() => router.push("/verification-email")}
            >
              Siguiente
            </button>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ContractData;
