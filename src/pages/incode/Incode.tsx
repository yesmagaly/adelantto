import { useState } from "react";
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { addFrontId, addBackId, addFaceSelfie } from "./client";
import Icon from "../../components/Icon/Icon";
import Modal from "../../components/modal";
import "./styles.css"

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
export const FrontId: React.FC<ComponentProp> = ({ session, ...props }) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [step, setStep] = useState(-1);

  const startStep = () => {
    setStep(0)
  }

  const takePhoto = async () => {
    const newPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    });

    if (newPhoto.base64String) {
      setPhoto(newPhoto);
      setStep(1);
    }
  };

  const uploadFrontId = async () => {
    setStep(2);
    setLoading(true);

    try {
      const data = await addFrontId({ session, body: { base64Image: photo.base64String } });
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
      <div className={`upload mb-4 ${status}`}>
        {!photo && (
          <>
            <div className="upload-label">Frente</div>
            <button className="button button-secondary" onClick={startStep}>Capturar</button>
          </>
        )}
        {loading && <span>Cargando ...</span>}
        {photo && (
          <>
            <img src={`data:image/${photo.format};base64,${photo.base64String}`}></img>
            <button onClick={clear} className="clear-button">Clear</button>
          </>
        )}
      </div>

      {!photo && <Modal isOpen={step === 0}>
        <h3>Tome una fotografía clara, sin sombras ni reflejos.</h3>
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
            {error && <div>
              <div>La verificación frontal de identificación fall'o</div>
              <button onClick={tryAgain}>Capturar otra vez</button>
            </div>}
          </Modal>
        </>
      )}
    </div>
  );
};

export const BackId: React.FC<ComponentProp> = (props) => {
  const [imageBase64, setImageBase64] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: null });

  const takePhoto = async (event) => {
    event.preventDefault();

    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    });

    if (photo.base64String) {
      setImageBase64(`data:image/${photo.format};base64,${photo.base64String}`)
      setLoading(true);

      try {
        const response = await addBackId({
          session: props.session,
          body: { base64Image: photo.base64String }
        });

        // Stop loading.
        setLoading(false);
        const data = await response.json();

        if (response.status === 200) {
          alert(JSON.stringify(data));
          if (!data.failReason) {
            props?.onSuccess(data)
          } else {
            setError({ message: errorsMap[data.failReason] })
          }
        } else {
          setError({ message: data.error })
        }
      } catch (errorFetch) {
        setError({ message: errorFetch?.message })
      }

      // Stop loading.
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full rounded bg-slate-200 overflow-hidden text-slate-800 text-center h-52">
        {!imageBase64 && <button className="inline-flex" onClick={takePhoto}>
          <Icon name='camera' className="bg-gray-400 text-lg mr-4" /> Back
        </button>}
        {loading && <span>Loading ...</span>}
        {!loading && imageBase64 && <img src={imageBase64}></img>}
        {!loading && imageBase64 && <button>Clear</button>}
      </div>
      {error?.message && <p>{error.message}</p>}
    </div>
  );
};

export const Selfie: React.FC<ComponentProp> = (props) => {
  const [imageBase64, setImageBase64] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: null });

  const takePhoto = async (event) => {
    event.preventDefault();

    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    });

    if (photo.base64String) {
      setImageBase64(`data:image/${photo.format};base64,${photo.base64String}`)
      setLoading(true);

      try {
        const response = await addFaceSelfie({
          session: props.session,
          body: { base64Image: photo.base64String }
        });

        // Stop loading.
        setLoading(false);
        const data = await response.json();

        if (response.status === 200) {
          alert(JSON.stringify(data));

          if (!data.failReason) {
            props?.onSuccess(data)
          } else {
            setError({ message: errorsMap[data.failReason] })
          }
        } else {
          setError({ message: data.error })
        }
      } catch (errorFetch) {
        setError({ message: errorFetch?.message })
      }

      // Stop loading.
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full rounded bg-slate-200 overflow-hidden text-slate-800 text-center h-52">
        {!imageBase64 && <button className="inline-flex" onClick={takePhoto}>
          <Icon name='camera' className="bg-gray-400 text-lg mr-4" /> Selfie
        </button>}
        {loading && <span>Loading ...</span>}
        {!loading && imageBase64 && <img src={imageBase64}></img>}
      </div>
      {!loading && imageBase64 && <button onClick={() => setImageBase64('')}>Clear</button>}
      {error?.message && <p>{error.message}</p>}
    </div>
  );
};