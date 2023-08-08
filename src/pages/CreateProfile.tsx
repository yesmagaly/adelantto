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
      <IonContent fullscreen>
        <div className="px-9 py-6 text-center">
          <div className="heading__pager text-right">Paso 2 de 3</div>
          <h1 className="font-bold text-3xl mb-2">Crea tu perfil</h1>
          <p className="text-sm leading-4">
            Tu nombre deberá registrarse del mismo modo en que aparece en tu
            identificación oficial
          </p>
        </div>

        <div className="px-9">
          <form className="form">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nombre (s)"
              className="min-w-full"
            />
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Apellido"
              className="min-w-full"
            />
          </form>

          <div className="mb-3">
            <a
              href="#"
              className="block border border-gray-400 mb-4 p-4 min-w-full"
            >
              Continuar con Google
            </a>
            <a
              href="#"
              className="block border border-gray-400 mb-4 p-4 min-w-full"
            >
              Continuar con Facebook
            </a>
          </div>

          <div className="text-center">
            <IonIcon icon={ellipse}></IonIcon>
            <IonIcon icon={ellipse}></IonIcon>
            <IonIcon icon={ellipse}></IonIcon>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateProfile;
