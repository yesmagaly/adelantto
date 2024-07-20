import { useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import parsePhoneNumber from "libphonenumber-js";

import { PatternFormat } from "react-number-format";
import Modal from "../../components/modal";
import Loader from "../../components/Loader/Loader";

import registerAnimation from "../../assets/animations/register.json";
import { API_SERVER_URL, PROD_MODE } from "../../config";
import { t } from "@adelantto/utils";

type FormValues = {
  phone: string;
};

const PHONE_FORMAT = PROD_MODE ? "+52 (##) ####-####" : "+## (###) ###-####";
const cleanUpPhone = (phone = "") => phone.replaceAll(/[-|\(|\)]/g, "").replaceAll(" ", "");

const Register: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useIonRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const validate = function (values: FormValues) {
    const errors = {} as FieldErrors;

    if (!values.phone) {
      errors.phone = {
        type: "required",
        message: t("Your cellphone number is required."),
      };
    } else if (values.phone && !parsePhoneNumber(cleanUpPhone(values.phone))?.isValid()) {
      errors.phone = {
        type: "pattern",
        message: t("Your cellphone number is invalid."),
      };
    }

    return errors;
  };

  const onSubmit = async function (data: any) {
    // Make validaions.
    const errors = validate(data);

    // Show phone errors.
    if (errors.phone) {
      setError("phone", errors.phone);
      setIsOpen(true);
      return;
    }

    // Clean up phone number.
    const phone = cleanUpPhone(data?.phone);

    // Send phone request.
    const response = await fetch(
      `${API_SERVER_URL}/api/send-verification-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ phone }),
      }
    );

    const json = await response.json();

    if (json.status === "success") {
      router.push(`/verification-code/${phone}`);
    } else {
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
            <strong>tu número celular</strong>
          </h1>
          <p className="heading__headline">
            Esto nos ayudará a validar tu identidad
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
                    format={PHONE_FORMAT}
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
          <h3 className="text-center text-lg font-semibold">Lo sentimos</h3>
          {errors?.phone && <p>{errors.phone?.message}</p>}
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

export default Register;
