import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import registerAnimation from "../assets/animations/register.json";

const Register: React.FC = () => {
  const router = useIonRouter();

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

          <form className="form mb-7">
            <input type="text" placeholder="Número de Celular" />
          </form>

          <p className="help-text mb-28">
            Enviaremos un código de confirmación para iniciar el proceso de
            validación de tu identidad.
          </p>

          <button
            className="button-primary mb-16"
            onClick={() => router.push("/verification-code")}
          >
            Enviar código
          </button>

          <div className="border-bottom" />
        </div>

        <div className=" absolute flex justify-center w-full">
          <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white shadow-md px-8 py-6 rounded-lg">
            <h3 className="font-semibold text-lg mb-5 text-center">Ups</h3>
            <p>
              Por el momento no cumples los requisitos Adelantto, te
              recomendamos intentarlo en 3 meses nuevamente
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
