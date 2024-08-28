import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";

import FileInputItem from "../../components/FileInputItem";
import { useAuth } from "../auth/authContext";
import { applications } from "../../api";
import ErrorMessage from "../../components/ErrorMessage";

interface File {
  id: number;
  name: string;
}

interface FormData {
  deed_of_ownership?: File;
  leasing_contract_id: number;
}

const UploadDocuments: React.FC = ({ match }) => {
  const router = useIonRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FormData) => {
    const response = await applications.propertyDocuments(match.params.id, {
      ...data,
      step: "property_documents",
    });

    if (response.status === 200) {
      router.push(`/applications/${match.params.id}/property-pictures`);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue flex flex-col justify-center">
          <div className="heading__pager text-right">Paso 6 de 7</div>
          <h4 className="text-2xl">
            A continuación <strong>sube los siguientes documentos</strong> para
            validar tu propiedad
          </h4>
        </div>

        <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <FileInputItem
              name="property_deed_of_ownership"
              control={control}
              rules={{ required: "Documento obligatorio" }}
            >
              <h5 className="text-sm font-bold leading-4">
                Escritura de la propiedad
              </h5>
              <p className="text-sm">
                Con sello de inscripción del Registro Público de la Propiedad
              </p>
              {errors.property_deed_of_ownership && (
                <ErrorMessage error={errors.property_deed_of_ownership} />
              )}
            </FileInputItem>

            <FileInputItem name="property_lease_agreement" control={control} rules={{ required: "Documento obligatorio" }}>
              <h5 className="text-sm font-bold leading-4">
                Contrato de arrendamiento vigente
              </h5>
              <p className="text-sm">Firmado por ambas partes</p>
              {errors.property_lease_agreement && (
                <ErrorMessage error={errors.property_lease_agreement} />
              )}
            </FileInputItem>

            <FileInputItem name="property_latest_tax_receipt" control={control} rules={{ required: "Documento obligatorio" }}>
              <h5 className="text-sm font-bold leading-4">
                Boleta predial del último bimestre
              </h5>
              {errors.property_latest_tax_receipt && (
                <ErrorMessage error={errors.property_latest_tax_receipt} />
              )}
            </FileInputItem>

            <FileInputItem name="property_proof_of_income" control={control} rules={{ required: "Documento obligatorio" }}>
              <h5 className="text-sm font-bold leading-4">
                Recibo de nómina o estados de cuenta bancarios de los 3 últimos meses
              </h5>
              <p className="text-sm">Útimos tres meses (Nómina o bancarios)</p>
              {errors.property_proof_of_income && (
                <ErrorMessage error={errors.property_proof_of_income} />
              )}
            </FileInputItem>

            <FileInputItem name="property_rpp_certificate" control={control} rules={{ required: "Documento obligatorio" }}>
              <h5 className="text-sm font-bold leading-4">
                Certificado de finalización en el RPP
              </h5>
              <p className="text-sm">Registro Público de la Propiedad</p>
              {errors.property_rpp_certificate && (
                <ErrorMessage error={errors.property_rpp_certificate} />
              )}
            </FileInputItem>

            <FileInputItem name="property_rfc" control={control} rules={{ required: "Documento obligatorio" }}>
              <h5 className="text-sm font-bold leading-4">RFC</h5>
              <p className="text-sm">
                Constancia de situación fiscal con antigüedad no mayor a 3 meses
              </p>
              {errors.property_rfc && (
                <ErrorMessage error={errors.property_rfc} />
              )}
            </FileInputItem>

            <FileInputItem name="property_curp" control={control} rules={{ required: "Documento obligatorio" }}>
              <h5 className="text-sm font-bold leading-4">CURP</h5>
              <p className="text-sm">Certificada y emitida por la RENAPO</p>
              {errors.property_curp && (
                <ErrorMessage error={errors.property_curp} />
              )}
            </FileInputItem>
          </div>

          <div className="mb-7 text-center">
            <p className="mb-6 text-sm font-medium leading-4">
              Los documentos deberán ser escaneados en alta resolución y en
              formato PDF, de lo contrario declinaremos el proceso.
            </p>

            <button className="button is-primary">Siguiente</button>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default UploadDocuments;
