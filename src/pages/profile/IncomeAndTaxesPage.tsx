import {
  IonContent,
  IonPage,
  useIonRouter,
  IonHeader,
  IonFooter,
} from "@ionic/react";

import { useForm } from "react-hook-form";
import { MaterialIcon } from "@adelantto/core";
import FileInputItem from "../../components/FileInputItem";
import { useLazyGetUserQuery, useUpdateUserMutation } from "@adelantto/store";
import { Link } from "react-router-dom";

type T_form = {
  income_proof?: File;
  rfc?: File;
  rfc_number?: string;
};

export const IncomeAndTaxesPage: React.FC = () => {
  const router = useIonRouter();
  const [mutation] = useUpdateUserMutation();
  const [trigger] = useLazyGetUserQuery();
  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting },
  } = useForm<T_form>({
    defaultValues: async () => {
      try {
        return await trigger().unwrap();
      } catch (error) {
        return {};
      }
    },
  });

  const onSubmit = async (form: T_form) => {
    try {
      await mutation(form).unwrap();
      router.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h5">
          <a href="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </a>
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
            Ingresos e impuestos
          </h1>
          <span className="badge badge-primary badge-sm">Paso 3/ 3</span>
        </div>
        <progress
          className="mt-2 mb-4 w-full h-[5px] text-indigo-300 progress"
          value="100"
          max="100"
        ></progress>

        <form
          id="form"
          className="gap-4 grid"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FileInputItem
            name="income_proof"
            control={control}
            rules={{ required: "Documento obligatorio" }}
            accept="application/pdf"
            label="Comprobante de ingresos"
            description="Últimos 3 meses (Nómina o bancarios)"
            helpText="Tipo de archivo permitido PDF (500MB max)"
          />

          <div className="control">
            <label className="control-label">
              Registro Federal de Contribuyentes (con homoclave)
            </label>
            <input
              type="text"
              placeholder="RFC"
              className="input validator"
              minLength={13}
              maxLength={13}
              {...register("rfc_number")}
            />
          </div>

          <FileInputItem
            name="rfc"
            control={control}
            rules={{ required: "Documento obligatorio" }}
            accept="application/pdf"
            label="RFC"
            description="Constancia de situación fiscal con antigüedad no mayor a 3 meses"
            helpText="Tipo de archivo permitido PDF (500MB max)"
          />
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
