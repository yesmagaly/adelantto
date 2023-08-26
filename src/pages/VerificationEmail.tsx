import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm } from "react-hook-form";

import emailAnimation from "../assets/animations/email.json";

const VerificationEmail: React.FC = () => {
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm();

  const onSubmit = (data) => {
    // router.push("/advance-immediately")

    console.log(data);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading">
          <h1 className="heading__title">
            Código
            <br />
            <strong>de verificación</strong>
          </h1>
          <div className="heading__pager">Paso 3 de 4</div>
        </div>

        <div className="content">
          <Lottie
            animationData={emailAnimation}
            style={{ width: 174, height: 262 }}
            loop
            play
          />

          <form className="form mb-16" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />

            <div className="mb-24 mt-9">
              <p className="help-text mb-4">
                Enviaremos una contraseña tu cuenta de correo para que puedas{" "}
                <a className="underline">iniciar sesión.</a>
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

export default VerificationEmail;
