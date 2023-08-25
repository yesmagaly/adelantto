import { IonContent, IonPage, IonCheckbox, useIonRouter } from "@ionic/react";

const ContractData: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <h1>
            Datos de contrato{" "}
            <strong>
              <br /> de arrendamiento
            </strong>
          </h1>
        </div>
        <form>
          <input type="" placeholder="Valor de tu renta mensual" />
        </form>
        <form>
          <input
            type=""
            placeholder="Fecha de inicio del contrato de arrendamiento"
          />
        </form>
        <form>
          <input
            type=""
            placeholder="Fecha de fin del contrato de arrendamiento"
          />
        </form>
        <form>
          <input type="" placeholder="Código postal de tu inmueble" />
        </form>
        <strong>¿Cómo recibes el pago de tu renta?</strong>
        <div>
          <IonCheckbox labelPlacement="end">Efectivo</IonCheckbox>
          <IonCheckbox labelPlacement="end">Transparencia</IonCheckbox>
        </div>
        <button
          className="button-primary mb-16"
          onClick={() => router.push("/verification-email")}
        >
          Enviar código
        </button>
      </IonContent>
    </IonPage>
  );
};

export default ContractData;
