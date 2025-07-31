import { useEffect, useRef, useState } from "react";
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { Link, RouteComponentProps } from "react-router-dom";

import { handleServerErrors } from "@adelantto/utils";
import { MaterialIcon } from "@adelantto/core";
import useCountDownTimer from "../../hooks/useCountDownTimer";
import { applications, resendPrivacyPolicyVerificationCode } from "../../api";
import exclamation from "../../assets/svgs/exclamation.svg";
import { useConfirmPrivacyPolicyMutation } from "@adelantto/store";

type T_form = {
  code1?: number;
  code2?: number;
  code3?: number;
  code4?: number;

  code: string;
};

type T_props = RouteComponentProps<{
  id: string;
}>;

const ConfirmPrivacyPolicy: React.FC<T_props> = ({ match }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const inputsContainerRef = useRef<HTMLDivElement>(null);
  const router = useIonRouter();
  const [diplayThrottleError, setDiplayThrottleError] = useState(false);
  const [_displayedCounter, setDisplayedCounter] = useState(true);
  const { minutes, seconds, isExpired, stopTimer, resetTimer } =
    useCountDownTimer(3);

  const {
    handleSubmit,
    register,
    reset,
    setError,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<T_form>();

  const [mutation] = useConfirmPrivacyPolicyMutation();

  const onSubmit = async (data: T_form) => {
    const id = match.params.id;
    try {
      await mutation({
        id: match.params.id,
        ...data,
      }).unwrap();

      router.push(`/applications/${id}/final-announcement`);
    } catch (error: any) {

      if (error.data.message === "BUREAU_SCORE_IS_TOO_LOW") {
        return router.push(`/applications/${id}/fail-buro-score`);
      }

      handleServerErrors<T_form>(["code"], error.data.errors).forEach(
        ([field, errorOption]) => setError(field, errorOption)
      );
    }
  };

  const handleResendCode = async () => {
    reset();

    const response = await resendPrivacyPolicyVerificationCode();

    if (response.status === 200 && modalRef.current) {
      setDiplayThrottleError(false);
      setDisplayedCounter(true);
      modalRef.current.showModal();
      resetTimer();
    } else if (response.status === 429) {
      setDiplayThrottleError(true);
    }
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

  useEffect(() => {
    if (inputsContainerRef.current) {
      inputsContainerRef.current.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", (e) => {
          const target = e.target as HTMLInputElement;

          if (target.value.length >= target.maxLength) {
            const nextInput = target.nextElementSibling as HTMLInputElement;

            if (nextInput) {
              nextInput.focus();
            }
          }
        });
      });
    }
  }, []);

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

                <div className="flex gap-4" ref={inputsContainerRef}>
                  <input
                    {...register("code1")}
                    className="h-24 text-center input validator"
                    maxLength={1}
                    minLength={1}
                    placeholder="0"
                    required
                    type="text"
                    inputMode="numeric"
                    aria-invalid={errors.code ? "true" : "false"}
                  />
                  <input
                    {...register("code2")}
                    className="h-24 text-center input validator"
                    maxLength={1}
                    minLength={1}
                    placeholder="0"
                    required
                    type="text"
                    inputMode="numeric"
                    aria-invalid={errors.code ? "true" : "false"}
                  />
                  <input
                    {...register("code3")}
                    className="h-24 text-center input validator"
                    maxLength={1}
                    minLength={1}
                    placeholder="0"
                    required
                    type="text"
                    inputMode="numeric"
                    aria-invalid={errors.code ? "true" : "false"}
                  />
                  <input
                    {...register("code4")}
                    className="h-24 text-center input validator"
                    maxLength={1}
                    minLength={1}
                    placeholder="0"
                    required
                    type="text"
                    inputMode="numeric"
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
              <button onClick={handleResendCode} className="link" type="button">
                Reenviar código
              </button>
            </div>
          </form>
        </div>

        <dialog ref={modalRef} id="my_modal_1" className="modal">
          <div className="modal-box">
            <button
              className="top-0.5 right-0.5 absolute btn btn-sm btn-circle btn-ghost"
              onClick={() => modalRef.current?.close()}
            >
              <MaterialIcon name="close" className="text-red-500" size="20px" />
            </button>

            <div className="flex flex-col items-center gap-6">
              <img src={exclamation} alt="exclamation" className="size-24" />

              <div className="flex flex-col items-center gap-2">
                <p className="max-w-3/4 text-sm text-center">
                  Se ha vuelto a enviar un SMS con el código de confirmación a
                  su número de teléfono.
                </p>
              </div>
            </div>

            <div className="justify-center px-4 modal-action">
              <form method="dialog" className="w-full">
                <button className="btn-block btn btn-primary">Continuar</button>
              </form>
            </div>
          </div>
        </dialog>

        {diplayThrottleError && (
          <div className="my-4">
            <p className="validator-visible text-center validator-hint">
              Demasiados intentos, inténtalo de nuevo después de un minuto.
            </p>
          </div>
        )}
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
