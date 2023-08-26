import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm } from "react-hook-form";

import registerAnimation from "../assets/animations/register.json";

const Register: React.FC = () => {
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm();

  const onSubmit = (data) => {
    // router.push("/verification-code")

    console.log(data);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading">
          <div className="heading__pager text-right">Paso 1 de 4</div>
          <h1 className="heading__title">
            Registra <br />
            <strong>tu número</strong>
          </h1>
          <p className="heading__headline">
            Regálanos tu número para validar tu identidad
          </p>
        </div>

        <div className="content">
          <Lottie
            animationData={registerAnimation}
            style={{ width: 174, height: 262 }}
            loop
            play
          />

          <form className="form mb-16" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-7">
              <input
                type="text"
                placeholder="Número de Celular"
                {...register("phone", { required: true })}
              />
            </div>

            <p className="help-text mb-28">
              Enviaremos un código de confirmación para iniciar el proceso de
              validación de tu identidad.
            </p>

            <button className="button-primary">Enviar código</button>
          </form>

          <div className="border-bottom" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
