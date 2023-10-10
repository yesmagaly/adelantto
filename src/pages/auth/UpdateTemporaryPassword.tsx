import { useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import Modal from "../../components/modal";
import Loader from "../../components/Loader/Loader";
import { useAuth } from "./authContext";

import logo from "../../assets/icons/alternative-logo.svg";
import { API_SERVER_URL } from "../../config";

type FormValues = {
  password: string | undefined;
  password_confirmation: string | undefined;
};

const validate = function (values: FormValues) {
  const errors = {};

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
      message:
        "The confirmation password should be equal to your new password.",
    };
  }

  return errors;
};

const UpdateTemporaryPassword: React.FC = () => {
  const { authInfo } = useAuth()!;
  const router = useIonRouter();
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async function (data: FormValues) {
    // Make validaions.
    const errors = validate(data);

    // Show phone errors.
    if (errors.password) {
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
    const response = await fetch(`${API_SERVER_URL}/api/user/update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authInfo.user.token}`,
      },
      body: JSON.stringify({
        password,
        password_confirmation,
        email: authInfo.user.email,
      }),
    });

    const json = await response.json();

    if (response.status === 200) {
      router.push(`/advance-immediately`);
    } else {
      // Show server errors.
      setError("password", { message: json.message, type: "server" });
      setIsOpen(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="blue-bg flex items-center flex-col justify-center text-center h-full">
          <img className="mb-5" src={logo} />
          <div className="text-white">
            <h1 className="font-semibold text-4xl mb-5">¡Bienvenido!</h1>
            <p className="text-xl leading-6 mb-12">
              Ahora eres parte <br />
              <strong> de Adelantto </strong>
            </p>
          </div>

          <div>
            <p className="text-white mb-5">Actualiza tu contraseña</p>
            <form className="form mb-16" onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("password")}
                type="password"
                required
                placeholder="Nueva contraseña"
              />
              <input
                {...register("password_confirmation")}
                type="password"
                required
                placeholder="Repite tu nueva contraseña"
              />
              <p className="mb-12 mt-4">
                <a className="font-semibold text-primary-green text-sm underline mb-10">
                  {" "}
                  Validación de password*
                </a>
              </p>
              <button className="button is-primary">Cambiar contraseña</button>
            </form>
            <div className="border-bottom border-white" />
          </div>
        </div>

        <Loader isOpen={isSubmitting} />
        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          <h3 className="font-semibold text-lg mb-5 text-center">
            Lo sentimos
          </h3>
          {<p>{errors?.password?.message}</p>}
          {<p>{errors?.password_confirmation?.message}</p>}
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default UpdateTemporaryPassword;
