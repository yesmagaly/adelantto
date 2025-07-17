import React, { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { MaterialIcon } from "@adelantto/core";
import { cn } from "@adelantto/utils";

interface T_props extends UseControllerProps {
  className?: string;
  multiple?: boolean;
  accept?: string;
  name: string;
  label: string;
  description?: string;
  helpText?: string;
  helpPicture?: string;
}

export const IncodeFileInput: React.FC<T_props> = ({
  className,
  label,
  description,
  helpText,
  helpPicture,
  multiple = false,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController(props);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    setLoading(true);

    if (files && files.length > 0) {
      onChange(files[0]);
    }

    setLoading(false);
  };

  const handleRemove = () => (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onChange(undefined);
  };

  const hasFiles = Boolean(value);

  return (
    <div
      className={cn(
        "bg-white p-4 border border-dark-gray-active rounded-[12px]",
        hasFiles && "border-lime-300",
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
            className="hidden"
            id={props.name}
            onChange={handleChange}
            type="file"
            placeholder="Buscar"
          />
        </label>
      </div>

      {hasFiles && (
        <div className="inline-block bg-gray-600 mt-4 px-3 py-1 rounded-full">
          <div
            key={value.id}
            className="flex justify-between items-center gap-2 text-white"
          >
            <MaterialIcon name="description" size="14px" className="shrink-0" />
            <span className="text-xs">
              {value.name} · {(value.size / 1000000).toFixed(1)}mb
            </span>

            <button className="size-4 text-xs" onClick={handleRemove()}>
              <MaterialIcon name="close" size="16px" className="shrink-0" />
            </button>
          </div>
        </div>
      )}

      {helpPicture && !hasFiles && (
        <div className="mt-4">
          <img src={helpPicture} alt="Help picture" className="w-full" />
        </div>
      )}

      {error?.message && (
        <p className="mt-1 text-error text-xs">{error.message}</p>
      )}
    </div>
  );
};
