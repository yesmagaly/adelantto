import { useState } from "react";
import { RouteComponentProps } from "react-router";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm, SubmitHandler } from "react-hook-form";

import verificationCodeAnimation from "../../assets/animations/verification-code.json";
import Modal from "../../components/modal";
import Loader from "../../components/Loader/Loader";
import { API_SERVER_URL } from "../../config";

import useCountDownTimer from "../../hooks/useCountDownTimer";

interface ComponentProps
  extends RouteComponentProps<{
    phone: string;
  }> {}

type FormValues = {
  code: number;
};

const VerificationCode: React.FC<ComponentProps> = ({ match }) => {
  // 3 Minutes
  const { minutes, seconds, isExpired, stopTimer, resetTimer } =
    useCountDownTimer(3);
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
    const phone = match.params.phone;

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
      <IonContent fullscreen>
        <div className="heading heading--green">
          <h1 className="heading__title">
            Código
            <br />
            <strong>de verificación</strong>
          </h1>
          <div className="heading__pager">Paso 2 de 4</div>
        </div>

        <div className="content">
          <Lottie
            animationData={verificationCodeAnimation}
            style={{ width: 174, height: 262 }}
            loop
            play
          />

          <form className="form mb-16" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="numeric"
              maxLength={6}
              minLength={6}
              placeholder="Código de verificación"
              {...register("code", { required: true })}
            />

            <div className="mb-24">
              <p className="mt-1 text-primary-green">
                {minutes}:{seconds}
              </p>
              {isExpired && (
                <p className="text-orange-500">El código ha expirado.</p>
              )}
              <p className="help-text mb-4 mt-4">
                Si no recibiste el código, envíalo nuevamente desde{" "}
                <a
                  onClick={() => router.push("/register")}
                  className="underline"
                >
                  aquí
                </a>
              </p>
            </div>

            <button className="button is-primary">Validar código</button>
          </form>
        </div>

        <Loader isOpen={isSubmitting} />

        <Modal isOpen={isOpen}>
          <h3 className="mb-5 text-center text-lg font-semibold">
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
    </IonPage>
  );
};

export default VerificationCode;
