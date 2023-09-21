import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import wrongCodeAnimation from "../../assets/animations/wrong-code.json";

const Bug: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading-light-green flex p-4 flex-col items-center text-center mb-10">
          <h1 className="font-bold text-4xl text-center">¡Ups!</h1>

          <div className="flex items-center">
            <Lottie
              animationData={wrongCodeAnimation}
              style={{ width: 174, height: 262 }}
              loop
              play
            />
          </div>
        </div>

        <div className="content">
          <p className="help-text border-y border-solid border-primary-blue py-6 mb-28">
            El código que ingresaste es incorrecto, inténtalo nuevamente.
          </p>

          <button
            className="button button-primary mb-16"
            onClick={() => router.push("/register")}
          >
            Enviar código
          </button>

          <div className="border-bottom border-primary-blue" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Bug;
