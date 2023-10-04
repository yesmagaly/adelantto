import { useState, useEffect, useMemo } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm, Controller } from "react-hook-form";

import { FrontId, BackId, Selfie } from "../incode/Incode"
import { createSession, processId, processFace } from "../incode/client"

import Modal from "../../components/Modal/Modal";
import check from "../../assets/icons/check.png";
import close from "../../assets/icons/close.png";

export function useQuery() {
  return useMemo(() => new URLSearchParams(window.location.search), []);
}


const Passport: React.FC = () => {
  const router = useIonRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState();
  const [skipBackIdCapture, setSkipBackIdCapture] = useState(false);

  useEffect(() => {
    const syncSession = async function() {
      const incodeSession =  localStorage.getItem('incode_session');

      if (incodeSession) {
        return setSession(JSON.parse(incodeSession));
      }

      const response = await createSession();
      const session = await response.json();

      if (response.status) {
        localStorage.setItem('incode_session', JSON.stringify(session))
        setSession(session)
      }
    }

    syncSession();
  }, []);


  const handleProcessId = async () => {
    const response = await processId({ session });
    const data = await response.json();

    if (response.status === 200) {
      console.log(data);
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
        localStorage.removeItem('incode_session');
      }else {
        alert('Yeah!')
      }

    } else {
      console.log(data, 'Error');
    }
  }

  const successCallback = (data) => {
    setSkipBackIdCapture(data.skipBackIdCapture)
  }

  const errorCallback = () => {}

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
          {session && <FrontId
            session={session}
            onSuccess={successCallback}
            onError={errorCallback}
          />}

          {session && <BackId
            session={session}
            onSuccess={successCallback}
            onError={errorCallback}
            required={skipBackIdCapture}
          />}

          <div className="content">
            <button
              className="button button-primary mb-16"
              onClick={handleProcessId}
            >
              Siguiente
            </button>
            <div className="border-bottom border-primary-blue" />
          </div>
          {session && <Selfie
            session={session}
            onSuccess={successCallback}
            onError={errorCallback}
          />}

            <button
              className="button button-primary mb-16"
              onClick={handleProcessFace}
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
