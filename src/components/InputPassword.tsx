import React, { useState } from "react";
import eyeUrl from "../assets/icons/eye.svg";
import eyeSlashUrl from "../assets/icons/eye-slash.svg";

const InputPassword = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-password">
      <input
        ref={ref}
        type={showPassword ? "text" : "password"}
        {...props}
      />

      <button
        type="button"
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        onClick={() => setShowPassword(!showPassword)}
      >
        <img
          src={showPassword ? eyeUrl : eyeSlashUrl}
          alt="Show password"
        />
      </button>
    </div>
  );
});

export default InputPassword;