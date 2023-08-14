import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import "./Home.css";

const Bug: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <strong>¡Ups!</strong>
        </div>
        <p>El código que ingresaste es incorrecto, inténtalo nuevamente.</p>

        <IonButton>Enviar código</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Bug;
