import React, { useState } from "react";
import { MaterialIcon } from "@adelantto/core";

const InputPassword = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input ref={ref} type={showPassword ? "text" : "password"} {...props} />

      <button
        type="button"
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        onClick={() => setShowPassword(!showPassword)}
        className="z-10 w-6 h-6 right-4 top-3 absolute text-gray-600"
      >
        <MaterialIcon name={showPassword ? "visibility_off" : "visibility"} />
      </button>
    </div>
  );
});

export default InputPassword;
