import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import "./Home.css";

const Register: React.FC = () => {
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
          <h1>Registra tu número</h1>
          <p>Regálanos tu número para validar tu identidad</p>
          <a href="">Número de Celular</a>
          <p>
            Enviaremos un código de confirmación para iniciar el proceso de
            validación de tu identidad.
          </p>
          <IonButton>Enviar código</IonButton>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Register;
