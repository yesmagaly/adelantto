import { useState } from "react";
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import parsePhoneNumber from "libphonenumber-js";

import { PatternFormat } from "react-number-format";
import Modal from "../../components/modal";
import Loader from "../../components/Loader/Loader";

import { API_SERVER_URL, PROD_MODE } from "../../config";
import { t } from "@adelantto/utils";
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

type T_form = {
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
};

const PHONE_FORMAT = PROD_MODE ? "+57 (##) ####-####" : "+## (###) ###-###";
const PHONE_PATTERN = PROD_MODE
  ? "+57 (d{2}) d{4}-d{4}"
  : "+51 (d{3}) d{3}-d{3}";

const cleanUpPhone = (phone = "") =>
  phone.replaceAll(/[-|\(|\)]/g, "").replaceAll(" ", "");

const Register: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useIonRouter();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
    watch,
  } = useForm<T_form>();

  const onSubmit = async function (form: T_form) {
    const phone = cleanUpPhone(form.phone);

    try {
      // Send phone request.
      const response = await fetch(`${API_SERVER_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...form, phone }),
      });

      const data = (await response.json()) as
        | {
            message: string;
            phone: string;
            id: string;
          }
        | {
            status: "fail";
            errors: { [key: string]: [string] };
          };

      if (response.ok && "id" in data && "phone" in data) {
        router.push(`/verification-code/${data.id}?phone=${data.phone}`);
      } else {
        const errorFields: (keyof T_form)[] = [
          "email",
          "phone",
          "password",
          "confirm_password",
        ];

        errorFields.forEach((field) => {
          if ("status" in data && data.status === "fail" && data.errors[field]) {
            setError(field as keyof FieldErrors<T_form>, {
              message: data.errors[field][0],
              type: "server",
            });
          }
        });
      }
    } catch (error) {
      setError("root", {
        message: "Ups, algo salió mal. Inténtalo de nuevo más tarde.",
        type: "server",
      });
      setIsOpen(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="flex justify-between items-center">
          <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h6">
            <a href="/" className="inline-flex items-center">
              <MaterialIcon name="arrow_back" />
            </a>
            Crear cuenta
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
          <div className="control-">
            <label htmlFor="email" className="control-label">
              Correo electrónico
            </label>
            <input
              {...register("email", {
                required: t("Your email is required."),
                validate: (value) => {
                  if (
                    value &&
                    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
                  ) {
                    return t("Your email is invalid.");
                  }
                },
              })}
              aria-invalid={errors.email?.message ? "true" : "false"}
              className="w-full input validator"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              required
            />

            <p className="hidden validator-hint">{errors.email?.message}</p>
          </div>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Celular</legend>

            <Controller
              control={control}
              name="phone"
              rules={{
                required: t("Your cellphone number is required."),
                validate: (value) => {
                  if (
                    value &&
                    !parsePhoneNumber(cleanUpPhone(value))?.isValid()
                  ) {
                    return t("Your cellphone number is invalid.");
                  }
                },
              }}
              render={({ field: { ref, ...field } }) => (
                <PatternFormat
                  {...field}
                  className="input validator"
                  placeholder="Número de Celular"
                  type="tel"
                  format={PHONE_FORMAT}
                  mask="_"
                  required
                  getInputRef={ref}
                  pattern={PHONE_PATTERN}
                  aria-invalid={errors.phone ? "true" : "false"}
                />
              )}
            />

            <p className="hidden validator-hint">{errors.phone?.message}</p>

            <p className="label">
              {t(
                "The format phone should follow this pattern: +51 (951) 444-126"
              )}
            </p>
          </fieldset>

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
              placeholder="Asegura tu seguridad"
            />

            <PasswordStrength password={watch("password")} />
          </div>

          <div className="control">
            <label className="control-label">Confirmar Contraseña</label>
            <InputPassword
              {...register("confirm_password", {
                validate: (value) => {
                  if (value !== watch("password")) {
                    return t("Your passwords do not match.");
                  }
                },
              })}
              aria-invalid={errors.confirm_password ? "true" : "false"}
              className="input validator"
              placeholder="Reescribe tu contraseña"
              required
            />

            <p className="hidden validator-hint">
              {errors.confirm_password?.message}
            </p>
          </div>
        </form>

        <Loader isOpen={isSubmitting} />

        <Modal isOpen={isOpen}>
          <h3 className="font-semibold text-lg text-center">Lo sentimos</h3>
          {errors?.phone && <p>{errors.phone?.message}</p>}
          <button
            className="button is-primary"
            onClick={() => setIsOpen(false)}
          >
            Aceptar
          </button>
        </Modal>
      </IonContent>
      <IonFooter className="ion-padding">
        <button
          className="btn-block btn btn-primary"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Continuar
        </button>

        <p className="mt-6 text-sm text-center">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="link">
            Iniciar sesión
          </a>
        </p>
      </IonFooter>
    </IonPage>
  );
};

export default Register;
