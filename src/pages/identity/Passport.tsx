import { useState, useEffect, useMemo } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm, Controller } from "react-hook-form";

import { FrontId } from "../incode/components/FrontId"
import { BackId } from "../incode/components/BackId"
import { Selfie } from "../incode/components/Selfie"
import { initSession, processId, processFace, finishStatus, addDevicefin, initSessiongerPrint } from "../incode/client"

import Modal from "../../components/modal";
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

  const handleProcessId = async () => {
    const response = await processId({ session });
    const data = await response.json();

    if (response.status === 200) {
      alert(JSON.stringify(data));
    } else {
      console.log(data, 'Error');
    }
  }

  const handleProcessFace = async () => {
    const response = await processFace({ session });
    const data = await response.json();

    if (response.status === 200) {
      console.log(data);
      if (data.confidence === 0) {
        alert('Buuu!')
        alert(JSON.stringify(data))
        localStorage.removeItem('incode_session');
      } else {
        const res = await finishStatus({ session })
        const js = await res.json();

        alert(JSON.stringify(data))
        alert(JSON.stringify(js))
      }

    } else {
      console.log(data, 'Error');
    }
  }

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

  const successBackCallback = (data) => {
    setStep(2);
  }

  const successCallback = () => {
  }

  const errorCallback = () => { }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--green flex flex-col justify-center">
          <h1 className="heading__title">
            Captura tu <strong>INE o Pasaporte</strong>
          </h1>
          <p className="text-base">
            Captura una foto de tus identificaciones.
          </p>
        </div>

        <div className="p-6">
          <button className="button is-primary" onClick={() => setStep(0)}>Iniciar captura</button>

          {session && step === 0 && <FrontId session={session} onSuccess={successFrontCallback} />}
          {session && step === 1 && <BackId session={session} onSuccess={successBackCallback} />}
          {session && step === 2 && <Selfie session={session} onSuccess={successCallback} />}

          <div className="content">
            <button
              className="button button-primary mb-16"
              onClick={handleProcessId}
            >
              Process ID
            </button>
            <div className="border-bottom border-primary-blue" />
          </div>

          <button
            className="button button-primary mb-16"
            onClick={handleProcessFace}
          >
            Process
          </button>

          <button
            className="button button-primary mb-16"
            onClick={clearSession}
          >
            Process
          </button>

        </div>

        <div className="heading--center ">
          <img className="h-10 mb-4" src={check} />
          <p className="text-[20px] mb-4">Datos correctos</p>
        </div>

        <div className="content">
          <div className="heading--center ">
            <img className="h-12 mb-8" src={close} />
          </div>
          <h5 className="font-bold text-[30px]">¡Ups!</h5>
          <p>
            Por el momento no cumples <br />
            los requisitos Adelantto, <br /> te recomendamos intentarlo en
            <br />
            <strong>3 meses nuevamente</strong>
          </p>
        </div>

        <Modal isOpen={isOpen}>
          <button onClick={() => setIsOpen(false)} className="button button-secondary">Close</button>
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default Passport;
