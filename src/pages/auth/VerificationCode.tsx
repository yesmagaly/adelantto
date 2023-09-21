import { useState } from "react";
import { RouteComponentProps } from "react-router";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm } from "react-hook-form";

import verificationCodeAnimation from "../../assets/animations/verification-code.json";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";
import { API_SERVER_URL } from "../../config";

interface VerificationCodeProps
  extends RouteComponentProps<{
    phone: string;
  }> {}

type FormValues = {
  code: number;
};

const VerificationCode: React.FC<VerificationCodeProps> = ({ match }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = async function (data: FormValues) {
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
              <p className="text-primary-green mb-4">03:00</p>
              <p className="help-text mb-4">
                Si no recibiste el código, envíalo nuevamente desde{" "}
                <a
                  href="#"
                  onClick={() => router.goBack()}
                  className="underline"
                >
                  aquí
                </a>
              </p>
            </div>

            <button className="button-primary">Enviar código</button>
          </form>

          <div className="border-bottom border-primary-blue" />
        </div>

        <Loader isOpen={isSubmitting} />

        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          <h3 className="font-semibold text-lg mb-5 text-center">
            Lo sentimos
          </h3>
          {<p>{errors?.code?.message}</p>}
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default VerificationCode;
