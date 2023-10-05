import { useState } from "react";
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { addFrontId, addBackId, addFaceSelfie } from "../client";
import Icon from "../../../components/Icon/Icon";
import Modal from "../../../components/modal";
import "../styles.css"

const errorsMap = {
  'UNKNOWN_DOCUMENT_TYPE': "document classification failed",
  'WRONG_DOCUMENT_SIDE': "can happen when uploading back side of id when front id is required or the other way around",
  'WRONG_ONE_SIDED_DOCUMENT': "uploading wrong document with only one side",
  'DOCUMENT_NOT_READABLE': "document couldn't be read, probably due to image quality",
  'UNABLE_TO_ALIGN_DOCUMENT': "alignment failed",
  'ID_TYPE_UNACCEPTABLE': "invalid type of id",
  'UNEXPECTED_ERROR_OCCURRED': "unexpected error",
}

export interface ComponentProp {
  children: string | JSX.Element | JSX.Element[],
  session: any,
  onSuccess: any,
}
export const Selfie: React.FC<ComponentProp> = ({ session, ...props }) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [step, setStep] = useState(0);

  const startStep = () => {
    setStep(0)
  }

  const takePhoto = async () => {
    const newPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
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
      const data = await addFaceSelfie({ session, body: { base64Image: photo.base64String } });
      setStatus('is-success');
      setStep(-1);
      props.onSuccess(data)
    } catch (error) {
      setStatus('is-fail');
      setError(error?.message);
    }

    setLoading(false);
  }

  const tryAgain = () => {
    clear()
    takePhoto()
  }

  const clear = () => {
    setPhoto(null);
    setError(null);
    setStatus('');
    setStep(-1);
  }

  return (
    <div>
      {!photo && <Modal isOpen={step === 0}>
        <h3>Let's take a selfie.</h3>
        <p>Keep a neutral expression, find balanced light and remove any glasses and hats</p>
        <video></video>
        <button onClick={takePhoto}>Continuar</button>
      </Modal>}

      {photo && (
        <>
          <Modal isOpen={Boolean(photo) && step === 1}>
            <h2 className="heading-3">Revisa tu foto</h2>
            <p>Asegúrate de que las letras sean claras y tenga buena iluminación.</p>

            <div>
              <img src={`data:image/${photo.format};base64,${photo.base64String}`}></img>
            </div>

            <button onClick={takePhoto}>volver a Capturar</button>
            <button onClick={uploadFrontId}>Continuar</button>
          </Modal>

          <Modal isOpen={Boolean(photo) && step === 2}>
            <div className={status}>
              <img src={`data:image/${photo.format};base64,${photo.base64String}`}></img>
            </div>

            {loading && <div>Cargando ...</div>}

            {error && (<div>
              <div>La verificación frontal de identificación fall'o</div>
              <button onClick={tryAgain}>Capturar otra vez</button>
            </div>)}
          </Modal>
        </>
      )}
    </div>
  );
};
