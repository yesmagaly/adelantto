import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

import * as Modal from "../../../components/modal";
import {
  LOADING_STATUS,
  APPROVED_STATUS,
  REJECTED_STATUS,
  PROCESSING_STATUS,
} from "./constants";
import { addFaceSelfie, processFace, finishStatus } from "../client";
import "../styles.css";

export interface ComponentProp {
  children: string | JSX.Element | JSX.Element[];
  session: any;
  onSuccess: any;
}

export const Selfie: React.FC<ComponentProp> = ({ session, ...props }) => {
  const [photo, setPhoto] = useState(null);
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
      const data = await addFaceSelfie({
        session,
        body: { base64Image: photo.base64String },
      });

      setStatus(PROCESSING_STATUS);
      const process = await processFace({ session });

      if (process.confidence === 1) {
        setStep(3);
        setStatus(LOADING_STATUS);

        await finishStatus({ session });
        setStatus(APPROVED_STATUS);
        props.onSuccess(data);
      } else {
        setStatus(REJECTED_STATUS);
      }
    } catch (error) {
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
          <h3 className="heading-3">Validación Biométrica</h3>
          <p>¡Sonríe! Queremos conocerte</p>
        </Modal.Header>
        <Modal.Body className="flex items-center">
          <video src="/../src/assets/video/selfie.mp4" autoPlay loop></video>
        </Modal.Body>
        <button onClick={takePhoto} className="button is-primary">
          Continuar
        </button>
      </Modal.Root>

      {photo && (
        <>
          <Modal.Root isOpen={Boolean(photo) && step === 1} variant="fully">
            <Modal.Header className="text-center">
              <h2 className="heading-3">Revisa tu foto</h2>
              <p>
                Mantenga una expresión neutra, busque una luz equilibrada y
                quítese las gafas y los sombreros.
              </p>
            </Modal.Header>
            <Modal.Body className="flex items-center">
              <div className="income-photo">
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
                volver a Capturar
              </button>
            </Modal.Footer>
          </Modal.Root>

          <Modal.Root isOpen={Boolean(photo) && step === 2} variant="fully">
            <Modal.Body className="flex items-center">
              <div
                className={`income-photo ${
                  status === REJECTED_STATUS ? "is-danger" : ""
                } ${status === APPROVED_STATUS ? "is-success" : ""}`}
              >
                <img
                  src={`data:image/${photo.format};base64,${photo.base64String}`}
                ></img>
              </div>
            </Modal.Body>
            <Modal.Footer className="gap-6">
              {status === LOADING_STATUS && (
                <p className="message is-info text-center">Cargando ...</p>
              )}
              {status === PROCESSING_STATUS && (
                <p className="message is-info text-center">Procesando ...</p>
              )}
              {status === APPROVED_STATUS && (
                <p className="message is-success text-center">
                  Validación Exitosa
                </p>
              )}
              {status === REJECTED_STATUS && (
                <>
                  <p className="message is-danger text-center">
                    Fallo la verificación del reverso de tu identificación.
                    <span>({error})</span>
                  </p>
                  <button onClick={tryAgain} className="button">
                    Capturar otra vez
                  </button>
                </>
              )}
            </Modal.Footer>
          </Modal.Root>

          <Modal.Root isOpen={Boolean(photo) && step === 3} variant="fully">
            <Modal.Header>
              <h3 className="heading-3">Validando documento y photo</h3>
            </Modal.Header>
            <Modal.Body className="flex items-center">
              <div
                className={`income-photo ${
                  status === REJECTED_STATUS ? "is-danger" : ""
                }`}
              >
                <img
                  src={`data:image/${photo.format};base64,${photo.base64String}`}
                ></img>
              </div>
            </Modal.Body>
            <Modal.Footer className="gap-6">
              {status === LOADING_STATUS && (
                <p className="message is-info text-center">Validando ...</p>
              )}
              {status === APPROVED_STATUS && (
                <p className="message is-success text-center">
                  Validación Exitosa
                </p>
              )}
              {status === REJECTED_STATUS && (
                <p className="message is-danger text-center">
                  Fallo la verificación.
                  <span>({error})</span>
                </p>
              )}
            </Modal.Footer>
          </Modal.Root>
        </>
      )}
    </div>
  );
};
