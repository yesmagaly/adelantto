import { IonContent, useIonRouter, IonPage } from "@ionic/react";
import Lottie from "react-lottie-player";

import closeHomeAnimation from "../assets/animations/close-home.json";

const ValidationError: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading--center">
          <div className="py-28">
            <h3 className="text-center font-bold text-[40px]">¡Lo sentimos!</h3>

            <Lottie
              animationData={closeHomeAnimation}
              style={{ width: 274, height: 274 }}
              loop
              play
            />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm leading-4 border-y border-solid border-primary-blue py-6 mb-24">
            Los datos de tu propiedad no han pasado <br /> nuestro proceso de
            validación
          </p>
          <button
            className="button is-primary mb-14"
            onClick={() => router.push("")}
          >
            Finalizar
          </button>
          <div className="border-bottom border-primary-blue" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ValidationError;
