import { useState, useEffect, useMemo } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm, Controller } from "react-hook-form";

import { FrontId } from "../incode/components/FrontId"
import { BackId } from "../incode/components/BackId"
import { Selfie } from "../incode/components/Selfie"


import { initSession, processFace, finishStatus, addDevicefin, initSessiongerPrint } from "../incode/client"

import * as Modal from "../../components/modal"
import * as Page from "../../components/page"
import check from "../../assets/icons/check.png";
import close from "../../assets/icons/close.png";

const Passport: React.FC = () => {
  const router = useIonRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState();
  const [skipBackIdCapture, setSkipBackIdCapture] = useState(false);

  const [step, setStep] = useState(-1)

  useEffect(() => {
    const syncSession = async function () {
      const incodeSession = localStorage.getItem('incode_session');

      if (incodeSession) {
        setSession(JSON.parse(incodeSession));
      } else {

        try {
          const session = await initSession();
          localStorage.setItem('incode_session', JSON.stringify(session))
          setSession(session)
        } catch (error) {
          alert(error)
        }
      }
    }

    syncSession();
  }, []);

  const clearSession = () => {
    localStorage.removeItem('incode_session');
  }

  const successFrontCallback = async (data) => {
    if (data.skipBackIdCapture) {
      setStep(2);
    } else {
      setStep(1);
    }
  }

  const successBackCallback = () => setStep(2);
  const successSelfieCallback = () => setStep(3)

  const errorCallback = () => { }

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root>
          <Page.Header>
            <div className="heading heading--green">
              <h1 className="heading__title">
                Captura tu <strong>INE o Pasaporte</strong>
              </h1>
              <p className="text-base">
                Captura una foto de tus identificaciones.
              </p>
            </div>
          </Page.Header>
          <Page.Body>
            {session && step === 0 && <FrontId session={session} onSuccess={successFrontCallback} />}
            {session && step === 1 && <BackId session={session} onSuccess={successBackCallback} />}
            {session && step === 2 && <Selfie session={session} onSuccess={successSelfieCallback} />}
            {step === 3 && (
              <Modal.Root isOpen={true}>
                <div className="heading--center">
                  <img className="h-10 mb-4" src={check} />
                  <p className="text-[20px] mb-4">Datos correctos</p>
                </div>
                <Modal.Footer>
                  <button className="button is-primary">
                    Continuar
                  </button>
                </Modal.Footer>
              </Modal.Root>
            )}
            {step === 4 && (
              <Modal.Root isOpen={true}>
                <div className="heading--center">
                  <img className="h-12 mb-8" src={close} />
                </div>
                <h5 className="font-bold text-[30px]">¡Ups!</h5>
                <p>
                  Por el momento no cumples
                  los requisitos Adelantto, te recomendamos intentarlo en
                  <strong>3 meses nuevamente</strong>
                </p>
              </Modal.Root>
            )}
            <div className="p-6">
              <button className="button is-primary mb-16" onClick={clearSession}>
                Clear Session
              </button>
            </div>
          </Page.Body>
          <Page.Footer>
            <button className="button is-primary" onClick={() => setStep(0)}>Iniciar captura</button>
          </Page.Footer>
        </Page.Root>

      </IonContent>
    </IonPage>
  );
};

export default Passport;
