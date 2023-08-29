import { useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm, Controller } from "react-hook-form";
import Modal from "../components/Modal/Modal";
import Loader from "../components/Loader/Loader";
import { useAuth } from "./auth/authContext";

type FormValues = {
  password: string | undefined;
  password_confirmation: string | undefined;
};

const validate = function (values: FormValues) {
  const errors = {};

  if (!values.password) {
    errors.password = {
      type: "required",
      message: "The cellphone number is required.",
    };
  } else if (
    !/^\+[0-9]{2}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{3}$/g.test(values.phone)
  ) {
    errors.password = {
      type: "pattern",
      message: "Invalid cellphone number.",
    };
  }

  return errors;
};

const Welcome: React.FC = () => {
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
    // const errors = validate(data);

    // Show phone errors.
    // if (errors.phone) {
    //   setError("phone", errors.phone);
    //   setIsOpen(true);
    //   return;
    // }

    const password = data.password;
    const password_confirmation = data.password_confirmation;

    // Send phone request.
    const response = await fetch(
      "http://adelantto-server.docksal/api/user/update-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ password, password_confirmation }),
      }
    );

    const json = await response.json();

    if (json.status === "success") {
      // router.push(`/verification-code/${phone}`);
      // () => router.push("/verification-email")
    } else {
      // Show server errors.
      setError("password", { message: json.message, type: "server" });
      setIsOpen(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="py-6">
          <div className="flex flex-col items-center">
            <h1 className="heading__title text-center">¡Bienvenido!</h1>
            <p className="text-center w-44 mb-14 leading-5">
              Ahora eres parte <br />
              <strong> de Adelantto </strong>
            </p>
          </div>

          <div className="content">
            <p>Actualiza tu contraseña</p>
            <form className="form mb-16" onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("password")}
                type="password"
                placeholder="Nueva contraseña"
              />
              <input
                {...register("password_confirmation")}
                type="password"
                placeholder="Repite tu nueva contraseña"
              />
              <p className="mb-4">
                <a className="underline"> Validación de password*</a>
              </p>
              <button className="button-primary mb-16">
                Cambiar contraseña
              </button>
            </form>
            <div className="border-bottom" />
          </div>
        </div>

        <Loader isOpen={isSubmitting} />
        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          <h3 className="font-semibold text-lg mb-5 text-center">
            Lo sentimos
          </h3>
          {<p>{errors?.password?.message}</p>}
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
