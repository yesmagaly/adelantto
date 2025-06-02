import React, { useState } from "react";
import { useController, UseControllerProps } from 'react-hook-form'
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { API_SERVER_URL } from "../../config";

import Icon from "../Icon/Icon";
import Modal from "../modal";

export interface ComponentProp extends UseControllerProps {
  children: React.ReactNode
}

const PhotoInputItem: React.FC<ComponentProp> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ message: null });
  const { field: { onChange, value }, fieldState } = useController(props);

  const takePhoto = async (event: Event) => {
    event.preventDefault();

    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    if (photo?.webPath) {
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
      } catch (errorFetch: any) {
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
        <div className="flex basis-32 items-center justify-center gap-5 border-b border-r border-solid border-[#D8D8D8]">
          {value?.id ? <Icon name="square-check" className="bg-green-400" /> : <Icon name="square" className="bg-slate-300" />}

          <button className="inline-flex" onClick={openModal}>
            <Icon name='camera' className="bg-gray-400 text-lg" />
          </button>
        </div>
        <div className="my-4 basis-full leading-3">{props?.children}</div>
      </div>

      <Modal isOpen={isOpen}>
        <div className="flex h-52 items-center justify-center rounded-sm bg-slate-200 p-2 text-center text-slate-800">
          {photoUrl && <img src={photoUrl}></img>}
          {!loading && !value?.id && (
            <div onClick={takePhoto}>
              <Icon name='camera' className="bg-gray-800 text-lg" />
              <p>Tomar foto</p>
            </div>
          )}
        </div>

        {loading && <span>Cargando ...</span>}
        {error.message && <p className="text-sm">{error.message}</p>}

        <button
          className="button is-primary"
          onClick={() => setIsOpen(false)}
          disabled={loading}
        >
          Continuar
        </button>
      </Modal>
    </>
  );
};

export default PhotoInputItem;
