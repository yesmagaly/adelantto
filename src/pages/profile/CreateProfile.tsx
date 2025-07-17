import {
  IonContent,
  IonPage,
  IonFooter,
  useIonRouter,
  IonHeader,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { MaterialIcon } from "@adelantto/core";
import { API_SERVER_URL } from "../../config";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router";

type T_form = {
  name: string;
  last_name: string;
  accept_privacy_policy: boolean;
  accept_terms_and_conditions: boolean;
};

type T_props = RouteComponentProps<{
  id: string;
}>;

export const CreateProfilePage: React.FC<T_props> = ({ match }) => {
  const router = useIonRouter();
  const { id } = match.params;

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<T_form>();

  const onSubmit = async (form: T_form) => {
    const response = await fetch(`${API_SERVER_URL}/api/auth/${id}/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      router.push(`/login`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="flex justify-between items-center">
          <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h6">
            <Link to="/" className="inline-flex items-center">
              <MaterialIcon name="arrow_back" />
            </Link>
            Crear tu perfil
          </h1>
          <span className="badge badge-primary badge-sm">Paso 2/ 2</span>
        </div>

        <progress
          className="mt-2 w-full h-[5px] text-indigo-300 progress"
          value="100"
          max="100"
        ></progress>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <form className="gap-6 grid" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-dark-gray text-sm">
            Nos gustaría saber cómo dirigirnos a ti. Por favor, ingresa tus
            nombres y apellidos. Esta información es fundamental para crear tu
            perfil y solicitar tu AdelanttoCash®.
          </p>
          <div className="control">
            <label htmlFor="name" className="control-label">
              Nombre
            </label>
            <input
              {...register("name", {
                required: "Tu nombre es requerido.",
              })}
              className="input validator"
              type="text"
              placeholder="Ingresa tu nombre"
              required
              aria-invalid={errors.name ? "true" : "false"}
            />
            <p className="hidden validator-hint">{errors.name?.message}</p>
          </div>
          <div className="control">
            <label htmlFor="last_name" className="control-label">
              Apellidos
            </label>
            <input
              {...register("last_name", {
                required: "Tus apellidos son requeridos.",
              })}
              className="input validator"
              type="text"
              placeholder="Ingresa tus apellidos"
              required
              aria-invalid={errors.last_name ? "true" : "false"}
            />
            <p className="hidden validator-hint">{errors.last_name?.message}</p>
          </div>

          <label className="relative mb-2 label">
            <input
              {...register("accept_privacy_policy", {
                required: "Debes aceptar el aviso de privacidad.",
              })}
              type="checkbox"
              className="rounded-sm checkbox checkbox-sm validator"
              required
              aria-invalid={errors.accept_privacy_policy ? "true" : "false"}
            />
            <span className="text-xs text-wrap">
              He leído y estoy de acuerdo con el{" "}
              <Link
                to="https://adelanttocash.com/aviso-de-privacidad"
                target="_blank"
                className="text-emerald-700 link"
              >
                Aviso de Privacidad
              </Link>
            </span>
            <p className="-bottom-5 absolute validator-hint">
              {errors.accept_privacy_policy?.message}
            </p>
          </label>

          <label className="relative label">
            <input
              {...register("accept_terms_and_conditions", {
                required: "Debes aceptar los términos y condiciones.",
              })}
              type="checkbox"
              className="rounded-sm checkbox checkbox-sm validator"
              required
              aria-invalid={
                errors.accept_terms_and_conditions ? "true" : "false"
              }
            />
            <span className="text-xs text-wrap">
              He leído y estoy de acuerdo con los{" "}
              <Link
                to="https://adelanttocash.com/terminos-y-condiciones"
                target="_blank"
                className="text-emerald-700 link"
              >
                Términos y Condiciones
              </Link>
            </span>
            <p className="-bottom-5 absolute validator-hint">
              {errors.accept_terms_and_conditions?.message}
            </p>
          </label>
        </form>
      </IonContent>
      <IonFooter className="ion-padding">
        <button
          disabled={isSubmitting}
          className="btn-block btn btn-primary"
          onClick={() => handleSubmit(onSubmit)()}
        >
          Regístrate
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
