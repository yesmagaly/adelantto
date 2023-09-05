import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import singAnimation from "../assets/animations/sing.json";

const Signature: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="content">
          <form className="form">
            <div className="mb-5">
              <h3 className="font-bold text-4xl">¡Firma y recibe!</h3>
              <Lottie
                animationData={singAnimation}
                style={{ width: 400, height: 400 }}
              />
            </div>
            <div className=" mb-5">
              <input type="text" placeholder="Firmar aquí" />
            </div>
            <button
              className="button button-primary mb-16"
              onClick={() => router.push("")}
            >
              Firmar
            </button>
            <div className="border-bottom border-primary-blue" />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signature;
