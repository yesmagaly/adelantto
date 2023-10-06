import { useState } from "react";
import {
  Camera,
  CameraResultType,
  CameraSource,
} from "@capacitor/camera";

import { addFaceSelfie } from "../client";
import * as Modal from "../../../components/modal";
import "../styles.css";

export interface ComponentProp {
  children: string | JSX.Element | JSX.Element[];
  session: any;
  onSuccess: any;
}
export const Selfie: React.FC<ComponentProp> = ({ session, ...props }) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [step, setStep] = useState(0);

  const startStep = () => {
    setStep(0);
  };

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

  const uploadFrontId = async () => {
    setStep(2);
    setLoading(true);

    try {
      const data = await addFaceSelfie({
        session,
        body: { base64Image: photo.base64String },
      });
      setStatus("is-success");
      setStep(-1);
      props.onSuccess(data);
    } catch (error) {
      setStatus("is-fail");
      setError(error?.message);
    }

    setLoading(false);
  };

  const tryAgain = () => {
    clear();
    takePhoto();
  };

  const clear = () => {
    setPhoto(null);
    setError(null);
    setStatus("");
    setStep(-1);
  };

  return (
    <div>
      {!photo && (
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
      )}

      {photo && (
        <>
          <Modal.Root isOpen={Boolean(photo) && step === 1} variant="fully">
            <Modal.Header className="text-center">
              <h2 className="heading-3">Revisa tu foto</h2>
              <p>
                Mantenga una expresión neutra, busque una luz equilibrada y quítese las gafas y los sombreros.
              </p>
            </Modal.Header>
            <Modal.Body className="flex items-center">
              <div>
                <img
                  src={`data:image/${photo.format};base64,${photo.base64String}`}
                ></img>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={takePhoto} className="button">
                volver a Capturar
              </button>
              <button onClick={uploadFrontId} className="button is-primary">
                Continuar
              </button>
            </Modal.Footer>
          </Modal.Root>

          <Modal.Root isOpen={Boolean(photo) && step === 2} variant="fully">
            <Modal.Body className="flex items-center">
              <div className={status}>
                <img
                  src={`data:image/${photo.format};base64,${photo.base64String}`}
                ></img>
              </div>
            </Modal.Body>
            <Modal.Footer className="gap-6">
              {loading && <div>Cargando ...</div>}
              {error && (
                <>
                  <p>La verificación frontal de identificación fall'o</p>
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
