import { IonContent, IonPage, IonIcon, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import userAnimation from "../assets/animations/user.json"
import { ellipse } from "ionicons/icons";

const CreateProfile: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="px-9 py-6">
          <div className="heading__pager text-right">Paso 2 de 3</div>
        </div>

        <div className="content">
          <Lottie
            animationData={userAnimation}
            style={{ width: 250, height: 250 }}
            loop
            play
          />

          <div className="mb-10">
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

            <div className="mb-8">
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
              <button onClick={() => router.push("/advance-immediately")}>
                <IonIcon icon={ellipse}></IonIcon>
              </button>
              <button onClick={() => router.push("/create-profile")}>
                <IonIcon icon={ellipse}></IonIcon>
              </button>

              <button onClick={() => router.push("")}>
                <IonIcon icon={ellipse}></IonIcon>
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateProfile;
