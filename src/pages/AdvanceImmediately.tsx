import { IonContent, IonPage, IonIcon, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import homeAnimation from "../assets/animations/home.json";
import { ellipse } from "ionicons/icons";
import * as Page from "../components/page";

const AdvanceImmediately: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root variant="compact">
          <Page.Body>
            <div className="">
              <div>
                <div className="heading__pager text-right">1 de 3</div>
                <h1 className="heading__title text-center pt-16">
                  <strong>Adelanto</strong> de inmediato
                </h1>
              </div>

              <div className="content">
                <Lottie
                  animationData={homeAnimation}
                  style={{ width: 280, height: 280 }}
                  loop
                  play
                />
                <div className="mb-14">
                  <p className="help-text">
                    Recibe un adelanto de tus rentas{" "}
                    <strong className="text-lg">en tan solo 72 horas.</strong>
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => router.push("/create-profile")}
                    className="button is-primary"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </Page.Body>
        </Page.Root>
      </IonContent>
    </IonPage>
  );
};

export default AdvanceImmediately;
