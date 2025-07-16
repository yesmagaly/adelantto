import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  useIonRouter,
} from "@ionic/react";

import Modal from "../../components/modal";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { API_SERVER_URL } from "../../config";
import { MaterialIcon } from "@adelantto/core";

interface ComponentProps
  extends RouteComponentProps<{
    id: string;
  }> {}

type T_form = {
  code1: number;
  code2: number;
  code3: number;
  code4: number;

  code: string; // This is used to store the concatenated code.
};

const VerificationCode: React.FC<ComponentProps> = ({ match, ...props }) => {
  console.log(match, props);

  const [isOpen, setIsOpen] = useState(false);
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
    formState: { isSubmitting, errors },
  } = useForm<T_form>();

  useEffect(() => {
    const subscribe = watch((form, { name, type }) => {
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
    const response = await fetch(
      `${API_SERVER_URL}/api/auth/${id}/verify-phone-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ code: form.code }),
      }
    );

    const data = await response.json();

    if (response.ok && data.id) {
      router.push(`/create-profile/${id}`);
    } else {
      const errorFields = ["code", "root"];

      errorFields.forEach((field) => {
        if (data?.status === "fail" && data.errors[field]) {
          setError(field as keyof FieldErrors<T_form>, {
            message: data.errors[field][0],
            type: "server",
          });
        }
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="flex justify-between items-center">
          <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h6">
            <a href="/register" className="inline-flex items-center">
              <MaterialIcon name="arrow_back" />
            </a>
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
        </form>

        <div className="gap-2 grid text-center">
          <p>¿No has recibido el código?</p>
          <a onClick={() => router.push("/register")} className="link">
            Reenviar código
          </a>
        </div>

        <Modal isOpen={isOpen}>
          <h3 className="mb-5 font-semibold text-lg text-center">
            Lo sentimos
          </h3>
          {<p>{errors?.code?.message}</p>}

          <button
            className="button is-primary"
            onClick={() => setIsOpen(false)}
          >
            Aceptar
          </button>
        </Modal>
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
          <a href="/login" className="link">
            Iniciar sesión
          </a>
        </p>
      </IonFooter>
    </IonPage>
  );
};

export default VerificationCode;
