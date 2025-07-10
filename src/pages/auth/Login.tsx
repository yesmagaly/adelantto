import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";

import logo from "../../assets/icons/logo.svg";
import InputPassword from "../../components/InputPassword";
import Loader from "../../components/Loader/Loader";
import { useAuth } from "./authContext";

import adelanttoBgUrl from "../../v2/assets/images/adelantto-bg.png";

type T_form = {
  email: string;
  password: string;
};

function Login() {
  const router = useIonRouter();
  const { logIn } = useAuth()!;

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<T_form>();

  const onSubmit = async function (form: T_form) {
    try {
      await logIn(form);
      router.push("/home");
    } catch (error: any) {
      setError("root", { message: error.message, type: "server" });
    }
  };

  return (
    <IonPage>
      <IonContent
        class="ion-padding"
        style={{
          "--background": `url(${adelanttoBgUrl}) no-repeat center top`,
        }}
      >
        <div className="flex flex-col justify-center py-6 h-full">
          <img className="mx-auto mb-12 h-40" src={logo} alt="Adelantto Logo" />
          <h1 className="mb-2 w-full font-semibold text-xl">Iniciar sesión</h1>

          {errors.root && (
            <p className="validator-visible mb-4 validator-hint">
              {errors.root?.message}
            </p>
          )}

          <form className="gap-4 grid mb-14" onSubmit={handleSubmit(onSubmit)}>
            <div className="control">
              <label className="control-label">Correo electrónico</label>
              <input
                {...register("email")}
                className="input validator"
                placeholder="Email"
                required
                type="email"
                aria-invalid={errors.root || errors.email ? "true" : "false"}
              />
            </div>
            <div className="control">
              <label htmlFor="password" className="control-label">
                Contraseña
              </label>
              <InputPassword
                {...register("password")}
                className="input validator"
                id="password"
                maxLength={20}
                placeholder="Password"
                required
                aria-invalid={errors.root || errors.password ? "true" : "false"}
              />
            </div>

            <p className="my-4 text-sm text-center">
              <a
                className="link"
                onClick={() => router.push("/forgot-password")}
              >
                ¿Olvidaste tu contrasena?
              </a>
            </p>

            <button className="btn-block btn btn-primary">
              Iniciar sesión
            </button>
          </form>

          <p className="text-sm text-center">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="link">
              Regístrate
            </a>
          </p>

          <Loader isOpen={isSubmitting} />
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Login;
