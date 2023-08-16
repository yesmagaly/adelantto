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

const CorrectData: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <strong>¡Felicitaciones!</strong>
        </div>
        <p>Cuéntanos dónde quieres tu dinero</p>
        <IonButton>Datos bancarios</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CorrectData;
