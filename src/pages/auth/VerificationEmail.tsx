import { useState } from "react";
import { RouteComponentProps } from "react-router";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm } from "react-hook-form";

import emailAnimation from "../../assets/animations/email.json";
import Modal from "../../components/modal";
import Loader from "../../components/Loader/Loader";
import { API_SERVER_URL } from "../../config";

interface VerificationEmailProps
  extends RouteComponentProps<{
    phone: string;
  }> { }

type FormValues = {
  email: number;
};

const VerificationEmail: React.FC<VerificationEmailProps> = ({ match }) => {
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
    const phone = match.params.phone;

    // Send phone request.
    const response = await fetch(`${API_SERVER_URL}/api/send-email-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, phone }),
    });

    const json = await response.json();

    if (json.status === "success") {
      router.push(`/login`);
    } else {
      // Show server errors.
      setError("email", { message: json.message, type: "server" });
      setIsOpen(true);
    }
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
                Enviaremos una contraseña a tu cuenta de correo para que puedas
                {"  "}
                <a href="/login" className="underline">
                  iniciar sesión.
                </a>
              </p>
            </div>

            <button className="button is-primary">Enviar código</button>
          </form>

          <div className="border-bottom border-primary-blue" />
        </div>

        <Loader isOpen={isSubmitting} />

        <Modal isOpen={isOpen}>
          <h3 className="mb-5 text-center text-lg font-semibold">
            Lo sentimos
          </h3>
          {<p>{errors?.email?.message}</p>}
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

export default VerificationEmail;
