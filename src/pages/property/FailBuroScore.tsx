import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import closeHomeAnimation from "../../assets/animations/close-home.json";

const FailBuroScore: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="content heading-light-green">
          <h1 className="mt-16 text-center text-4xl font-bold">¡Lo sentimos!</h1>
          <div className="flex items-center">
            <Lottie
              animationData={closeHomeAnimation}
              style={{ width: 174, height: 262 }}
              loop
              play
            />
          </div>
          <p className="help-text mb-28 text-balance border-y border-solid border-primary-blue py-6">
            La puntuación de Buró es baja.<br />
            Te recomendamos intentarlo nuevamente en {" "}
            <strong>3</strong> meses.
          </p>

          <button
            className="button is-primary"
            onClick={() => router.push("/")}
          >
            Aceptar
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FailBuroScore;
