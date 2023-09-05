import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import handHomeAnimation from "../assets/animations/hand-home.json";

const CorrectDeposit: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <h3 className="font-bold text-4xl text-center py-8">¡Gracias!</h3>
        </div>

        <div className="content">
          <Lottie
            animationData={handHomeAnimation}
            style={{ width: 350, height: 350 }}
            loop
            play
          />

          <div className="text-center mb-10">
            <h3 className="font-bold text-2xl leading-7 mb-7">
              ¡Gracias por confiar <br /> en nosotros!
            </h3>
            <p className="text-lg px-5 mb-10">
              El dinero ya está en tu cuenta. Recuerda que al terminar de pagar
              el total de las rentas adelantadas podrás solicitar un nuevo
              Adelantto.
            </p>
            <button
              className=" button bg-primary-blue-light"
              onClick={() => router.push("")}
            >
              Menú
            </button>
          </div>
          <div className="border-bottom border-primary-blue" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CorrectDeposit;
