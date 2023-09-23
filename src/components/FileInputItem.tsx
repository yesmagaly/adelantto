import { useState } from "react";
import Lottie from "react-lottie-player";
import { useController, UseControllerProps } from 'react-hook-form'

import { API_SERVER_URL } from "../config";

import Icon from "../components/Icon/Icon";
import Modal from "../components/Modal/Modal";
import documentsAnimation from "../assets/animations/documents.json";

export interface ComponentProp extends UseControllerProps {
  icon: string;
  children: string | JSX.Element | JSX.Element[]
}

const UploadDocuments: React.FC<ComponentProp> = ({ icon, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { field: { onChange, value, ...field }, fieldState } = useController(props);

  const handleChange = async (event: { target: { files: any; }; }) => {
    const { files } = event.target

    // Start Loading.
    setLoading(true);

    if (files.length) {
      const file = files[0];
      const body = new FormData();
      body.append('file', file);

      const response = await fetch(`${API_SERVER_URL}/api/files`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });

      // Stop loading.
      setLoading(false);

      if (response.status === 200) {
        const data = await response.json();
        onChange(data);
      }
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
          <input name={`${props?.name}-checkbox`} type="checkbox" checked={value?.id} />
          <button onClick={openModal}><Icon name={icon} className="bg-gray-400" /></button>
        </div>
        <div className="my-4 basis-full leading-3">
          {props?.children}
        </div>
      </div>

      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <Lottie
          animationData={documentsAnimation}
          style={{ width: '100%', height: 180 }}
          loop
          play
        />

        <label className="mb-4 p-2 flex items-center justify-center bg-slate-200 rounded text-slate-800 text-center h-20" htmlFor={props.name}>
          {!loading && value?.id && (
            <div>
              {value?.name} <button className="ml-2" onClick={handleRemove}>Remove</button>
            </div>
          )}
          {!loading && !value?.id && <span>Buscar</span>}
          {loading && <span>Loading ...</span>}
          <input {...field} className="hidden" id={props.name} onChange={handleChange} type="file" placeholder="Buscar" />
        </label>

        <button onClick={() => setIsOpen(false)} className="button button-secondary" disabled={loading}>
          Continuar
        </button>
      </Modal>
    </>
  );
};

export default UploadDocuments;
