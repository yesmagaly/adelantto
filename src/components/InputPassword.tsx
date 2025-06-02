import React, { useState } from "react";
import eyeUrl from "../assets/icons/eye.svg";
import eyeSlashUrl from "../assets/icons/eye-slash.svg";

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
        className="z-10 w-6 h-6 right-4 top-3 absolute"
      >
        <span className="material-symbols-outlined">
          {showPassword ? "visibility_off" : "visibility"}
        </span>
      </button>
    </div>
  );
});

export default InputPassword;
