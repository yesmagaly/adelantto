import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import "./Home.css";

const VerificationCode: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar></IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
          <h1>Código de verificación</h1>
          <span>Paso 2 de 4</span>
          <div>03:00</div>
          <p>
            Si no recibiste el código, envíalo nuevamente desde <a>aquí</a>
          </p>
          <IonButton>Enviar código</IonButton>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default VerificationCode;
