import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { useForm } from "react-hook-form";

import { handleServerErrors, t } from "@adelantto/utils";
import InputPassword from "../../components/InputPassword";
import {
  atLeast8Chars,
  hasLowerCase,
  hasNumber,
  hasSpecialChar,
  hasUpperCase,
  MaterialIcon,
  PasswordStrength,
} from "@adelantto/core";
import {
  useRegisterUserMutation,
  useUpdatePasswordMutation,
} from "@adelantto/store";
import { Link } from "react-router-dom";

type T_form = {
  current_password: string;
  password: string;
  confirm_password: string;
};

export const UpdatePassword: React.FC = () => {
  const router = useIonRouter();
  const [mutation] = useUpdatePasswordMutation();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
    watch,
  } = useForm<T_form>();

  const onSubmit = async function (form: T_form) {
    try {
      const data = await mutation(form).unwrap();
      router.push(`/profile`);
    } catch (error: any) {
      handleServerErrors<T_form>(
        ["current_password", "password", "confirm_password"],
        error?.data?.errors
      ).map(([field, error]) => setError(field, error));
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="flex justify-between items-center">
          <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h6">
            <Link to="/" className="inline-flex items-center">
              <MaterialIcon name="arrow_back" />
            </Link>
            Actualizar contraseña
          </h1>
          <span className="badge badge-primary badge-sm">Paso 1/ 2</span>
        </div>

        <progress
          className="mt-2 w-full h-[5px] text-indigo-300 progress"
          value="50"
          max="100"
        ></progress>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <form className="gap-4 grid" onSubmit={handleSubmit(onSubmit)}>
          <div className="control">
            <label className="control-label">Contraseña actual</label>

            <InputPassword
              {...register("current_password", {
                required: t("Your password is required."),
              })}
              aria-invalid={errors.current_password ? "true" : "false"}
              required
              className="input validator"
              placeholder="Contraseña"
            />

            <p className="hidden validator-hint">
              {errors.current_password?.message}
            </p>
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Nueva contraseña</legend>

            <div className="control">
              <label className="control-label">Contraseña</label>

              <InputPassword
                {...register("password", {
                  required: t("Your password is required."),
                  validate: (value) => {
                    if (value) {
                      const isValid = [
                        atLeast8Chars(value),
                        hasUpperCase(value),
                        hasLowerCase(value),
                        hasNumber(value),
                        hasSpecialChar(value),
                      ].every((item) => item);

                      if (!isValid) {
                        return t("Your password format is incorrect.");
                      }
                    }
                  },
                })}
                aria-invalid={errors.password ? "true" : "false"}
                required
                className="input validator"
                placeholder="Crea una contraseña"
              />

              {errors.password && (
                <PasswordStrength password={watch("password")} />
              )}
            </div>

            <div className="control">
              <label className="control-label">Confirmar Contraseña</label>
              <InputPassword
                {...register("confirm_password", {
                  validate: (value) => {
                    if (value !== watch("password")) {
                      return t("Your passwords do not match");
                    }
                  },
                })}
                aria-invalid={errors.confirm_password ? "true" : "false"}
                className="input validator"
                placeholder="Escribela de nuevo"
                required
              />

              <p className="hidden validator-hint">
                {errors.confirm_password?.message}
              </p>
            </div>
          </fieldset>
        </form>
      </IonContent>

      <IonFooter className="ion-padding">
        <button
          disabled={isSubmitting}
          className="btn-block btn btn-primary"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Continuar
        </button>
      </IonFooter>
    </IonPage>
  );
};
