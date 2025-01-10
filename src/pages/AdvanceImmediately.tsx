import { useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import homeAnimation from "../assets/animations/home.json";
import * as Page from "../components/page";

const AdvanceImmediately: React.FC = () => {
  const router = useIonRouter();
  const [checked, setChecked] = useState(false);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root variant="compact">
          <Page.Body>
            <div className="">
              <div>
                <h1 className="heading__title pt-16 text-center">
                  <strong>AdelanttoCash®</strong> de inmediato
                </h1>
              </div>

              <div className="content">
                <Lottie
                  animationData={homeAnimation}
                  style={{ width: 220, height: 220 }}
                  loop
                  play
                />

                <p className="help-text">
                  Recibe un adelantto de tus rentas{" "}
                  <strong className="text-lg">en tan solo 72 horas.</strong>
                </p>
              </div>
            </div>
          </Page.Body>
          <Page.Footer>
            <div className="relative mb-6">
              <label className="flex items-center gap-2 text-left text-sm">
                <input
                  type="checkbox"
                  value={checked}
                  onChange={() => setChecked(!checked)}
                />
                <div className="leading-tight">
                  Acepto los{" "}
                  <a href="https://adelanttocash.com/terminos-y-condiciones" target="_blank" className="font-medium underline">
                    términos y condiciones
                  </a>
                </div>
              </label>
            </div>

            <button
              onClick={() => router.push("/create-profile")}
              className="button is-primary w-full"
              disabled={!checked}
            >
              Continuar
            </button>

            <p className="mt-3 text-sm leading-tight text-slate-600">
              Para continuar debes aceptar los términos y condiciones
            </p>
          </Page.Footer>
        </Page.Root>
      </IonContent>
    </IonPage>
  );
};

export default AdvanceImmediately;
