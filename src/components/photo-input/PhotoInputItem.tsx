import { useState } from "react";
import { useController, UseControllerProps } from 'react-hook-form'
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { API_SERVER_URL } from "../../config";

import Icon from "../Icon/Icon";
import Modal from "../Modal/Modal";

export interface ComponentProp extends UseControllerProps {
  children: string | JSX.Element | JSX.Element[]
}

const PhotoInputItem: React.FC<ComponentProp> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: null });
  const { field: { onChange, value }, fieldState } = useController(props);


  const takePhoto = async (event) => {
    event.preventDefault();

    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    if (photo.webPath) {
      const fileName = `${new Date().getTime()}.${photo.format}`;

      setPhotoUrl(photo.webPath);
      setLoading(true);

      const responsePhoto = await fetch(photo.webPath);
      const blob = await responsePhoto.blob();
      const body = new FormData();
      body.append('file', blob, fileName);

      try {
        const response = await fetch(`${API_SERVER_URL}/api/files`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body,
        });

        // Stop loading.
        setLoading(false);
        const data = await response.json();

        if (response.status === 200) {
          onChange(data);
        } else {
          setError({ message: data.message })
        }
      } catch (errorFetch) {
        setError({ message: errorFetch?.message })
      }

      // Stop loading.
      setLoading(false);
    }

  };

  const handleRemove = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    onChange({});
  }

  const openModal = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setIsOpen(true)
  }

  return (
    <>
      <div className="flex gap-4">
        <div className="flex justify-center gap-5 items-center basis-32 border-b border-r border-[#D8D8D8] border-solid">
          {value?.id ? <Icon name="square-check" className="bg-green-400" /> : <Icon name="square" className="bg-slate-300" />}

          <button className="inline-flex" onClick={openModal}>
            <Icon name='camera' className="bg-gray-400 text-lg" />
          </button>
        </div>
        <div className="my-4 basis-full leading-3">{props?.children}</div>
      </div>

      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <div className="mb-4 p-2 flex items-center justify-center bg-slate-200 rounded text-slate-800 text-center h-52">
          {photoUrl && <img src={photoUrl}></img>}
          {!loading && !value?.id && <span>Tomar foto</span>}
          {loading && <span>Loading ...</span>}
        </div>

        {fieldState.error && <p className="text-sm">{fieldState.error?.message}</p>}
        {error.message && <p className="text-sm">{error.message}</p>}

        <button
          className="button button-primary mb-4"
          onClick={takePhoto}
        >
          Tomar foto
        </button>

        <button
          className="button button-secondary"
          onClick={() => setIsOpen(false)}
          disabled={loading}
        >
          Cancelar
        </button>
      </Modal>
    </>
  );
};

export default PhotoInputItem;
