import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import "./Home.css";

const VerificationEmail: React.FC = () => {
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
          <span>Paso 3 de 4</span>
          <br />
          <a href="">email</a>
          <p>
            Enviaremos una contraseña tu cuenta de correo para que puedas{" "}
            <a>iniciar sesión.</a>
          </p>
          <IonButton>Enviar código</IonButton>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default VerificationEmail;
