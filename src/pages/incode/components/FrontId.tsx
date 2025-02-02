import React, { useState } from "react";
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";

import * as Modal from "../../../components/modal";
import {
  LOADING_STATUS,
  APPROVED_STATUS,
  REJECTED_STATUS,
  PROCESSING_STATUS,
} from "./constants";
import { addFrontId, processId } from "../client";
import "../styles.css";

import videoIdShadow from "../../../assets/video/id-shadow.mp4"

export interface ComponentProp {
  children: React.ReactNode;
  session: any;
  onSuccess: any;
}

const flushPromise = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

export const FrontId: React.FC<ComponentProp> = ({ session, ...props }) => {
  const [photo, setPhoto] = useState<Photo | null>();
  const [error, setError] = useState(null);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<null | string>();

  const takePhoto = async () => {
    const newPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });

    if (newPhoto?.base64String) {
      setPhoto(newPhoto);
      setStep(1);
    }
  };

  const upload = async () => {
    setStep(2);
    setStatus(LOADING_STATUS);

    try {
      const data = await addFrontId({
        session,
        body: { base64Image: photo?.base64String },
      });

      if (data.skipBackIdCapture) {
        setStatus(PROCESSING_STATUS);
        await processId({ session });
      }

      setStatus(APPROVED_STATUS);
      await flushPromise();

      props.onSuccess(data);
    } catch (error: any) {
      setStatus(REJECTED_STATUS);
      setError(error?.message);
    }
  };

  const tryAgain = () => {
    clear();
    takePhoto();
  };

  const clear = () => {
    setPhoto(null);
    setError(null);
    setStatus(null);
    setStep(0);
  };

  return (
    <div>
      <Modal.Root isOpen={step === 0} variant="fully">
        <Modal.Header className="text-center">
          <h3 className="mb-2 text-xl font-semibold">
            Tome una fotografía clara, sin sombras ni reflejos.
          </h3>
        </Modal.Header>
        <Modal.Body className="flex items-center">
          <video src={videoIdShadow} autoPlay loop></video>
        </Modal.Body>
        <Modal.Footer>
          <button className="button is-primary" onClick={takePhoto}>
            Continuar
          </button>
        </Modal.Footer>
      </Modal.Root>

      {photo && (
        <>
          <Modal.Root isOpen={Boolean(photo) && step === 1} variant="fully">
            <Modal.Header className="text-center">
              <h2 className="mb-2 text-xl font-semibold">Revisa tu foto</h2>
              <p className="leading-tight">
                Asegúrate de que las letras sean claras y tenga buena
                iluminación.
              </p>
            </Modal.Header>
            <Modal.Body className="flex items-center">
              <div className="income-document">
                <img
                  src={`data:image/${photo.format};base64,${photo.base64String}`}
                ></img>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={upload} className="button is-primary">
                Continuar
              </button>
              <button onClick={takePhoto} className="button">
                Volver a capturar
              </button>
            </Modal.Footer>
          </Modal.Root>

          <Modal.Root isOpen={Boolean(photo) && step === 2} variant="fully">
            <Modal.Body className="flex items-center">
              <div
                className={`income-document ${status === REJECTED_STATUS ? "is-danger" : ""
                  } ${status === APPROVED_STATUS ? "is-success" : ""}`}
              >
                <img
                  src={`data:image/${photo.format};base64,${photo.base64String}`}
                ></img>
              </div>
            </Modal.Body>
            <Modal.Footer className="gap-6">
              {status === LOADING_STATUS && (
                <p className="message text-center">Cargando ...</p>
              )}
              {status === PROCESSING_STATUS && (
                <p className="message text-center">Procesando ...</p>
              )}
              {status === APPROVED_STATUS && (
                <p className="message is-success text-center">
                  Validación Exitosa
                </p>
              )}
              {status === REJECTED_STATUS && (
                <>
                  <p className="message is-danger text-center">
                    Fallo la verificación frontal de identificación
                  </p>
                  <button onClick={tryAgain} className="button is-primary">
                    Capturar otra vez
                  </button>
                </>
              )}
            </Modal.Footer>
          </Modal.Root>
        </>
      )}
    </div>
  );
};
