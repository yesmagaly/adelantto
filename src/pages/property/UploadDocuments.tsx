import { IonContent, IonFooter, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";

import FileInputItem from "../../components/FileInputItem";
import { applications } from "../../api";
import ErrorMessage from "../../components/ErrorMessage";
import * as Tooltip from "../../components/Tooltip";
import {
  useLazyGetApplicationQuery,
  useUpdateApplicationMutation,
} from "@adelantto/store";

interface File {
  id: number;
  name: string;
}

interface T_form {
  deed_of_ownership?: File;
  leasing_contract_id: number;
}

const UploadDocuments: React.FC = ({ match }) => {
  const router = useIonRouter();
  const [trigger, { data: application, isLoading }] =
    useLazyGetApplicationQuery();
  const [migration] = useUpdateApplicationMutation();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<T_form>({
    defaultValues: async () => await trigger(match.params.id).unwrap(),
  });

  const onSubmit = async (data: T_form) => {
    try {
      await migration(data).unwrap();
      router.push(`/applications/${match.params.id}/property-pictures`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="flex flex-col justify-center heading heading--blue">
          <div className="text-right heading__pager">Paso 6 de 7</div>
          <h4 className="text-2xl">
            A continuación <strong>sube los siguientes documentos</strong> para
            validar tu propiedad
          </h4>
        </div>

        <form
          id="form"
          className="gap-4 grid"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="control">
            <label className="control-label">Folio Real</label>
            <input
              {...register("commercial_folio")}
              className="input validator"
              placeholder="123456"
              required
              type="text"
            />
          </div>

          <div className="control">
            <label className="control-label">Código postal del inmueble</label>
            <input
              {...register("property_zip_code")}
              className="input validator"
              placeholder="123456"
              required
              type="text"
            />
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
        <button className="btn-block btn btn-primary" type="submit" form="form">
          Continuar
        </button>
      </IonFooter>
    </IonPage>
  );
};

export default UploadDocuments;
