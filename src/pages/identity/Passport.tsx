import { useState, useEffect } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";


import { FrontId } from "../incode/components/FrontId";
import { BackId } from "../incode/components/BackId";
import { Selfie } from "../incode/components/Selfie";

import { initSession } from "@adelantto/incode/src/client";

import * as Modal from "../../components/modal";
import * as Page from "../../components/page";
import check from "../../assets/icons/check.png";
import close from "../../assets/icons/close.png";
import photographyAnimation from "../../assets/animations/photography.json";
import { applications } from "../../api";

const Passport: React.FC = ({ match }) => {
  const router = useIonRouter();
  const [session, setSession] = useState();
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const syncSession = async function () {
      const incodeSession = localStorage.getItem("incode_session");

      if (incodeSession) {
        setSession(JSON.parse(incodeSession));
      } else {
        try {
          const session = await initSession();
          localStorage.setItem("incode_session", JSON.stringify(session));
          setSession(session);
        } catch (error: any) {
          alert(error);
        }
      }
    };

    syncSession();
  }, []);

  const successFrontCallback = async (data: any) => {
    if (data.skipBackIdCapture) {
      setStep(2);
    } else {
      setStep(1);
    }
  };

  const successBackCallback = () => setStep(2);
  const successSelfieCallback = () => setStep(3);

  const finalCallback = async () => {
    localStorage.removeItem("incode_session");

    await applications.identityCheck(match.params.id, {
      identity_checked: true,
      step: 'identity_check'
    });

    router.push(
      `/applications/${match.params.id}/property-documents`
    );
  };

  console.log(step);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root>
          <Page.Header>
            <div className="heading heading--green">
              <div className="text-right heading__pager">Paso 5 de 7</div>
              <h1 className="heading-2">
                Captura tu <strong>INE o Pasaporte</strong>
              </h1>
              <p className="text-base">
                Captura una foto de tus identificaciones.
              </p>
            </div>
          </Page.Header>
          <Page.Body>

            <Lottie
              animationData={photographyAnimation}
              style={{ width: 250, height: 250, marginInline: 'auto', marginTop: '5rem' }}
              loop
              play
            />

            {step === 0 && (
              <FrontId session={session} onSuccess={successFrontCallback} />
            )}
            {session && step === 1 && (
              <BackId session={session} onSuccess={successBackCallback} />
            )}
            {session && step === 2 && (
              <Selfie session={session} onSuccess={successSelfieCallback} />
            )}
            {step === 3 && (
              <Modal.Root isOpen={true}>
                <div className="text-center">
                  <img className="inline-block mb-4 h-10" src={check} />
                  <p className="mb-4 text-[20px]">Datos correctos</p>
                </div>
                <Modal.Footer>
                  <button className="button is-primary" onClick={finalCallback}>
                    Continuar
                  </button>
                </Modal.Footer>
              </Modal.Root>
            )}
          </Page.Body>
          <Page.Footer>
            <button className="button is-primary" onClick={() => setStep(0)}>
              Iniciar captura
            </button>
          </Page.Footer>
        </Page.Root>
      </IonContent>
    </IonPage>
  );
};

export default Passport;
