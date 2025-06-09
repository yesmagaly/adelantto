import { useState, useRef, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonFooter,
  useIonRouter,
  IonHeader,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../auth/authContext";
import { authentication, checkZipCode } from "../../api";
import { MaterialIcon } from "@adelantto/core";

type FormValues = {
  name: string;
  first_last_name: string;
  second_last_name: string;
  colony: string;
  municipality: string;
  zip_code: string;
  state: string;
  address: string;
  curp: string;
  rfc: string;
  birthdate: string;
  identification_number: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
};

export const CreateProfilePage: React.FC = () => {
  const tooltipRef = useRef(null);
  const buttonRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const { setUserInfo } = useAuth()!;
  const router = useIonRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showTooltip &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowTooltip(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [tooltipRef, showTooltip]);

  const onSubmit = async (data: FormValues) => {
    const response = await authentication.updateProfile(data);

    if (response.status === 200) {
      setUserInfo(
        "full_name",
        `${data.name} ${data.first_last_name} ${data.second_last_name}`
      );
      router.push(`/applications/lease-contract`);
    }
  };

  const handleBlurZipCode = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value) {
      try {
        const response = await checkZipCode(event.target.value);
        if (response.status === 200) {
          const data = await response.json();
          setValue("municipality", data.municipality);
          setValue("state", data.state);
          setValue("colony", data.place);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <div className="flex justify-between items-center">
          <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h6">
            <a href="/" className="inline-flex items-center">
              <MaterialIcon name="arrow_back" />
            </a>
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
        <form className="grid gap-6" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-sm text-dark-gray">
            Nos gustaría saber cómo dirigirnos a ti. Por favor, ingresa tus
            nombres y apellidos. Esta información es fundamental para crear tu
            perfil y solicitar tu AdelanttoCash®.
          </p>
          <div className="control">
            <label htmlFor="name" className="control-label">
              Nombre
            </label>
            <input
              className="w-full input"
              type="name"
              placeholder="Ingresa tu nombre"
              required
              {...register("name")}
            />
          </div>
          <div className="control">
            <label htmlFor="last_name" className="control-label">
              Apellidos
            </label>
            <input
              className="w-full input"
              type="last_name"
              placeholder="Ingresa tus apellidos"
              required
              {...register("last_name")}
            />
          </div>
          <label className="label">
            <input
              type="checkbox"
              id="agreement"
              className="rounded-sm checkbox checkbox-sm"
              required
            />
            <span className="text-xs text-wrap">
              He leído y estoy de acuerdo con el{" "}
              <a
                href="https://adelanttocash.com/aviso-de-privacidad"
                target="_blank"
                className="text-emerald-700 link"
              >
                Aviso de Privacidad
              </a>
            </span>
          </label>
          <label className="label">
            <input
              type="checkbox"
              id="agreement"
              className="rounded-sm checkbox checkbox-sm"
              required
            />
            <span className="text-xs text-wrap">
              He leído y estoy de acuerdo con los{" "}
              <a
                href="https://adelanttocash.com/terminos-y-condiciones"
                target="_blank"
                className="text-emerald-700 link"
              >
                Términos y Condiciones
              </a>
            </span>
          </label>
        </form>
      </IonContent>
      <IonFooter>
        <button className="btn btn-primary btn-block">Regístrate</button>

        <p className="text-center text-sm mt-6">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="link">
            Iniciar sesión
          </a>
        </p>
      </IonFooter>
    </IonPage>
  );
};
