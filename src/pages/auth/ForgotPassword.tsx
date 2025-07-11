import { useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import { authentication } from "../../api";
import Modal from "../../components/modal";
import Loader from "../../components/Loader/Loader";
import adelanttoBgUrl from "../../v2/assets/images/adelantto-bg.png";
import logo from "../../assets/icons/logo.svg";

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
      <IonContent
        class="ion-padding"
        style={{
          "--background": `url(${adelanttoBgUrl}) no-repeat center top`,
        }}
      >
        <div className="flex flex-col justify-center py-6 h-full">
          <img className="mx-auto mb-12 h-40" src={logo} alt="Adelantto Logo" />
          <h1 className="mb-2 w-full font-semibold text-xl">
            Recuperar contraseña
          </h1>

          {errors.root && (
            <p className="validator-visible mb-4 validator-hint">
              {errors.root?.message}
            </p>
          )}

          <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="control">
              <label className="control-label">
                Enviaremos una contraseña temporal a tu correo electrónico.
              </label>
              <input
                {...register("email")}
                className="input validator"
                placeholder="Email"
                required
                type="email"
                aria-invalid={errors.root || errors.email ? "true" : "false"}
              />
            </div>
            <button className="btn-block btn btn-primary">Enviar</button>
          </form>

          <Loader isOpen={isSubmitting} />
        </div>

        <Modal isOpen={showSuccessModal}>
          <h3 className="mb-5 font-semibold text-lg text-center">Success</h3>
          <p>Una contraseña temporal fue enviada a su correo electrónico.</p>
          <button
            className="button is-primary"
            onClick={() => router.push(`/login`)}
          >
            Continuar
          </button>
        </Modal>

        <Modal isOpen={showErrorModal}>
          <h3 className="mb-5 font-semibold text-lg text-center">
            Lo sentimos
          </h3>

          {errors?.email && <p>{errors?.email?.message}</p>}

          <button
            className="button is-primary"
            onClick={() => setErrorModal(false)}
          >
            Cerrar
          </button>
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
