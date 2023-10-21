import { IonContent, IonPage, IonIcon, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import homeAnimation from "../assets/animations/home.json";
import { ellipse } from "ionicons/icons";

const AdvanceImmediately: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="content">
          <div className="bg-white py-3 shadow-2xl w-96 border border-gray-200 mb-7">
            <div className="h-60 px-9 py-6">
              <div className="heading__pager text-gray-300 text-right">
                1 de 3
              </div>
              <h1 className="heading__title text-center pt-20">
                <strong>Adelanto</strong> <br /> de inmediato
              </h1>
            </div>

            <div className="content">
              <Lottie
                animationData={homeAnimation}
                style={{ width: 294, height: 294 }}
                loop
                play
              />
              <div className="mb-14 mt-10">
                <p className="help-text">
                  Recibe un adelanto de tus rentas <br />
                  <strong className="text-xl">en tan solo 72 horas.</strong>
                </p>
              </div>
              <div>
                <button onClick={() => router.push("/advance-immediately")}>
                  <IonIcon
                    className="w-3 mr-3 text-gray-300"
                    icon={ellipse}
                  ></IonIcon>
                </button>

                <button onClick={() => router.push("/create-profile")}>
                  <IonIcon
                    className="w-3 mr-3 text-gray-300"
                    icon={ellipse}
                  ></IonIcon>
                </button>

                <button onClick={() => router.push("")}>
                  <IonIcon
                    className="w-3 text-gray-300"
                    icon={ellipse}
                  ></IonIcon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdvanceImmediately;
