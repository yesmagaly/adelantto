import {
  IonContent,
  IonPage,
  useIonRouter,
  IonAvatar,
  IonIcon,
} from "@ionic/react";
import { ellipse } from "ionicons/icons";

const Profile: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <button onClick={() => router.push("")}>
            <IonIcon icon={ellipse}></IonIcon>
          </button>
          <button onClick={() => router.push("")}>
            <IonIcon icon={ellipse}></IonIcon>
          </button>
          <button onClick={() => router.push("")}>
            <IonIcon icon={ellipse}></IonIcon>
          </button>
        </div>
        <div>
          <IonAvatar>
            <img
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonAvatar>
          <h5>Alexander Cruz Páez</h5>
          <p>acruz@csoft.co</p>
        </div>
        <div>
          <h6>Adelanto</h6>
          <p>Notificaciones</p>
          <p>Mis datos</p>
        </div>
        <div>
          <h6>Ayuda</h6>
          <p>Reportar un problema</p>
          <p>Preguntas frecuentes</p>
          <p>Términos y condiciones</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
