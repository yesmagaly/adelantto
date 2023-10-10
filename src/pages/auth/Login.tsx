import { useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { useForm } from "react-hook-form";

import logo from "../../assets/icons/logo.svg";
import Modal from "../../components/modal";
import Loader from "../../components/Loader/Loader";
import { useAuth } from "./authContext";

interface LoginProps
  extends RouteComponentProps<{
    phone: string;
  }> {}

type FormValues = {
  email: number;
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

  const onSubmit = async function (data: FormValues) {
    const email = data.email;
    const password = data.password;

    try {
      await logIn(email, password);
      router.push("/welcome");
    } catch (error) {
      setIsOpen(true);
      setError("password", { message: error?.message, type: "server" });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex items-center flex-col justify-center text-center h-full">
          <img className="h-40 mb-20" src={logo} />

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
              <input
                type="password"
                placeholder="Password"
                required
                maxLength={8}
                {...register("password")}
              />
            </div>

            <button className="button is-primary w-full">Iniciar sesión</button>
          </form>

          <p className="leading-5 mb-4">
            ¿Eres nuevo?{" "}
            <a className="font-semibold" href="/register">
              Registrate aquí
            </a>
          </p>

          <p>
            <a href="/terms-and-conditions" className="text-sm">
              Términos y condiciones
            </a>
          </p>
        </div>

        <Loader isOpen={isSubmitting} />

        <Modal isOpen={isOpen}>
          <h3 className="font-semibold text-lg mb-5 text-center">
            Lo sentimos
          </h3>
          {<p>{errors?.password?.message}</p>}
          <button
            onClick={() => setIsOpen(false)}
            className="button is-secondary"
          >
            Close
          </button>
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default Login;
