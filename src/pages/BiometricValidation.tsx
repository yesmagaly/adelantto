import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonAvatar,
} from "@ionic/react";
import "./Home.css";

const BiometricValidation: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <strong>
            Validación <br />
            Biométrica
          </strong>
        </div>
        <p>¡Sonrie! Queremos conocerte</p>
        <IonAvatar>
          <img
            alt="Silhouette of a person's head"
            src="https://ionicframework.com/docs/img/demos/avatar.svg"
          />
        </IonAvatar>

        <IonButton>Capturar foto</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default BiometricValidation;
