import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm } from "react-hook-form";

import verificationCodeAnimation from "../assets/animations/verification-code.json";

const VerificationCode: React.FC = () => {
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm();

  const onSubmit = (data) => {
    // router.push("/verification-email")

    console.log(data);
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
              type="text"
              placeholder="Código de verificación"
              {...register("verificationCode", { required: true })}
            />

            <div className="mb-24">
              <p className="text-primary-green mb-4">03:00</p>
              <p className="help-text mb-4">
                Si no recibiste el código, envíalo nuevamente desde{" "}
                <a className="underline">aquí</a>
              </p>
            </div>

            <button className="button-primary">Enviar código</button>
          </form>

          <div className="border-bottom" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VerificationCode;
