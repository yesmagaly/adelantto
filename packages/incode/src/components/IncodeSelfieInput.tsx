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
import { addFile } from "../../../../src/components/FileInputItem";

interface T_props extends UseControllerProps {
  className?: string;
  accept?: string;
  name: string;
  label: string;
  description?: string;
  helpText?: string;
}

function base64ToFile(
  base64String: string,
  mimeType: string,
  fileName: string
) {
  // Remove the data URL scheme if present (e.g., "data:image/jpeg;base64,")
  const base64Data = base64String.split(",")[1] || base64String;

  // Decode Base64 string to binary data
  const byteCharacters = atob(base64Data);

  // Convert binary data to an array of bytes
  const byteArrays = [];
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i));
  }
  const byteArray = new Uint8Array(byteArrays);

  // Create a Blob object from the byte array
  const blob = new Blob([byteArray], { type: mimeType });

  // Create a File object from the Blob
  const file = new File([blob], fileName, {
    type: mimeType,
    lastModified: Date.now(),
  });

  return file;
}

export const IncodeSelfieInput: React.FC<T_props> = ({
  className,
  label,
  description,
  helpText,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController(props);
  const [photo, setPhoto] = useState<Photo>();

  const takePhoto = async () => {
    setLoading(true);

    const newPhoto = (await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    })) as Photo;

    if (newPhoto?.base64String) {
      const body = new FormData();
      body.append(
        `file`,
        base64ToFile(
          newPhoto?.base64String,
          `image/${newPhoto.format}`,
          `selfie.${newPhoto.format}`
        )
      );

      const response = await addFile(body);
      const data = await response.json();

      onChange(data);
      setPhoto(newPhoto);
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

      {hasFiles && value?.url && (
        <div className="block relative bg-gray-200 mx-auto my-8 rounded-full size-61">
          <img
            className="rounded-full w-full h-full object-contain"
            src={value.url}
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
        <p className="validator-visible !mt-1 validator-hint">
          {error.message}
        </p>
      )}
    </div>
  );
};
