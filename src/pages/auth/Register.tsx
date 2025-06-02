import { useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import parsePhoneNumber from "libphonenumber-js";

import { PatternFormat } from "react-number-format";
import Modal from "../../components/modal";
import Loader from "../../components/Loader/Loader";

import registerAnimation from "../../assets/animations/register.json";
import { API_SERVER_URL, PROD_MODE } from "../../config";
import { t } from "@adelantto/utils";
import InputPassword from "../../components/InputPassword";

type FormValues = {
  email: string;
  phone: string;
};

const PHONE_FORMAT = PROD_MODE ? "+52 (##) ####-####" : "+## (###) ###-###";
const cleanUpPhone = (phone = "") =>
  phone.replaceAll(/[-|\(|\)]/g, "").replaceAll(" ", "");

const Register: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useIonRouter();

  const {
    control,
    handleSubmit,
    setError,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const validate = function (values: FormValues) {
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

  const onSubmit = async function (data: any) {
    // Make validaions.
    const errors = validate(data);

    // Show phone errors.
    if (errors.phone) {
      setError("phone", errors.phone);
      setIsOpen(true);
      return;
    }

    // Clean up phone number.
    const phone = cleanUpPhone(data?.phone);

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
          body: JSON.stringify({ phone }),
        }
      );

      const json = await response.json();

      if (json.status === "success") {
        router.push(`/verification-code/${phone}`);
      } else {
        setError("phone", { message: json.message, type: "server" });
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
      <IonContent fullscreen className="ion-padding">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <a href="" className="inline-flex items-center">
                <span className="material-symbols-outlined">arrow_back</span>
              </a>
              <h1 className="text-lg font-semibold text-dark-blue-700">
                Crear cuenta
              </h1>
            </div>
            <span className="badge badge-sm">Paso 1/ 2</span>
          </div>
          <progress
            className="progress text-indigo-300 w-full h-[5px]"
            value="50"
            max="100"
          ></progress>
        </div>

        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="control">
            <label htmlFor="email" className="control-label">
              Correo electrónico
            </label>
            <input
              className="input w-full"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
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
                  className="input w-full"
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
              className="input w-full"
            />
          </div>
          <div className="control">
            <label className="control-label">Confirmar Contraseña</label>
            <InputPassword
              {...register("password_confirmation")}
              required
              className="input w-full"
            />
          </div>

          <button className="btn btn-primary rounded-full">Continuar</button>
        </form>

        <p className="text-center text-sm mt-8">
          ¿Ya tienes una cuenta?{" "}
          <a href="#" className="link font-semibold">
            Iniciar sesión
          </a>
        </p>

        <Loader isOpen={isSubmitting} />

        <Modal isOpen={isOpen}>
          <h3 className="text-center text-lg font-semibold">Lo sentimos</h3>
          {errors?.phone && <p>{errors.phone?.message}</p>}
          <button
            className="button is-primary"
            onClick={() => setIsOpen(false)}
          >
            Aceptar
          </button>
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default Register;
