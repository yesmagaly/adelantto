import { IonContent, IonPage, IonCheckbox, useIonRouter } from "@ionic/react";

const ContractData: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue heading--center">
          <h1 className="text-[40px]">
            Datos de contrato <strong>de arrendamiento</strong>
          </h1>
        </div>

        <div className="content">
          <form className="form">
            <div className="mb-7">
              <input type="text" placeholder="valor de tu renta mensual" />

              <input
                type="text"
                placeholder="Fecha de inicio del contrato de arrendamiento"
              />

              <input
                type="text"
                placeholder="Fecha de fin del contrato de arrendamiento"
              />

              <input type="text" placeholder="Código postal de tu inmueble" />
            </div>

            <div className="mb-7">
              <strong>¿Cómo recibes el pago de tu renta?</strong>
              <div>
                <IonCheckbox labelPlacement="end">Efectivo</IonCheckbox>
                <IonCheckbox labelPlacement="end">Transparencia</IonCheckbox>
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
