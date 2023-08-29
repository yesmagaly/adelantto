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

        <div>
          <form className="form mb-7">
            <input type="text" placeholder="valor de tu renta mensual" />
          </form>
          <form className="form mb-7">
            <input
              type="text"
              placeholder="Fecha de inicio del contrato de arrendamiento"
            />
          </form>
          <form className="form mb-7">
            <input
              type="text"
              placeholder="Fecha de fin del contrato de arrendamiento"
            />
          </form>
          <form className="form mb-7">
            <input type="text" placeholder="Código postal de tu inmueble" />
          </form>
        </div>

        <strong>¿Cómo recibes el pago de tu renta?</strong>
        <div>
          <IonCheckbox labelPlacement="end">Efectivo</IonCheckbox>
          <IonCheckbox labelPlacement="end">Transparencia</IonCheckbox>
        </div>
        <button
          className="button-primary mb-16"
          onClick={() => router.push("/verification-email")}
        >
          Siguiente
        </button>
      </IonContent>
    </IonPage>
  );
};

export default ContractData;
