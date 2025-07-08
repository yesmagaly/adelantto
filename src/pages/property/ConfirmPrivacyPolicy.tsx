import { useState } from "react";
import { IonContent, IonHeader, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import useCountDownTimer from "../../hooks/useCountDownTimer";
import { applications, resendPrivacyPolicyVerificationCode } from "../../api";

import * as Modal from "../../components/modal";
import { t } from "@adelantto/utils";
import { MaterialIcon } from "@adelantto/core";

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
  } = useForm();

  const onSubmit = async (data: {} | undefined) => {
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
        <h1 className="text-h5 text-dark-blue-700 gap-2 inline-flex items-center">
          <a href="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </a>
          Confirmar autorización de Buró
        </h1>
        <p className="text-sm text-dark-gray mt-1">
          Autorización para solicitar reportes de crédito, informes buró y
          reportes de crédito especiales
        </p>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="content">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control text-center">
              <label htmlFor="code">Código de confirmación</label>
              <input
                type="numeric"
                maxLength={6}
                minLength={6}
                {...register("code", { required: true })}
                className="mb-4"
              />

              <p className="text-primary-green">
                {minutes}:{seconds}
              </p>

              {errors?.code && (
                <p className="font-medium text-orange-500">
                  {errors.code?.message}
                </p>
              )}

              {isExpired && (
                <p className="font-medium text-orange-500">
                  El código ha expirado.
                </p>
              )}
            </div>

            <div className="mb-8 flex flex-col gap-4 [&>p]:text-balance">
              <p>
                Al confirmar el código SMS, acepto las políticas de privacidad
                de la aplicación.
              </p>

              <p>
                Si no recibiste el código, envíalo nuevamente desde{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  className="font-medium underline"
                >
                  aquí
                </button>
              </p>
            </div>

            <div className="form-actions">
              <button className="btn btn-block btn-primary">Confirmar</button>
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
    </IonPage>
  );
};

export default ConfirmPrivacyPolicy;
