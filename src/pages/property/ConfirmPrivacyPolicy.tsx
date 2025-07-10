import { useState } from "react";
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import useCountDownTimer from "../../hooks/useCountDownTimer";
import { applications, resendPrivacyPolicyVerificationCode } from "../../api";

import * as Modal from "../../components/modal";
import { t } from "@adelantto/utils";
import { MaterialIcon } from "@adelantto/core";

type T_form = {
  code: string;
};

const ConfirmPrivacyPolicy: React.FC = ({ match }) => {
  const [displayedSentModal, setSentModal] = useState(false);
  const [displayedErrorModal, setErrorModal] = useState(false);
  const [displayedCounter, setDisplayedCounter] = useState(true);
  const { minutes, seconds, isExpired, stopTimer, resetTimer } =
    useCountDownTimer(3);
  const router = useIonRouter();
  const applicationId = match.params.id;

  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm<T_form>();

  const onSubmit = async (data: T_form) => {
    const response = await applications.confirmPrivacyPolicy(
      applicationId,
      data
    );

    if (response.status === 200) {
      stopTimer();
      router.push(`/applications/${applicationId}/identity-check`);
    } else {
      const error = await response.json();
      setDisplayedCounter(false);

      if (error.type === "BUREAU_SCORE_TOO_LOW") {
        router.push(`/applications/${applicationId}/fail-buro-score`);
      } else if (error.type === "INVALID_CODE") {
        setError("code", { message: t(error.message) });
      }
    }
  };

  const handleResendCode = async () => {
    reset();

    try {
      const response = await resendPrivacyPolicyVerificationCode();

      if (response.status === 200) {
        setSentModal(true);
        setDisplayedCounter(true);
        resetTimer();
      } else if (response.status === 429) {
        setErrorModal(true);
      }
    } catch (error) {}
  };

  return (
    <IonPage>
      <IonHeader>
        <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h5">
          <a href="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </a>
          Confirmar autorización de Buró
        </h1>
        <p className="mt-1 text-dark-gray text-sm">
          Autorización para solicitar reportes de crédito, informes buró y
          reportes de crédito especiales
        </p>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="content">
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="control">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Código de confirmación
                </legend>
                <input
                  type="numeric"
                  maxLength={6}
                  minLength={6}
                  {...register("code", { required: true })}
                  className="input validator"
                  aria-invalid={errors.code ? "true" : "false"}
                />
                <p className="text-center">
                  El código expirará en {minutes}:{seconds} min
                </p>
              </fieldset>

              <p className="text-primary-green">
              </p>

              <p className="hidden validator-hint">{errors.code?.message}</p>

              {isExpired && (
                <p className="font-medium text-orange-500">
                  El código ha expirado.
                </p>
              )}
            </div>

            <div className="mt-6 text-center">
              <p>¿No has recibido el código?</p>
              <a onClick={() => router.push("/register")} className="link">
                Reenviar código
              </a>
            </div>
          </form>
        </div>

        <Modal.Root isOpen={displayedSentModal}>
          <Modal.Body>
            <p>
              Se ha vuelto a enviar un SMS con el código de confirmación a su
              número de teléfono.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button className="button" onClick={() => setSentModal(false)}>
              Continuar
            </button>
          </Modal.Footer>
        </Modal.Root>

        <Modal.Root isOpen={displayedErrorModal}>
          <Modal.Header>
            <h4 className="font-semibold">Demasiados intentos.</h4>
          </Modal.Header>
          <Modal.Body>
            <p>Inténtalo de nuevo después de un minuto.</p>
          </Modal.Body>
          <Modal.Footer>
            <button className="button" onClick={() => setErrorModal(false)}>
              Aceptar
            </button>
          </Modal.Footer>
        </Modal.Root>
      </IonContent>
      <IonFooter className="ion-padding">
        <button form="form" type="submit" className="btn-block btn btn-primary">
          Confirmar
        </button>

        <p className="mt-4 text-gray-800 text-xs text-center">
          Al confirmar el código SMS, acepto las{" "}
          <a className="text-emerald-700 link" href="#">
            Políticas de Privacidad
          </a>{" "}
          de la aplicación.
        </p>
      </IonFooter>
    </IonPage>
  );
};

export default ConfirmPrivacyPolicy;
