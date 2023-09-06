import {
  IonContent,
  IonPage,
  useIonRouter,
  IonAvatar,
  IonIcon,
} from "@ionic/react";
import { ellipse } from "ionicons/icons";
import Icon from "../components/Icon/Icon";

const Profile: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading__paper text-right h-20 py-7 px-7">
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
        <div className="heading--center mb-4">
          <IonAvatar>
            <img
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonAvatar>
        </div>
        <div className="text-center">
          <h5 className="font-bold text-lx leading-5">Alexander Cruz Páez</h5>
          <p>acruz@csoft.co</p>
        </div>

        <div className="px-10">
          <div>
            <h6 className="font-bold text-xs leading-3 mb-4">Adelanto</h6>

            <p className="text-[16px] mb-4">
              <Icon name="bell" className="mr-3 text-xs bg-black" />
              Notificaciones
            </p>
            <div className="border-full" />
            <p className="text-[16px] mb-4">
              <Icon name="user" className="mr-3 text-xs bg-black" />
              Mis datos
            </p>
            <div className="border-full" />
          </div>
          <div>
            <h6 className="font-bold text-xs leading-3 mb-4">Ayuda</h6>
            <p className="text-[16px] mb-4">
              <Icon name="alert" className="mr-3 text-xs bg-black" />
              Reportar un problema
            </p>
            <div className="border-full" />
            <p className="text-[16px] mb-4">
              <Icon name="user" className="mr-3 text-xs bg-black" />
              Preguntas frecuentes
            </p>
            <div className="border-full" />
            <p className="text-[16px] mb-4">
              <Icon name="queries" className="mr-3 text-xs bg-black" />
              Términos y condiciones
            </p>
            <div className="border-full" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
