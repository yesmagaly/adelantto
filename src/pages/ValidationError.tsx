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
} from "@ionic/react";
import "./Home.css";

const ValidationError: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <strong>¡Lo sentimos!</strong>
        </div>
        <p>
          Los datos de tu propiedad no han pasado <br /> nuestro proceso de
          validación
        </p>
        <IonButton>Finalizar</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ValidationError;
