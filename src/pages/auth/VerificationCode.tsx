import { useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  useIonRouter,
} from "@ionic/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { MaterialIcon } from "@adelantto/core";
import { Link } from "react-router-dom";
import {
  setCredentials,
  useResendVerificationCodeMutation,
  useVerifyPhoneCodeMutation,
} from "@adelantto/store";
import exclamation from "../../assets/svgs/exclamation.svg";
import { handleServerErrors } from "@adelantto/utils";
import { useDispatch } from "react-redux";

type T_props = RouteComponentProps<{
  id: string;
}>;

type T_form = {
  code1: number;
  code2: number;
  code3: number;
  code4: number;

  code: string; // This is used to store the concatenated code.
};

const VerificationCode: React.FC<T_props> = ({ match, ...props }) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const inputsContainerRef = useRef<HTMLDivElement>(null);

  const [resendVerificationCode] = useResendVerificationCodeMutation();
  const [verifyPhoneCode] = useVerifyPhoneCodeMutation();
  const dispatch = useDispatch();
  const router = useIonRouter();
  const id = match.params.id;

  // Get phone from URL parameters.
  const params = new URLSearchParams(props.location.search);
  const phone = params.get("phone") || "";

  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<T_form>();

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

  const onSubmit: SubmitHandler<T_form> = async function (form: T_form) {
    try {
      const response = await verifyPhoneCode({ id, code: form.code }).unwrap();
      dispatch(setCredentials(response));
      router.push(`/profile/create`);
    } catch (error: any) {
      if (error?.data?.errors) {
        handleServerErrors<T_form>(["code"], error?.data?.errors).forEach(
          ([field, errorOption]) => setError(field, errorOption)
        );
      }
    }
  };

  const handleResendCode = async () => {
    if (id && modalRef.current) {
      try {
        reset(); // Reset the form inputs
        await resendVerificationCode(id).unwrap();
        modalRef.current.showModal();
      } catch (error) {
        console.error("Error resending verification code:", error);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="flex justify-between items-center">
          <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h6">
            <Link to="/register" className="inline-flex items-center">
              <MaterialIcon name="arrow_back" />
            </Link>
            Verificar cuenta
          </h1>
        </div>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <form className="mb-12" onSubmit={handleSubmit(onSubmit)}>
          <p className="mb-6 text-dark-gray text-sm">
            Confirma tus datos de contacto ingresando el código que te enviamos
            a tu teléfono <b>+{phone.trim()}</b>. Esto nos permite continuar de
            forma segura.
          </p>

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
        </form>

        <div className="gap-2 grid text-center">
          <p>¿No has recibido el código?</p>
          <button onClick={handleResendCode} className="link" type="button">
            Reenviar código
          </button>
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
                <button className="btn-block btn btn-primary">Cerrar</button>
              </form>
            </div>
          </div>
        </dialog>
      </IonContent>

      <IonFooter className="ion-padding">
        <input
          type="hidden"
          name="root"
          className="input validator"
          aria-invalid={errors.root ? "true" : "false"}
        />
        <p className="hidden mb-4 text-center validator-hint">
          {errors.root?.message}
        </p>

        <button
          disabled={isSubmitting}
          className="btn-block btn btn-primary"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Verificar cuenta
        </button>

        <p className="mt-6 text-sm text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="link">
            Iniciar sesión
          </Link>
        </p>
      </IonFooter>
    </IonPage>
  );
};

export default VerificationCode;
