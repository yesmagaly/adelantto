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

            <div className="mb-8 font-bold text-[16px]">
              ¿Cómo recibes el pago de tu renta?
              <div className="text-[12px] py-8 ">
                <IonCheckbox labelPlacement="end"> Efectivo </IonCheckbox>
                <IonCheckbox labelPlacement="end"> Transferencia </IonCheckbox>
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
