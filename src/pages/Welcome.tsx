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

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <h1>¡Bienvenido!</h1>
        <div>
          <strong>
            Ahora eres parte <br /> de Adelantto
          </strong>
        </div>
        <p>Actualiza tu contraseña</p>
        <form action="">
          <input type="text" placeholder="Nueva contraseña" />
          <input type="text" placeholder="Repite tu nueva contraseña" />
        </form>
        <a href="">Validación de password*</a>
        <IonButton>Cambiar contraseña</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
