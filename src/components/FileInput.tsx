import React, { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

import { API_SERVER_URL } from "../config";
import { ErrorType } from "../types";
import Icon from "./Icon/Icon";

export interface T_props extends UseControllerProps {
  children: React.ReactNode;
  accept?: string;
}

const UploadDocuments: React.FC<T_props> = ({
  accept = "application/pdf",
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType>();
  const {
    field: { onChange, value, ...field },
  } = useController(props);

  const handleChange = async (event: { target: { files: any } }) => {
    const { files } = event.target;

    // Start Loading.
    setLoading(true);

    if (files.length) {
      const file = files[0];
      const body = new FormData();
      body.append("file", file);

      try {
        const response = await fetch(`${API_SERVER_URL}/api/files`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body,
        });

        if (response.status === 200) {
          const data = await response.json();
          onChange(data);
        }
      } catch (errorFetch: any) {
        setError({ message: errorFetch.message });
      }

      // Stop loading.
      setLoading(false);
    }
  };

  const handleRemove = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onChange({});
  };

  return (
    <div className="flex justify-center items-center bg-slate-200 px-4 py-2 rounded-sm min-h-[120px] text-slate-900 text-center">
      <div>
        {!loading && value?.id && (
          <div className="flex items-center gap-4">
            {value?.name}

            <button
              className="p-1 border-2 border-red-600"
              onClick={handleRemove}
            >
              <Icon name="trash-can" />
            </button>
          </div>
        )}

        {!loading && !value?.id && (
          <label htmlFor={props.name}>{props?.children}</label>
        )}
        {loading && <span>Cargando ...</span>}
      </div>

      <input
        {...field}
        className="hidden"
        id={props.name}
        onChange={handleChange}
        accept={accept}
        type="file"
        placeholder="Buscar"
      />
      {error?.message && (
        <p className="mb-4 text-red-500 text-sm">{error.message}</p>
      )}
    </div>
  );
};

export default UploadDocuments;
