import React, { useState } from "react";
import { MaterialIcon } from "@adelantto/core";

const InputPassword = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <input className="validator" ref={ref} type={showPassword ? "text" : "password"} {...props} />

      <button
        type="button"
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        onClick={() => setShowPassword(!showPassword)}
        className="top-11 right-4 z-10 absolute w-6 h-6 text-gray-600"
      >
        <MaterialIcon name={showPassword ? "visibility_off" : "visibility"} />
      </button>
    </>
  );
});

export default InputPassword;
