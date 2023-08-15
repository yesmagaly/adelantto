import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCheckbox,
} from "@ionic/react";

const ContractData: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <strong>
            Datos de contrato <br /> de arrendamiento
          </strong>
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
          <IonCheckbox>Efectivo</IonCheckbox>
          <IonCheckbox>Transferencia</IonCheckbox>
        </div>

        <IonButton>Siguiente</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ContractData;
