import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Welcome</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
          <h1>¡Hola!</h1>
          <p>¿Estás listo para anticipar tus rentas?</p>
          <IonButton>Crear cuenta</IonButton>
          <div>
            <a>Términos y condiciones</a>
          </div>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Home;
