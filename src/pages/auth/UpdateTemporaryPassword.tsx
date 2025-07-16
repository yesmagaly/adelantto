import { useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { FieldErrors, useForm } from "react-hook-form";
import Modal from "../../components/modal";
import InputPassword from "../../components/InputPassword";
import { useAuth } from "./authContext";

import logo from "../../assets/icons/logo.svg";
import { authentication } from "../../api";
import { t } from "@adelantto/utils";

type FormValues = {
  password: string;
  password_confirmation: string;
};

const validate = function (values: FormValues) {
  const errors = {} as FieldErrors;

  if (!values.password) {
    errors.password = {
      type: "required",
      message: t("The password is required."),
    };
  }

  if (values.password.match(/\d+/) === null) {
    errors.password = {
      type: "at_least_one_number_missing",
      message: t("At least one number is missing."),
    };
  }

  if (values.password.match(/[A-Z]/) === null) {
    errors.password = {
      type: "at_least_one_uppercase_character_missing",
      message: t("At least one uppercase character is missing."),
    };
  }

  if (values.password.length < 8) {
    errors.password = {
      type: "at_least_eight_characters_required",
      message: t("At least eight characters are required."),
    };
  }

  if (!values.password_confirmation) {
    errors.password_confirmation = {
      type: "required",
      message: t("The password is required."),
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
      router.push(`/documents-required`);
    } else {
      // Show server errors.
      setError("password", { message: json.message, type: "server" });
      setIsOpen(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex flex-col justify-center items-center h-full text-center blue-bg">
          <img className="mb-5 w-44" src={logo} />
          <div className="text-white">
            <h1 className="mb-4 font-semibold text-4xl">¡Bienvenido!</h1>
            <p className="mb-8 text-lg leading-6">
              Ahora eres parte <br />
              <strong> de AdelanttoCash® </strong>
            </p>
          </div>

          <div>
            <p className="mb-8 font-medium text-white text-xl">Actualiza tu contraseña</p>

            <form className="flex flex-col mb-16 form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="font-normal! text-white">Nueva contraseña</label>
                <InputPassword
                  {...register("password")}
                  className="input"
                  required
                />
              </div>
              <div className="form-control">
                <label className="font-normal! text-white">Repite tu nueva contraseña</label>
                <InputPassword
                  {...register("password_confirmation")}
                  className="input"
                  required
                />
              </div>

              <button disabled={isSubmitting} className="button is-secondary">
                Cambiar contraseña
              </button>
            </form>
            <div className="border-white border-bottom" />
          </div>
        </div>

        <Modal isOpen={isOpen}>
          <h3 className="mb-5 font-semibold text-lg text-center">
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
