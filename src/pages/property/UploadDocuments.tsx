import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";

import FileInputItem from "../../components/FileInputItem";
import { applications } from "../../api";
import ErrorMessage from "../../components/ErrorMessage";
import * as Tooltip from "../../components/Tooltip";

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
    register,
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

        <form className="form p-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <div className="form-control">
              <label>Escritura de la propiedad</label>
              <p className="form-help-text">
                Con sello de inscripción del Registro Público de la Propiedad.
                (Puedes incluir más de un archivo)
              </p>

              <FileInputItem
                name="property_deeds"
                control={control}
                rules={{ required: "Documento obligatorio" }}
                multiple
                accept="application/pdf"
              />
              {errors.property_deeds && (
                <ErrorMessage error={errors.property_deeds} />
              )}
            </div>

            <div className="form-control">
              <label>Contrato de arrendamiento vigente</label>
              <p className="form-help-text">Firmado por ambas partes</p>

              <FileInputItem
                name="property_lease_agreement"
                control={control}
                rules={{ required: "Documento obligatorio" }}
                accept="application/pdf"
              />
              {errors.property_lease_agreement && (
                <ErrorMessage error={errors.property_lease_agreement} />
              )}
            </div>

            <div className="form-control">
              <label>Boleta predial del último bimestre</label>
              <FileInputItem
                name="property_latest_tax_receipt"
                control={control}
                rules={{ required: "Documento obligatorio" }}
                accept="application/pdf"
              />
              {errors.property_latest_tax_receipt && (
                <ErrorMessage error={errors.property_latest_tax_receipt} />
              )}
            </div>

            <div className="form-control">
              <label>
                Recibo de nómina o estados de cuenta bancarios de los 3 últimos
                meses
              </label>
              <p className="form-help-text">(Incluir 3 archivos)</p>
              <FileInputItem
                name="bank_statements"
                control={control}
                rules={{
                  required: "Documento obligatorio",
                  validate: {
                    equalTo: (value = []) =>
                      value.length === 3 || "Debe inlcuir 3 documentos",
                  },
                }}
                multiple
                accept="application/pdf"
              />
              {errors.bank_statements && (
                <ErrorMessage error={errors.bank_statements} />
              )}
            </div>

            <div className="form-control relative">
              <label className="!inline-flex items-center">
                Folio real
                <Tooltip.Trigger
                  aria-label="Más información"
                  value="property-rpp-id-tooltip"
                />
              </label>
              <Tooltip.Content value="property-rpp-id-tooltip">
                <p className="mb-2">
                  El folio real es un número único que identifica tu propiedad
                  en el Registro Público de la Propiedad.
                </p>
                <p>
                  Generalmente, se encuentra en la primera página de la
                  escritura, cerca del título o encabezado, y está precedido por
                  las palabras.
                </p>
              </Tooltip.Content>

              <input
                {...register("property_rpp_id", {
                  required: "Campo obligatorio",
                })}
                type="text"
              />

              {errors.property_rpp_certificate && (
                <ErrorMessage error={errors.property_rpp_certificate} />
              )}
            </div>

            <div className="form-control">
              <label>RFC</label>
              <p className="form-help-text">
                Constancia de situación fiscal con antigüedad no mayor a 3 meses
              </p>
              <FileInputItem
                name="property_rfc"
                control={control}
                rules={{
                  required: "Documento obligatorio",
                }}
                accept="application/pdf"
              />
              {errors.property_rfc && (
                <ErrorMessage error={errors.property_rfc} />
              )}
            </div>

            <div className="form-control">
              <label>CURP</label>
              <p className="form-help-text">
                Certificada y emitida por la RENAPO
              </p>

              <FileInputItem
                name="property_curp"
                control={control}
                rules={{ required: "Documento obligatorio" }}
                accept="application/pdf"
              />
              {errors.property_curp && (
                <ErrorMessage error={errors.property_curp} />
              )}
            </div>
          </div>

          <div className="mb-7 text-center">
            <p className="mb-6 text-sm font-medium leading-tight">
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
