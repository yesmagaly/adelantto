import React, { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

import { MaterialIcon } from "@adelantto/core";
import { API_SERVER_URL } from "../config";
import { cn } from "./utils";

export interface T_props extends UseControllerProps {
  className?: string;
  multiple?: boolean;
  accept?: string;
  name: string;
  label: string;
  description?: string;
  helpText?: string;
  helpPicture?: string;
}

const addFile = (body: FormData) => {
  return fetch(`${API_SERVER_URL}/api/files`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  });
};

const FileInputItem: React.FC<T_props> = ({
  className,
  label,
  description,
  helpText,
  helpPicture,
  multiple = false,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  //const [error, setError] = useState<ErrorType>();
  const {
    field: { onChange, value },
    formState,
    fieldState: { error },
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
          //setError({ message: errorFetch.message });
        }
      }

      // Stop loading.
      setLoading(false);
    }
  };

  const handleRemove =
    (fileId: number) => (event: { preventDefault: () => void }) => {
      event.preventDefault();

      if (props.multiple) {
        onChange(value.filter((file) => file.id != fileId));
      } else {
        onChange(undefined);
      }
    };

  const displayFiles = props.multiple ? value ?? [] : value ? [value] : [];
  const hasFiles = displayFiles.length > 0;

  return (
    <div
      className={cn(
        "border border-dark-gray-active bg-white p-4 rounded-[12px]",
        hasFiles && "border-lime-300",
        error?.message && "border-error",
        className
      )}
    >
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-1">
          {label && (
            <div className="font-semibold text-dark-blue-700 text-sm">
              {label}
            </div>
          )}
          {description && <div className="text-xs">{description}</div>}
          {!hasFiles && helpText && (
            <div className="text-gray-700 text-xs">{helpText}</div>
          )}
        </div>

        <label htmlFor={props.name}>
          <div className="flex justify-center items-center size-10">
            {!loading && !hasFiles && (
              <MaterialIcon name="vertical_align_top" />
            )}
            {!loading && hasFiles && (
              <MaterialIcon name="check_circle" className="text-lime-400" />
            )}
            {loading && (
              <MaterialIcon
                size="24px"
                name="more_horiz"
                className="animate-pulse"
              />
            )}
          </div>

          <input
            {...props}
            className="hidden validator"
            id={props.name}
            onChange={handleChange}
            type="file"
            placeholder="Buscar"
          />
        </label>
      </div>

      {hasFiles && (
        <div className="inline-block bg-gray-600 mt-4 px-3 py-1 rounded-full">
          {displayFiles.map((file) => (
            <div
              key={file.id}
              className="flex justify-between items-center gap-2 text-white"
            >
              <MaterialIcon
                name="description"
                size="14px"
                className="shrink-0"
              />
              <span className="text-xs">
                {file.name} · {(file.size / 1000000).toFixed(0)}mb
              </span>

              <button
                className="size-4 text-xs"
                onClick={handleRemove(file.id)}
              >
                <MaterialIcon name="close" size="16px" className="shrink-0" />
              </button>
            </div>
          ))}
        </div>
      )}

      {helpPicture && !hasFiles && (
        <div className="mt-4">
          <img src={helpPicture} alt="Help picture" className="w-full" />
        </div>
      )}

      {error?.message && (
        <p className="validator-visible !mt-1 validator-hint">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FileInputItem;
