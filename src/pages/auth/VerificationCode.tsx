import { useState } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  useIonRouter,
} from "@ionic/react";

import Lottie from "react-lottie-player";
import Modal from "../../components/modal";
import Loader from "../../components/Loader/Loader";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_SERVER_URL } from "../../config";
import useCountDownTimer from "../../hooks/useCountDownTimer";
import { MaterialIcon, PasswordStrength } from "@adelantto/core";

interface ComponentProps
  extends RouteComponentProps<{
    id: string;
  }> {}

type FormValues = {
  code: number;
};

const VerificationCode: React.FC<ComponentProps> = ({ match }) => {
  // 3 Minutes
  const { minutes, seconds, isExpired, stopTimer } = useCountDownTimer(3);
  const [isOpen, setIsOpen] = useState(false);
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit: SubmitHandler<FormValues> = async function (data) {
    stopTimer();

    const code = data.code;
    const phone = match.params.id;

    // Send phone request.
    const response = await fetch(`${API_SERVER_URL}/api/verify-phone-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ code, phone }),
    });

    const json = await response.json();

    if (json.status === "success") {
      router.push(`/verification-email/${phone}`);
    } else {
      // Show server errors.
      setError("code", { message: json.message, type: "server" });
      setIsOpen(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-h6 text-dark-blue-700 gap-2 inline-flex items-center">
            <a href="/" className="inline-flex items-center">
              <MaterialIcon name="arrow_back" />
            </a>
            Verificar cuenta
          </h1>
        </div>
      </IonHeader>
      <IonContent fullscreen className="ion-padding grid gap-4">
        <p className="text-sm text-dark-gray mt-1 mb-4">
          Confirma tus datos de contacto ingresando el código que te enviamos a
          tu teléfono <b>123*****56</b>. Esto nos permite continuar de forma
          segura.
        </p>

        <form className="mb-6 form" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <input
              {...register("code1")}
              className="h-24 text-center input"
              maxLength={1}
              minLength={1}
              placeholder="0"
              required
              type="numeric"
            />
            <input
              {...register("code2")}
              className="h-24 text-center input"
              maxLength={1}
              minLength={1}
              placeholder="0"
              required
              type="numeric"
            />
            <input
              {...register("code3")}
              className="h-24 text-center input"
              maxLength={1}
              minLength={1}
              placeholder="0"
              required
              type="numeric"
            />
            <input
              {...register("code4")}
              className="h-24 text-center input"
              maxLength={1}
              minLength={1}
              placeholder="0"
              required
              type="numeric"
            />
          </div>
        </form>
        <div className="grid gap-2">
          <p>¿No has recibido el código?</p>
          <div>
            <a onClick={() => router.push("/register")} className="underline">
              Reenviar código
            </a>
          </div>
        </div>

        <Loader isOpen={isSubmitting} />

        <Modal isOpen={isOpen}>
          <h3 className="mb-5 font-semibold text-lg text-center">
            Lo sentimos
          </h3>
          {<p>{errors?.code?.message}</p>}

          <button
            className="button is-primary"
            onClick={() => setIsOpen(false)}
          >
            Aceptar
          </button>
        </Modal>
      </IonContent>
      <IonFooter>
        <button className="btn btn-primary btn-block">Verificar cuenta</button>

        <p className="text-center text-sm mt-6">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="link">
            Iniciar sesión
          </a>
        </p>
      </IonFooter>
    </IonPage>
  );
};

export default VerificationCode;
