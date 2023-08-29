import { useState } from "react";
import { RouteComponentProps } from "react-router";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm } from "react-hook-form";

import emailAnimation from "../assets/animations/email.json";
import Modal from "../components/Modal/Modal";
import Loader from "../components/Loader/Loader";

interface VerificationEmailProps
  extends RouteComponentProps<{
    phone: string;
  }> {}

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
    const response = await fetch(
      "http://adelantto-server.docksal/api/send-email-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, phone }),
      }
    );

    const json = await response.json();

    if (json.status === "success") {
      router.push(`/advance-immediately`);
    } else {
      // Show server errors.
      setError("email", { message: json.message, type: "server" });
      setIsOpen(true);
    }

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

          <div className="border-bottom border-primary-blue" />
        </div>

        <Loader isOpen={isSubmitting} />

        <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
          <h3 className="font-semibold text-lg mb-5 text-center">
            Lo sentimos
          </h3>
          {<p>{errors?.email?.message}</p>}
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default VerificationEmail;
