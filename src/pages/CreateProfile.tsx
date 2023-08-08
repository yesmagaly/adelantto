import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
} from "@ionic/react";
import "./Home.css";
import { logoIonic, ellipse } from "ionicons/icons";

const CreateProfile: React.FC = () => {
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
          <span>Paso 2 de 3</span>
          <h1>Crea tu perfil</h1>
          <p>
            Tu nombre deberá registrarse del mismo modo en que aparece en tu
            identificación oficial
          </p>
          <input type="text" name="name" id="name" placeholder="Nombre (s)" />
          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Apellido"
          />
          <a href="">Continuar con Google</a>
          <a href="">Continuar con Facebook</a>

          <div>
            <IonIcon icon={ellipse}></IonIcon>
            <IonIcon icon={ellipse}></IonIcon>
            <IonIcon icon={ellipse}></IonIcon>
          </div>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default CreateProfile;
