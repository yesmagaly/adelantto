import { useRef } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import { useRecoverPasswordMutation } from "@adelantto/store";

import logo from "../../assets/icons/logo.svg";
import adelanttoBgUrl from "../../v2/assets/images/adelantto-bg.png";
import exclamation from "../../v2/assets/svgs/exclamation.svg";
import { handleServerErrors, t } from "@adelantto/utils";

type T_form = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const [mutation] = useRecoverPasswordMutation();
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<T_form>();

  const onSubmit = async function (form: T_form) {
    try {
      await mutation(form).unwrap();

      if (modalRef.current) {
        modalRef.current.showModal();
      }
    } catch (error: any) {
      const errors = error?.data?.errors;

      if (errors) {
        handleServerErrors<T_form>(["email"], errors).forEach(
          ([field, errorOption]) => setError(field, errorOption)
        );
      } else {
        setError("root", {
          message: t("Something went wrong"),
          type: "server",
        });
      }
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

          <form className="gap-6 grid" onSubmit={handleSubmit(onSubmit)}>
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
              <p className="hidden validator-hint">{errors.email?.message}</p>
            </div>

            <button
              className="btn-block btn btn-primary"
              disabled={isSubmitting}
            >
              Enviar
            </button>
          </form>
        </div>

        <dialog ref={modalRef} id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="flex flex-col items-center gap-6">
              <img src={exclamation} alt="exclamation" className="size-24" />

              <div className="flex flex-col items-center gap-2">
                <p className="max-w-3/4 text-sm text-center">
                  Una contraseña temporal fue enviada a su correo electrónico.
                </p>
              </div>
            </div>

            <div className="justify-center px-4 modal-action">
              <form method="dialog" className="w-full">
                <button
                  className="btn-block btn btn-primary"
                  onClick={() => router.push("/login")}
                >
                  Continuar
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
