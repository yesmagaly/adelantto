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
import { MaterialIcon, PasswordStrength } from "@adelantto/core";

type T_form = {
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
};

const PHONE_FORMAT = PROD_MODE ? "+52 (##) ####-####" : "+## (###) ###-###";
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

  const validate = function (values: T_form) {
    const errors = {} as FieldErrors;

    if (!values.phone) {
      errors.phone = {
        type: "required",
        message: t("Your cellphone number is required."),
      };
    } else if (
      values.phone &&
      !parsePhoneNumber(cleanUpPhone(values.phone))?.isValid()
    ) {
      errors.phone = {
        type: "pattern",
        message: t("Your cellphone number is invalid."),
      };
    }

    return errors;
  };

  const onSubmit = async function (form: any) {
    // Make validaions.
    const errors = validate(form);

    // Show phone errors.
    if (errors.phone) {
      setError("phone", errors.phone);
      setIsOpen(true);
      return;
    }

    const phone = cleanUpPhone(form.phone);

    try {
      // Send phone request.
      const response = await fetch(
        `${API_SERVER_URL}/api/send-verification-code`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ ...form, phone }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        router.push(`/verification-code/${data.id}`);
      } else {
        setError("phone", { message: data.message, type: "server" });
        setIsOpen(true);
      }
    } catch (error) {
      setError("phone", {
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
          <div className="control">
            <label htmlFor="email" className="control-label">
              Correo electrónico
            </label>
            <input
              className="w-full input"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              required
              {...register("email")}
            />
          </div>
          <div className="control">
            <label htmlFor="email" className="control-label">
              Celular
            </label>
            <Controller
              control={control}
              name="phone"
              render={({ field: { ref, ...field } }) => (
                <PatternFormat
                  {...field}
                  className="input"
                  placeholder="Número de Celular"
                  type="tel"
                  format={PHONE_FORMAT}
                  allowEmptyFormatting
                  mask="_"
                  required
                  getInputRef={ref}
                />
              )}
            />
          </div>
          <div className="control">
            <label className="control-label">Contraseña</label>
            <InputPassword
              {...register("password")}
              required
              className="input"
              placeholder="Asegura tu seguridad"
            />

            <PasswordStrength password={watch("password")} />
          </div>

          <div className="control">
            <label className="control-label">Confirmar Contraseña</label>
            <InputPassword
              {...register("confirm_password")}
              className="input"
              placeholder="Reescribe tu contraseña"
              required
            />
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
      <IonFooter>
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
