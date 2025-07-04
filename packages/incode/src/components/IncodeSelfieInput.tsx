import React, { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";

import { MaterialIcon } from "@adelantto/core";
import { cn } from "@adelantto/utils";

import selfie from "../assets/selfie.mp4";

interface T_props extends UseControllerProps {
  className?: string;
  multiple?: boolean;
  accept?: string;
  name: string;
  label: string;
  description?: string;
  helpText?: string;
}

export const IncodeSelfieInput: React.FC<T_props> = ({
  className,
  label,
  description,
  helpText,
  multiple = false,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController(props);

  const takePhoto = async () => {
    setLoading(true);

    const newPhoto = (await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    })) as Photo;

    if (newPhoto?.base64String) {
      onChange(newPhoto);
    }

    setLoading(false);
  };

  const handleRemove = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    onChange(undefined);
  };

  const hasFiles = Boolean(value);

  return (
    <div
      className={cn(
        "border border-dark-gray-active bg-white p-4 rounded-[12px]",
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
              <button onClick={takePhoto}>
                <MaterialIcon name="photo_camera" />
              </button>
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
        </label>
      </div>

      {hasFiles && (
        <div className="block relative bg-gray-200 mx-auto my-8 rounded-full size-61">
          <img
            className="rounded-full w-full h-full object-contain"
            src={`data:image/${value.format};base64,${value.base64String}`}
          ></img>

          <button
            className="top-0 right-0 absolute flex justify-center items-center size-6"
            onClick={handleRemove}
          >
            <MaterialIcon name="close " size="18px" className="shrink-0" />
          </button>
        </div>
      )}

      {!hasFiles && (
        <video className="mx-auto" src={selfie} autoPlay loop></video>
      )}

      {error?.message && (
        <p className="mt-1 text-error text-xs">{error.message}</p>
      )}
    </div>
  );
};
