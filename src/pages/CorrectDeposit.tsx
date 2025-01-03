import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import handHomeAnimation from "../assets/animations/hand-home.json";

const CorrectDeposit: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading--sky-blue pt-10">
          <div className="text-center">
            <h1 className="heading-2 py-8">¡Gracias!</h1>
          </div>

          <div className="content">
            <Lottie
              animationData={handHomeAnimation}
              style={{ width: 350, height: 350 }}
              loop
              play
            />

            <div className="mb-10 text-center">
              <div className="mb-10">
                <h1 className="heading-4">
                  ¡Gracias por confiar <br /> en nosotros!
                </h1>
              </div>
              <p className="mb-10 px-5 text-lg">
                El dinero ya está en tu cuenta. Recuerda que al terminar de
                pagar el total de las rentas adelantadas podrás solicitar un
                nuevo AdelanttoCash®.
              </p>
              <button
                className="button is-secondary"
                onClick={() => router.push("/full-advance")}
              >
                Menú
              </button>
            </div>
            <div className="border-bottom border-primary-blue" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CorrectDeposit;
