import { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { useForm } from "react-hook-form";

import { t } from "@adelantto/utils";
import { MaterialIcon } from "@adelantto/core";
import useCountDownTimer from "../../hooks/useCountDownTimer";
import { applications, resendPrivacyPolicyVerificationCode } from "../../api";
import { Link } from "react-router-dom";

type T_form = {
  code1?: number;
  code2?: number;
  code3?: number;
  code4?: number;

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
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<T_form>();

  const onSubmit = async (data: T_form) => {
    const response = await applications.confirmPrivacyPolicy(
      applicationId,
      data
    );

    if (response.status === 200) {
      stopTimer();
      // router.push(`/applications/${applicationId}/identity-check`);
    } else {
      const error = await response.json();
      setDisplayedCounter(false);

      if (error.type === "BUREAU_SCORE_TOO_LOW") {
        // router.push(`/applications/${applicationId}/fail-buro-score`);
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
    } catch {}
  };

  useEffect(() => {
    const subscribe = watch((form, { type }) => {
      if (type === "change") {
        const code = `${form.code1}${form.code2}${form.code3}${form.code4}`;

        setValue("code", code, { shouldValidate: true });
      }
    });

    return () => {
      subscribe.unsubscribe();
    };
  }, [watch]);

  return (
    <IonPage>
      <IonHeader>
        <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h5">
          <Link to="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </Link>
          Autorización de Buro
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
                <legend className="text-center fieldset-legend">
                  Código de confirmación
                </legend>

                <div className="flex gap-4">
                  <input
                    {...register("code1")}
                    className="h-24 text-center input validator"
                    maxLength={1}
                    minLength={1}
                    placeholder="0"
                    required
                    type="numeric"
                    aria-invalid={errors.code ? "true" : "false"}
                  />
                  <input
                    {...register("code2")}
                    className="h-24 text-center input validator"
                    maxLength={1}
                    minLength={1}
                    placeholder="0"
                    required
                    type="numeric"
                    aria-invalid={errors.code ? "true" : "false"}
                  />
                  <input
                    {...register("code3")}
                    className="h-24 text-center input validator"
                    maxLength={1}
                    minLength={1}
                    placeholder="0"
                    required
                    type="numeric"
                    aria-invalid={errors.code ? "true" : "false"}
                  />
                  <input
                    {...register("code4")}
                    className="h-24 text-center input validator"
                    maxLength={1}
                    minLength={1}
                    placeholder="0"
                    required
                    type="numeric"
                    aria-invalid={errors.code ? "true" : "false"}
                  />
                </div>

                <input
                  {...register("code")}
                  type="hidden"
                  className="input validator"
                  aria-invalid={errors.code ? "true" : "false"}
                />
                <p className="hidden text-center validator-hint">
                  {errors.code?.message}
                </p>

                {!isExpired && (
                  <p className="mt-1 text-center">
                    El código expirará en{" "}
                    <span className="font-medium">
                      {minutes}:{seconds}
                    </span>{" "}
                    min
                  </p>
                )}
              </fieldset>
            </div>

            <div className="mt-8 text-center">
              <p>¿No has recibido el código?</p>
              <Link to="/register" className="link">
                Reenviar código
              </Link>
            </div>
          </form>
        </div>

        <div data-modal data-isOpen={displayedSentModal}>
          <div>
            <p>
              Se ha vuelto a enviar un SMS con el código de confirmación a su
              número de teléfono.
            </p>
          </div>
          <div>
            <button className="button" onClick={() => setSentModal(false)}>
              Continuar
            </button>
          </div>
        </div>

        <div data-modal data-isOpen={displayedErrorModal}>
          <div>
            <h4 className="font-semibold">Demasiados intentos.</h4>
          </div>
          <div>
            <p>Inténtalo de nuevo después de un minuto.</p>
          </div>
          <div>
            <button className="button" onClick={() => setErrorModal(false)}>
              Aceptar
            </button>
          </div>
        </div>
      </IonContent>
      <IonFooter className="ion-padding">
        <button
          form="form"
          type="submit"
          disabled={isSubmitting}
          className="btn-block btn btn-primary"
        >
          Confirmar
        </button>

        <p className="mt-4 text-gray-800 text-xs text-center">
          Al confirmar el código SMS, acepto las{" "}
          <Link className="text-emerald-700 link" to="#">
            Políticas de Privacidad
          </Link>{" "}
          de la aplicación.
        </p>
      </IonFooter>
    </IonPage>
  );
};

export default ConfirmPrivacyPolicy;
