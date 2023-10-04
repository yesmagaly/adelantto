import { useState } from "react";
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { addFrontId, addBackId, addFaceSelfie } from "./client";
import Icon from "../../components/Icon/Icon";

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
}

export const FrontId: React.FC<ComponentProp> = (props) => {
  const [imageBase64, setImageBase64] = useState();
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
      // const fileName = `${new Date().getTime()}.${photo.format}`;

      // setPhotoUrl(photo.webPath);
      setImageBase64(`data:image/${photo.format};base64,${photo.base64String}`)
      setLoading(true);

      try {
        const response = await addFrontId({
          session: props?.session,
          body: { base64Image: photo.base64String }
        })

        // Stop loading.
        setLoading(false);
        const data = await response.json();

        if (response.status === 200) {
          alert(JSON.stringify(data));
          if (data.classification) {
            props?.onSuccess(data)
          } else {
            setError({ message: errorsMap[data.failReason] })
          }

          data.classification
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
          <Icon name='camera' className="bg-gray-400 text-lg mr-4" /> Frente
        </button>}
        {loading && <span>Loading ...</span>}
        {!loading && imageBase64 && <img src={imageBase64}></img>}
        {!loading && imageBase64 && <button>Clear</button>}
      </div>
      {error?.message && <p>{error.message}</p>}
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
      // const fileName = `${new Date().getTime()}.${photo.format}`;

      // setPhotoUrl(photo.webPath);
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