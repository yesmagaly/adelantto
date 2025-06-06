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
  }> {}

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
      <IonContent fullscreen class="ion-padding">
        <img className="mb-20 h-40 mx-auto" src={logo} />
        <h1 className="text-xl font-semibold w-full mb-6">Iniciar sesión</h1>
        <form className="grid gap-4 mb-14" onSubmit={handleSubmit(onSubmit)}>
          <div className="control">
            <label className="control-label">Correo electrónico</label>
            <input
              {...register("email")}
              className="input"
              placeholder="Email"
              required
              type="email"
            />
          </div>
          <div className="control">
            <label htmlFor="password" className="control-label">
              Contraseña
            </label>
            <InputPassword
              {...register("password")}
              className="input"
              id="password"
              maxLength={20}
              placeholder="Password"
              required
            />
          </div>

          <p className="text-sm my-4 text-center">
            <a
              className="link"
              onClick={() => router.push("/forgot-password")}
            >
              ¿Olvidaste tu contrasena?
            </a>
          </p>

          <button className="btn btn-primary btn-block">
            Iniciar sesión
          </button>
        </form>

        <p className="text-center text-sm">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="link">Regístrate</a>
        </p>

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
