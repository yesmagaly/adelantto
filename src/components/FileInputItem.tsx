import React, { useState } from "react";
import Lottie from "react-lottie-player";
import { useController, UseControllerProps } from 'react-hook-form'

import { API_SERVER_URL } from "../config";

import Icon from "../components/Icon/Icon";
import Modal from "../components/modal";
import documentsAnimation from "../assets/animations/documents.json";
import { ErrorType } from "../types";

export interface ComponentProp extends UseControllerProps {
  children: React.ReactNode
}

const UploadDocuments: React.FC<ComponentProp> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>();
  const { field: { onChange, value, ...field }, fieldState } = useController(props);

  const handleChange = async (event: { target: { files: any; }; }) => {
    const { files } = event.target

    // Start Loading.
    setLoading(true);

    if (files.length) {
      const file = files[0];
      const body = new FormData();
      body.append('file', file);

      try {
        const response = await fetch(`${API_SERVER_URL}/api/files`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body,
        });

        if (response.status === 200) {
          const data = await response.json();
          onChange(data);
        } else {

        }
      } catch (errorFetch: any) {
        setError({ message: errorFetch.message })
      }

      // Stop loading.
      setLoading(false);
    }
  }

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
          <button onClick={openModal} className="inline-flex">
            <Icon name='upload' className="bg-gray-400 text-lg" />
          </button>
        </div>
        <div className="my-4 basis-full leading-3">
          {props?.children}
        </div>
      </div>

      <Modal isOpen={isOpen}>
        <Lottie
          animationData={documentsAnimation}
          style={{ width: '100%', height: 160 }}
          loop
          play
        />

        <label className="p-2 flex items-center justify-center bg-slate-200 rounded text-slate-900 text-center min-h-[120px]" htmlFor={props.name}>
          {!loading && value?.id && (
            <div>
              <div className="mb-3">{value?.name}</div>
              <button className="button is-small" onClick={handleRemove}>Borrar</button>
            </div>
          )}
          {!loading && !value?.id && <span>Buscar</span>}
          {loading && <span>Loading ...</span>}
          <input {...field} className="hidden" id={props.name} onChange={handleChange} accept="application/pdf" type="file" placeholder="Buscar" />
        </label>

        {error?.message && <p className="text-sm text-red-500">{error.message}</p>}

        <div className="flex flex-col gap-2">
          <button onClick={() => setIsOpen(false)} className="button button-secondary" disabled={loading}>
            Continuar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default UploadDocuments;
