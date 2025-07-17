import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { useForm } from "react-hook-form";

import FileInputItem from "../../components/FileInputItem";
import {
  T_file,
  useLazyGetApplicationQuery,
  useUpdateApplicationMutation,
} from "@adelantto/store";
import { MaterialIcon } from "@adelantto/core";
import { handleServerErrors } from "@adelantto/utils";
import { Link, RouteComponentProps } from "react-router-dom";



interface T_form {
  property_commercial_folio?: string;
  property_zip_code?: string;
  property_lease_agreement?: File | T_file;
  property_latest_tax_receipt?: File | T_file;
}

type T_props = RouteComponentProps<{
  id: string;
}>;

const UploadDocuments: React.FC<T_props> = ({ match }) => {
  const router = useIonRouter();
  const [trigger] = useLazyGetApplicationQuery();
  const [migration] = useUpdateApplicationMutation();

  const {
    control,
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<T_form>({
    defaultValues: async () => await trigger(match.params.id).unwrap(),
  });

  const onSubmit = async (data: T_form) => {
    try {
      await migration(data).unwrap();
      router.push(`/applications/${match.params.id}/final-announcement`);
    } catch (error: any) {
      handleServerErrors<T_form>(
        ["property_zip_code", "property_commercial_folio"],
        error.data.errors
      ).forEach(([field, errorOption]) => setError(field, errorOption));
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h5">
          <Link to="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </Link>
          Solicita tu AdelanttoCash®
        </h1>
        <p className="mt-1 text-dark-gray text-sm">
          Con tu información y documentos listos, indícanos el monto de adelanto
          que te interesa y comienza formalmente tu solicitud.
        </p>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="flex justify-between items-center">
          <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h6">
            <Link to="/" className="inline-flex items-center"></Link>
            Validación de propiedad
          </h1>
          <span className="badge badge-primary badge-sm">Paso 2/ 2</span>
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
          <div className="control">
            <label className="control-label">Folio Real</label>
            <input
              {...register("property_commercial_folio")}
              className="input validator"
              placeholder="123456"
              required
              type="text"
              aria-invalid={errors.property_commercial_folio ? "true" : "false"}
            />
            <p className="hidden validator-hint">
              {errors.property_commercial_folio?.message}
            </p>
          </div>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline stroke-current w-5 h-5 shrink-0"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p className="ml-1 control-label">
              El número de matrícula inmobiliaria aparece en el certificado de
              tradición y libertad del predio, así como en la escritura o
              documento de propiedad del mismo.
            </p>
          </div>

          <div className="control">
            <label className="control-label">Código postal del inmueble</label>
            <input
              {...register("property_zip_code")}
              className="input validator"
              placeholder="123456"
              required
              type="text"
              maxLength={5}
              aria-invalid={errors.property_zip_code ? "true" : "false"}
            />

            <p className="hidden validator-hint">
              {errors.property_zip_code?.message}
            </p>
          </div>

          <FileInputItem
            name="property_lease_agreement"
            control={control}
            rules={{ required: "Documento obligatorio" }}
            accept="application/pdf"
            label="Contrato de arrendamiento"
            description="Firmado por ambas partes"
            helpText="Tipo de archivo permitido PDF (500MB max)"
          />

          <FileInputItem
            name="property_latest_tax_receipt"
            control={control}
            rules={{ required: "Documento obligatorio" }}
            accept="application/pdf"
            label="Recibo del último predial"
          />
        </form>
      </IonContent>
      <IonFooter className="ion-padding">
        <button
          className="btn-block mb-2 btn-primary btn"
          type="submit"
          form="form"
          disabled={isSubmitting}
        >
          Continuar
        </button>

        <button
          className="btn-block btn-outline btn"
          type="submit"
          form="form"
          disabled={isSubmitting}
        >
          Guardar como borrador
        </button>
      </IonFooter>
    </IonPage>
  );
};

export default UploadDocuments;
