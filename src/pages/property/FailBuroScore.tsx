import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import closeHomeAnimation from "../../assets/animations/close-home.json";

const FailBuroScore: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="content heading-light-green">
          <h1 className="font-bold text-4xl text-center mt-16">¡Lo sentimos!</h1>
          <div className="flex items-center">
            <Lottie
              animationData={closeHomeAnimation}
              style={{ width: 174, height: 262 }}
              loop
              play
            />
          </div>
          <p className="help-text border-y border-solid border-primary-blue py-6 mb-28 text-balance">
            La puntuación de Buró es baja.<br />
            Te recomendamos intentarlo nuevamente en {" "}
            <strong>6</strong> meses.
          </p>

          <button
            className="button button is-primary"
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
