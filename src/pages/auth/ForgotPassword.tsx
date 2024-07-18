import { useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import Modal from "../../components/modal";
import Loader from "../../components/Loader/Loader";

import registerAnimation from "../../assets/animations/register.json";
import { API_SERVER_URL } from "../../config";
import { authentication } from "../../api";

type FormValues = {
  email: string | undefined;
};

const ForgotPassword: React.FC = () => {
  const [showErrorModal, setErrorModal] = useState(false);
  const [showSuccessModal, setSuccessModal] = useState(false);
  const router = useIonRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async function (data: FormValues) {
    const response = await authentication.forgotPassword(data);
    const json = await response.json();

    if (response.status === 200) {
      setSuccessModal(true);
    } else {
      // Show server errors.
      setError("email", { message: json.message, type: "server" });
      setErrorModal(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--green">
          <h1 className="heading__title">
            Recuperar <strong>contraseña</strong>
          </h1>
        </div>

        <div className="content">
          <Lottie
            animationData={registerAnimation}
            style={{ width: 174, height: 262 }}
            loop
            play
          />

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <p className="help-text mb-10">
              Enviaremos una contraseña temporal a tu correo electrónico.
            </p>

            <div className="mb-6">
              <input type="email" required placeholder="Email" {...register('email')} />
            </div>
            <button className="button is-primary">Enviar</button>
          </form>
        </div>

        <Loader isOpen={isSubmitting} />

        <Modal isOpen={showSuccessModal}>
          <h3 className="mb-5 text-center text-lg font-semibold">
            Success
          </h3>
          <p>Una contraseña temporal fue enviada a su correo electrónico.</p>
          <button className="button is-primary" onClick={() => router.push(`/login`)}>
            Continuar
          </button>
        </Modal>

        <Modal isOpen={showErrorModal}>
          <h3 className="mb-5 text-center text-lg font-semibold">
            Lo sentimos
          </h3>

          {errors?.email && <p>{errors?.email?.message}</p>}

          <button className="button is-primary" onClick={() => setErrorModal(false)}>
            Cerrar
          </button>
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
