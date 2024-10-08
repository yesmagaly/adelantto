import { IonContent, IonPage, IonButton, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import walletAnimation from "../assets/animations/wallet.json";

const CorrectData: React.FC = ({ match }) => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading-light-green flex p-4 flex-col items-center text-center mb-10 py-20">
          <Lottie
            animationData={walletAnimation}
            style={{ width: 251, height: 251 }}
            loop
            play
          />
          <h3 className="font-bold text-[40px]">¡Felicitaciones!</h3>
        </div>
        <div className="py-10">
          <div className="mb-28">
            <div className="border-full" />
            <p className="text-center text-xl leading-4 py-6">
              Cuéntanos dónde quieres tu dinero
            </p>
            <div className="border-full" />
          </div>

          <div className="text-center">
            <button
              className="button is-secondary mb-20"
              onClick={() => router.push(`/loans/${match.params.id}/account-statement`)}
            >
              Datos bancarios
            </button>
            <div className="border-bottom border-primary-blue" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CorrectData;
