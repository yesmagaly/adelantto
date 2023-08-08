import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import "./Home.css";

const VerificationCode: React.FC = () => {
  const router = useIonRouter();

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
          <span>Paso 2 de 4</span> <br />
          <a href="">Código de verificación</a>
          <div>03:00</div>
          <p>
            Si no recibiste el código, envíalo nuevamente desde <a>aquí</a>
          </p>
          <button
            className="button-primary"
            onClick={() => router.push("/verification-email")}
          >
            Enviar código
          </button>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default VerificationCode;
