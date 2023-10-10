import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";

import { API_SERVER_URL } from "../../config";
import FileInputItem from "../../components/FileInputItem";
import { useAuth } from "../auth/authContext";

interface File {
  id: number;
  name: string;
}

interface FormData {
  deed_of_ownership?: File;
}

const UploadDocuments: React.FC = () => {
  const router = useIonRouter();
  const { authInfo } = useAuth()!;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FormData) => {
    const response = await fetch(`${API_SERVER_URL}/api/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authInfo.user.token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const property = await response.json();

    if (response.status === 200) {
      router.push(`/property/upload-pictures`);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue flex flex-col justify-center">
          <div className="heading__pager text-right">Paso 3 de 3</div>
          <h4 className="text-2xl">
            A continuación <strong>sube los siguientes documentos</strong> para
            validar tu propiedad
          </h4>
        </div>

        <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <FileInputItem
              name="deed_of_ownership"
              control={control}
              rules={{ required: "Documento requerido" }}
            >
              <h5 className="font-bold text-sm leading-4">
                Carátula de tu escritura
              </h5>

              {errors?.deed_of_ownership && (
                <span className="message is-danger text-xs font-medium">
                  {errors.deed_of_ownership?.message}
                </span>
              )}

              <p className="text-xs">
                Con sello de inscripción del Registro Público de la Propiedad
              </p>
            </FileInputItem>

            <FileInputItem name="lease_agreement" control={control}>
              <h5 className="font-bold text-sm leading-4">
                Contrato de arrendamiento
              </h5>
              <p className="text-xs">Firmado por ambas partes</p>
            </FileInputItem>

            <FileInputItem name="latest_property_tax_receipt" control={control}>
              <h5 className="font-bold text-sm leading-4">
                Copia del último pago predial del inmueble
              </h5>
            </FileInputItem>

            <FileInputItem name="proof_of_income" control={control}>
              <h5 className="font-bold text-sm leading-4">
                Comprobante de ingresos
              </h5>
              <p className="text-xs">Útimos tres meses (Nómina o bancarios)</p>
            </FileInputItem>

            <FileInputItem name="rpp_certificate" control={control}>
              <h5 className="font-bold text-sm leading-4">
                Certificado de finalización en el RPP
              </h5>
              <p className="text-xs">Registro Público de la Propiedad</p>
            </FileInputItem>

            <FileInputItem name="rfc" control={control}>
              <h5 className="font-bold text-sm leading-4">RFC</h5>
              <p className="text-xs">
                Constancia de situación fiscal con antigüedad no mayor a 3 meses
              </p>
            </FileInputItem>

            <FileInputItem name="curp" control={control}>
              <h5 className="font-bold text-sm leading-4">CURP</h5>
              <p className="text-xs">Certificada y emitida por la RENAPO</p>
            </FileInputItem>
          </div>

          <div className="text-center mb-7">
            <p className="font-medium text-sm leading-4 mb-6">
              Los documentos deberán ser escaneados en alta resolución y en
              formato PDF, de lo contrario declinaremos el proceso.
            </p>

            <button className="button is-primary">Siguiente</button>
          </div>
        </form>
        <div className="border-bottom border-primary-blue" />
      </IonContent>
    </IonPage>
  );
};

export default UploadDocuments;
