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
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import "./Home.css";

const Signature: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>¡Firma y recibe!</IonCardTitle>
          </IonCardHeader>
          <img
            alt="Silhouette of mountains"
            src="https://ionicframework.com/docs/img/demos/card-media.png"
          />
        </IonCard>
        <IonGrid>
          <IonRow>
            <IonCol>Firma aquí</IonCol>
          </IonRow>
        </IonGrid>
        <IonButton>Firmar</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Signature;
