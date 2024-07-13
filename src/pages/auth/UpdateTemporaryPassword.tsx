import { useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { FieldErrors, useForm } from "react-hook-form";
import Modal from "../../components/modal";
import Loader from "../../components/Loader/Loader";
import { useAuth } from "./authContext";

import logo from "../../assets/icons/alternative-logo.svg";
import { API_SERVER_URL } from "../../config";
import { authentication } from "../../api";

const t = (text: string) => {
  const trans = {
    "The confirmation password should be equal to your new password.": "Tu contraseña de confirmación debe ser igual a tu nueva contraseña."
  }

  return trans[text] ?? text;
}

type FormValues = {
  password: string;
  password_confirmation: string;
};

const validate = function (values: FormValues) {
  const errors = {} as FieldErrors;

  if (!values.password) {
    errors.password = {
      type: "required",
      message: "The password is required.",
    };
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = {
      type: "required",
      message: "The password is required.",
    };
  }

  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = {
      type: "be_equal",
      message: t("The confirmation password should be equal to your new password."),
    };
  }

  return errors;
};

const UpdateTemporaryPassword: React.FC = () => {
  const { setUserInfo } = useAuth();
  const router = useIonRouter();
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async function (data: any) {
    // Make validaions.
    const errors = validate(data);

    // Show phone errors.
    if (errors?.password) {
      setError("password", errors.password);
      setIsOpen(true);
      return;
    }

    if (errors.password_confirmation) {
      setError("password_confirmation", errors.password_confirmation);
      setIsOpen(true);
      return;
    }

    const password = data.password;
    const password_confirmation = data.password_confirmation;

    // Send phone request.
    const response = await authentication.updateTempPassword({
      password,
      password_confirmation,
    });

    const json = await response.json();

    if (response.status === 200) {
      setUserInfo('is_verified', json.is_verified);
      router.push(`/dashboard`);
    } else {
      // Show server errors.
      setError("password", { message: json.message, type: "server" });
      setIsOpen(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="blue-bg flex h-full flex-col items-center justify-center text-center">
          <img className="mb-5" src={logo} />
          <div className="text-white">
            <h1 className="mb-5 text-4xl font-semibold">¡Bienvenido!</h1>
            <p className="mb-12 text-xl leading-6">
              Ahora eres parte <br />
              <strong> de Adelantto </strong>
            </p>
          </div>

          <div>
            <p className="mb-5 text-white">Actualiza tu contraseña</p>
            <form className="form mb-16" onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("password")}
                type="password"
                required
                placeholder="Nueva contraseña"
                className="mb-6"
              />
              <input
                {...register("password_confirmation")}
                type="password"
                required
                placeholder="Repite tu nueva contraseña"
                className="mb-6"
              />

              {/* <p className="mb-12 mt-4">
                <a className="mb-10 text-sm font-semibold text-primary-green underline">
                  Validación de password*
                </a>
              </p> */}

              <button className="button is-secondary">
                Cambiar contraseña
              </button>
            </form>
            <div className="border-bottom border-white" />
          </div>
        </div>

        <Loader isOpen={isSubmitting} />

        <Modal isOpen={isOpen}>
          <h3 className="mb-5 text-center text-lg font-semibold">
            Lo sentimos
          </h3>
          {<p>{errors?.password?.message}</p>}
          {<p>{errors?.password_confirmation?.message}</p>}
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

export default UpdateTemporaryPassword;
