import {
  IonContent,
  IonPage,
  useIonRouter,
  IonHeader,
  IonFooter,
} from "@ionic/react";
import { useForm } from "react-hook-form";

import { MaterialIcon } from "@adelantto/core";
import {
  useUpdateUserMutation,
  useLazyGetUserQuery,
  useLazyCheckZipCodeQuery,
} from "@adelantto/store";

import frontIdImageUrl from "./assets/images/front-id.png";
import backIdImageUrl from "./assets/images/back-id.png";
import FileInputItem from "../../components/FileInputItem";
import { Link } from "react-router-dom";
import { handleServerErrors } from "@adelantto/utils";

type T_form = {
  back_document?: File;
  front_document?: File;
  curp_number?: string;
  birthdate?: string;
  address?: string;
  zip_code?: string;
};

export const IdentificationPage: React.FC = () => {
  const router = useIonRouter();
  const [mutation] = useUpdateUserMutation();
  const [getUserQuery] = useLazyGetUserQuery();
  const [checkZipCodeQuery] = useLazyCheckZipCodeQuery();

  const {
    handleSubmit,
    control,
    register,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<T_form>({
    defaultValues: async () => {
      try {
        return await getUserQuery().unwrap();
      } catch {
        return {};
      }
    },
  });

  const onSubmit = async (form: T_form) => {
    try {
      if (form.zip_code) {
        await checkZipCodeQuery(form.zip_code).unwrap();
      }
    } catch (error: any) {
      setError("zip_code", {
        type: "manual",
        message: error.data?.message || "Código postal inválido",
      });

      return;
    }

    try {
      await mutation(form).unwrap();
      router.push("/profile/biometric-validation");
    } catch (error) {
      const errors = error?.data?.errors;

      if (errors) {
        handleServerErrors<T_form>([
            "back_document",
            "front_document",
            "curp_number",
            "birthdate",
            "address",
            "zip_code",
        ],
        errors).forEach(([field, errorOption]) => setError(field, errorOption));
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
      <IonHeader>
        <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h5">
          <Link to="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </Link>
          Completa tu perfil
        </h1>
        <p className="mt-1 text-dark-gray text-sm">
          Ingresa tus datos básicos para identificarte correctamente. Esta
          información es necesaria para poder solicitar tu primer
          AdelanttoCash®.
        </p>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="flex justify-between items-center">
          <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h6">
            Identificación
          </h1>
          <span className="badge badge-primary badge-sm">Paso 1/ 3</span>
        </div>
        <progress
          className="mt-2 mb-4 w-full h-[5px] text-indigo-300 progress"
          value="33"
          max="100"
        ></progress>

        <form
          id="form"
          className="gap-4 grid"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FileInputItem
            name="front_document"
            control={control}
            rules={{ required: "Imagen requerida" }}
            accept="image/*"
            label="Frontal INE o Pasaporte"
            description="Cara frontal donde sale la foto"
            helpText="Tipo de archivo permitido JPEG (500MB max)"
            helpPicture={frontIdImageUrl}
          />
          <FileInputItem
            name="back_document"
            control={control}
            rules={{ required: "Imagen requerida" }}
            accept="image/*"
            label="Reverso INE o Pasaporte"
            description="Cara trasera donde está el código de barras"
            helpText="Tipo de archivo permitido JPEG (500MB max)"
            helpPicture={backIdImageUrl}
          />

          <div className="control">
            <label className="control-label">Fecha de nacimiento</label>
            <input
              type="date"
              className="input validator"
              {...register("birthdate")}
            />
          </div>

          <div className="control">
            <label className="control-label">
              Clave Única de Registro de Población
            </label>
            <input
              {...register("curp_number")}
              type="text"
              required
              className="placeholder:capitalize uppercase input validator"
              placeholder="Ingresa tu CURP"
              aria-invalid={errors.curp_number ? "true" : "false"}
            />
            <p className="hidden validator-hint">
              {errors.curp_number?.message}
            </p>
          </div>
          <div className="control">
            <label className="control-label">
              Calle, número exterior / interior
            </label>
            <input
              {...register("address")}
              type="text"
              required
              className="input validator"
              placeholder="Ingresa tu dirección"
              aria-invalid={errors.address ? "true" : "false"}
            />
            <p className="hidden validator-hint">{errors.address?.message}</p>
          </div>
          <div className="control">
            <label className="control-label">Código postal</label>
            <input
              {...register("zip_code")}
              type="text"
              required
              placeholder="Ingresa tu código postal"
              pattern="[0-9]{4,5}"
              maxLength={5}
              className="input validator"
              aria-invalid={errors.zip_code ? "true" : "false"}
            />
            <p className="hidden validator-hint">{errors.zip_code?.message}</p>
          </div>
        </form>
      </IonContent>
      <IonFooter className="ion-padding">
        <div className="gap-2 grid">
          <button
            className="btn btn-primary"
            type="submit"
            form="form"
            disabled={isSubmitting}
          >
            Continuar
          </button>

          <Link className="btn-outline btn" to="/profile">
            Terminar después
          </Link>
        </div>
      </IonFooter>
    </IonPage>
  );
};
