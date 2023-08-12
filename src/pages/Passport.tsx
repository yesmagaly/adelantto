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

const Passport: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <strong>
            Captura tu
            <br /> INE o Pasaporte
          </strong>
        </div>
        <h5>Captura una foto de tus identificaciones.</h5>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Frente</IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Vuelta</IonCardTitle>
          </IonCardHeader>
        </IonCard>

        <IonButton>Siguiente</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Passport;
