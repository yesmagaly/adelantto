import { useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import Modal from "../../components/modal";
import Loader from "../../components/Loader/Loader";

import registerAnimation from "../../assets/animations/register.json";
import { API_SERVER_URL } from "../../config";

type FormValues = {
  phone: string | undefined;
};

const PHONE_FORMAT_10 = "+57 (###) ###-####";
const PHONE_FORMAT_9 = "+## (###) ###-###";

const Register: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useIonRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const validate = function (values: FormValues) {
    const errors = {};

    if (!values.phone) {
      errors.phone = {
        type: "required",
        message: "The cellphone number is required.",
      };
    }

    // else if (
    //   !/^\+[0-9]{2}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/g.test(values.phone)
    // ) {
    //   errors.phone = {
    //     type: "pattern",
    //     message: "Invalid cellphone number.",
    //   };
    // }

    return errors;
  };

  const onSubmit = async function (data: FormValues) {
    // Make validaions.
    const errors = validate(data);

    // Show phone errors.
    if (errors.phone) {
      setError("phone", errors.phone);
      setIsOpen(true);
      return;
    }

    // Clean up phone number.
    const phone = data?.phone.replaceAll(/[-|\(|\)]/g, "")
      .replaceAll(" ", "");

    // Send phone request.
    const response = await fetch(
      `${API_SERVER_URL}/api/send-verification-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ phone }),
    });

    const json = await response.json();

    if (json.status === "success") {
      router.push(`/verification-code/${phone}`);
    } else {
      // Show server errors.
      setError("phone", { message: json.message, type: "server" });
      setIsOpen(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--green">
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
              <Controller
                control={control}
                name="phone"
                render={({ field: { ref, ...field } }) => (
                  <PatternFormat
                    {...field}
                    className="pattern-format"
                    placeholder="Número de Celular"
                    type="tel"
                    format={PHONE_FORMAT_10}
                    allowEmptyFormatting
                    mask="_"
                    required
                    getInputRef={ref}
                  />
                )}
              />
            </div>

            <p className="help-text mb-28">
              Enviaremos un código de confirmación para iniciar el proceso de
              validación de tu identidad.
            </p>

            <button className="button is-primary">Enviar código</button>
          </form>

          <div className="border-bottom border-primary-blue" />
        </div>

        <Loader isOpen={isSubmitting} />

        <Modal isOpen={isOpen}>
          <h3 className="font-semibold text-lg text-center">
            Lo sentimos
          </h3>
          {<p>{errors?.phone?.message}</p>}
          <button className="button is-primary" onClick={() => setIsOpen(false)}>
            Aceptar
          </button>
        </Modal>
      </IonContent>
    </IonPage>
  );
};

export default Register;
