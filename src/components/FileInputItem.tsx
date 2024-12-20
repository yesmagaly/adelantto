import React, { HTMLAttributes, useState } from "react";
import Lottie from "react-lottie-player";
import { useController, UseControllerProps } from "react-hook-form";

import { API_SERVER_URL } from "../config";

import Icon from "../components/Icon/Icon";
import Modal from "../components/modal";
import documentsAnimation from "../assets/animations/documents.json";
import { ErrorType } from "../types";

export interface ComponentProp extends UseControllerProps {
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

  const handleRemove = (fileId: number) => (event: { preventDefault: () => void }) => {
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
      <label
        className="!flex flex-col items-center justify-center rounded border border-dashed border-slate-500 bg-slate-50 px-2 py-4 text-sm !font-normal text-slate-800"
        htmlFor={props.name}
      >
        <Icon name="upload-cloud" className="mb-1 h-8 w-8 bg-slate-400" />
        {!loading && <span>Cargar archivo</span>}
        {loading && <span>Cargando ...</span>}
        <input
          {...props}
          className="hidden"
          id={props.name}
          onChange={handleChange}
          type="file"
          placeholder="Buscar"
        />
      </label>

      {displayFiles.length > 0 && (
        <div className="my-3 flex flex-col gap-2">
          {displayFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between">
              <div className="inline-flex w-52 items-center gap-1 overflow-hidden text-ellipsis text-nowrap text-sm">
                <Icon name="attachment" className="h-5 w-5 flex-shrink-0" />
                {file.name}
              </div>

              <button
                className="text-sm font-medium"
                onClick={handleRemove(file.id)}
              >
                Borrar
              </button>
            </div>
          ))}
        </div>
      )}

      {error?.message && (
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </>
  );
};

export default FileInputItem;
