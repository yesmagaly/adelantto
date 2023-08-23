import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonAvatar,
  IonCheckbox,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";

const Outlay: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <strong>Desembolso</strong>
          <p>Conoce el desglose de tu servicio</p>
        </div>
        <IonList>
          <IonItem>
            <IonLabel>
              <strong>térmio de desembolso</strong>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Tiempos interbancarios</strong>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Claridad en comisiones</strong>{" "}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>
                Envío de notificación con <br /> tracking
              </strong>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonButton>Siguiente</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Outlay;
