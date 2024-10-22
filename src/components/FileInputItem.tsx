import React, { HTMLAttributes, useState } from "react";
import Lottie from "react-lottie-player";
import { useController, UseControllerProps } from "react-hook-form";

import { API_SERVER_URL } from "../config";

import Icon from "../components/Icon/Icon";
import Modal from "../components/modal";
import documentsAnimation from "../assets/animations/documents.json";
import { ErrorType } from "../types";

export interface ComponentProp extends UseControllerProps {
  children: React.ReactNode;
  className?: string;
  multiple?: boolean;
  accept?: string;
  name: string;
}

const addFile = (body: FormData) => {
  return fetch(`${API_SERVER_URL}/api/files`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  });
};

const FileInputItem: React.FC<ComponentProp> = ({
  className,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>();
  const {
    field: { onChange, value },
  } = useController(props);

  const handleChange = async (event: { target: { files: Array<File> } }) => {
    const { files } = event.target;

    // Start Loading.
    setLoading(true);

    if (files.length > 0) {
      if (props.multiple) {
        const newFiles = [...files].map(async (file) => {
          const body = new FormData();
          body.append(`file`, file);
          const response = await addFile(body);
          return await response.json();
        });

        const allNewFiles = await Promise.all(newFiles);
        const previusValue = Array.isArray(value) ? value : [];
        onChange([...previusValue, ...allNewFiles]);
      } else {
        const body = new FormData();
        body.append("file", files[0]);

        try {
          const response = await addFile(body);

          if (response.status === 200) {
            const data = await response.json();
            onChange(data);
          }
        } catch (errorFetch: any) {
          setError({ message: errorFetch.message });
        }
      }

      // Stop loading.
      setLoading(false);
    }
  };

  const handleRemove = (fileId) => (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (props.multiple) {
      onChange(value.filter((file) => file.id != fileId));
    } else {
      onChange(undefined);
    }
  };

  const openModal = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const displayFiles = props.multiple ? value ?? [] : value ? [value] : [];

  return (
    <>
      <div className={`flex gap-4 ${className}`}>
        <div className="flex basis-32 items-center justify-center gap-5 border-b border-r border-solid border-[#D8D8D8]">
          {displayFiles.length > 0 ? (
            <Icon name="square-check" className="bg-green-400" />
          ) : (
            <Icon name="square" className="bg-slate-300" />
          )}
          <button onClick={openModal} className="inline-flex">
            <Icon name="upload" className="bg-gray-400 text-lg" />
          </button>
        </div>

        <div className="my-4 basis-full leading-3">{children}</div>
      </div>

      <Modal isOpen={isOpen}>
        <Lottie
          animationData={documentsAnimation}
          style={{ width: "100%", height: 160 }}
          loop
          play
        />

        <label
          className="flex min-h-20 items-center justify-center rounded bg-slate-200 p-2 text-center text-slate-900"
          htmlFor={props.name}
        >
          {!loading && <span className="font-medium">Buscar</span>}
          {loading && <span>Loading ...</span>}
          <input
            {...props}
            className="hidden"
            id={props.name}
            onChange={handleChange}
            type="file"
            placeholder="Buscar"
          />
        </label>

        <div className="flex flex-col gap-2">
          {displayFiles.map((file) => (
            <div className="flex items-center justify-between">
              <div className="w-48 overflow-hidden text-ellipsis text-nowrap">{file.name}</div>
              <button
                className="text-sm font-medium"
                onClick={handleRemove(file.id)}
              >
                Borrar
              </button>
            </div>
          ))}
        </div>

        {error?.message && (
          <p className="text-sm text-red-500">{error.message}</p>
        )}

        <div className="flex flex-col gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="button button-secondary"
            disabled={loading}
          >
            Continuar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default FileInputItem;
