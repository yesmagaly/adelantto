import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import FileInputItem from "../components/FileInputItem";
import Lottie from "react-lottie-player";

import documentsAnimation from "../assets/animations/documents.json";

const UploadDocuments: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue flex flex-col justify-center">
          <div className="heading__pager text-right">Paso 3 de 3</div>
          <h4 className="text-xl">
            A continuación <br />
            <strong>
              sube los siguientes documentos <br />
            </strong>
            para validar tu propiedad
          </h4>
        </div>
        <div className="py-6 mb-4">
          <FileInputItem icon="upload">
            <h5 className="font-bold text-xs leading-3">
              Carátula de tu escritura
            </h5>
            <p className="text-[10px]">
              Con sello de inscripción del Registro Público <br />
              de la Propiedad
            </p>
          </FileInputItem>

          <FileInputItem icon="upload">
            <h5 className="font-bold text-xs leading-3">
              Contrato de arrendamiento
            </h5>
            <p className="text-[10px]">Firmado por ambas partes</p>
          </FileInputItem>

          <FileInputItem icon="upload">
            <h5 className="font-bold text-xs leading-3">
              Copia del último pago predial del inmueble
            </h5>
          </FileInputItem>

          <FileInputItem icon="upload">
            <h5 className="font-bold text-xs leading-3">
              Comprobante de ingresos
            </h5>
            <p className="text-[10px]">
              Útimos tres meses (Nómina o bancarios)
            </p>
          </FileInputItem>

          <FileInputItem icon="upload">
            <h5 className="font-bold text-xs leading-3">
              Certificado de finalización en el RPP
            </h5>
            <p className="text-[10px]">Registro Público de la Propiedad</p>
          </FileInputItem>

          <FileInputItem icon="upload">
            <h5 className="font-bold text-xs leading-3">RFC</h5>
            <p className="text-[10px]">
              Constancia de situación fiscal con antigüedad <br /> no mayor a 3
              meses
            </p>
          </FileInputItem>

          <FileInputItem icon="upload">
            <h5 className="font-bold text-xs leading-3">CURP</h5>
            <p className="text-[10px]">Certificada y emitida por la RENAPO</p>
          </FileInputItem>
        </div>

        <div className="text-center mb-7">
          <p className="font-semibold text-[10px] leading-3 mb-4">
            Los documentos deberán ser escaneados en alta resolución <br /> y en
            formato PDF, de lo contrario declinaremos el proceso.
          </p>
          <button className="bg-primary-green font-semibold py-2 px-11 rounded text-white">
            Siguiente
          </button>
        </div>
        <div className="border-bottom border-primary-blue" />

        <div className="content">
          <Lottie
            animationData={documentsAnimation}
            style={{ width: 274, height: 274 }}
            loop
            play
          />
          <form className="form py-2">
            <input type="text" placeholder="Buscar" />
          </form>
          <button
            className="button button-secondary mb-8"
            onClick={() => router.push("")}
          >
            Continuar
          </button>
        </div>

        <div className="content">
          <Lottie
            animationData={documentsAnimation}
            style={{ width: 225, height: 225 }}
            loop
            play
          />
          <h6 className="text-[20px] mb-6">
            Sube <strong>tus documentos</strong>
          </h6>
          <form className="form py-2">
            <input type="text" placeholder="Contrato Depto 204" />
          </form>
          <button
            className="button button-secondary mb-8"
            onClick={() => router.push("")}
          >
            Continuar
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UploadDocuments;
