import React, { useState } from "react";
import { useController, UseControllerProps } from 'react-hook-form'

import { API_SERVER_URL } from "../config";
import { ErrorType } from "../types";

export interface ComponentProp extends UseControllerProps {
  children: React.ReactNode
}

const UploadDocuments: React.FC<ComponentProp> = (props) => {
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

  return (
    <div className="py-2 flex items-center justify-center bg-slate-200 rounded text-slate-900 text-center min-h-[120px] px-4">
      <div>
        {!loading && value?.id && (
          <div>
            <div className="mb-3">{value?.name}</div>
            <button className="button is-small" onClick={handleRemove}>Borrar</button>
          </div>
        )}

        {!loading && !value?.id && <label htmlFor={props.name}>{props?.children}</label>}
        {loading && <span>Loading ...</span>}
      </div>

      <input {...field} className="hidden" id={props.name} onChange={handleChange} accept="application/pdf" type="file" placeholder="Buscar" />
      {error?.message && <p className="text-sm text-red-500 mb-4">{error.message}</p>}
    </div>
  );
};

export default UploadDocuments;
