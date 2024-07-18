import React from "react";
import { useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { useForm } from "react-hook-form";

import logo from "../../assets/icons/logo.svg";
import Modal from "../../components/modal";
import InputPassword from "../../components/InputPassword";
import Loader from "../../components/Loader/Loader";
import { useAuth } from "./authContext";

interface LoginProps
  extends RouteComponentProps<{
    phone: string;
  }> { }

type FormValues = {
  email: string;
  password: string;
};

const Login: React.FC<LoginProps> = () => {
  const { logIn } = useAuth()!;
  const [isOpen, setIsOpen] = useState(false);
  const router = useIonRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = async function (data: any) {
    const email = data.email;
    const password = data.password;

    try {
      const user = await logIn(email, password);

      if (user) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      setIsOpen(true);
      setError("password", { message: error?.message, type: "server" });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex h-full flex-col items-center justify-center text-center">
          <img className="mb-20 h-40" src={logo} />

          <form className="form mb-14" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <input
                type="email"
                placeholder="Email"
                required
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <InputPassword
                placeholder="Password"
                required
                maxLength={20}
                {...register("password")}
              />
            </div>

            <button className="button is-primary w-full">Iniciar sesión</button>
          </form>

          <p className="mb-8 leading-5">
            ¿Olvidaste tu contrasena?<br />
            <a className="font-semibold" onClick={() => router.push("/forgot-password")}>
              Recuperar aquí
            </a>
          </p>

          <p className="mt-8">
            <a
              className="mb-2 block"
              href="https://adelantto.com/terminos-y-condiciones"
              target="_blank"
            >
              Términos y condiciones
            </a>
            <a
              className="block"
              href="https://adelantto.com/aviso-privacidad"
              target="_blank"
            >
              Aviso de privacidad
            </a>
          </p>
        </div>

        <Loader isOpen={isSubmitting} />

        <Modal isOpen={isOpen}>
          <h3 className="mb-5 text-center text-lg font-semibold">
            Lo sentimos
          </h3>

          {errors?.password && <p>{errors?.password?.message}</p>}
          <button
            onClick={() => setIsOpen(false)}
            className="button is-secondary"
          >
            Cerrar
          </button>
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default Login;
