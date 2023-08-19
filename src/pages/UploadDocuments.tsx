import { IonContent, IonPage, IonButton, IonList } from "@ionic/react";
import "./Home.css";

import FileInputItem from "../components/FileInputItem";

const UploadDocuments: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading-blue">
          <div className="heading__pager text-right">Paso 3 de 3</div>
          <h4 className="text-xl">
            A continuación <br />
            <strong>
              sube los siguientes documentos <br />
            </strong>
            para tu propiedad
          </h4>
        </div>
        <div className="px-5 py-6">
          <FileInputItem>
            <h5 className="font-bold text-xs leading-3">
              Caratula de tu escritura
            </h5>
            <p className="text-[10px]">
              Con sello de inscripsión del Registro Público de la Propiedad
            </p>
          </FileInputItem>

          <FileInputItem>
            <h5 className="font-bold text-xs leading-3">
              Contrato de arrendamiento
            </h5>
            <p className="text-[10px]">Firmado por ambas partes</p>
          </FileInputItem>

          <FileInputItem>
            <h5 className="font-bold text-xs leading-3">
              Copia del último pago predial del inmueble
            </h5>
          </FileInputItem>

          <FileInputItem>
            <h5 className="font-bold text-xs leading-3">
              Comprobante de ingresos
            </h5>
            <p className="text-[10px]">
              útimos tres meses (Nóminas o Bancarios)
            </p>
          </FileInputItem>

          <FileInputItem>
            <h5 className="font-bold text-xs leading-3">
              Certificado de fiscalización en el RPP
            </h5>
            <p className="text-[10px]">Registro Público de la Propiedad</p>
          </FileInputItem>

          <FileInputItem>
            <h5 className="font-bold text-xs leading-3">RFC</h5>
            <p className="text-[10px]">
              Constancia de situación fiscal con antigüedad no mayor a 3 meses
            </p>
          </FileInputItem>

          <FileInputItem>
            <h5 className="font-bold text-xs leading-3">CURP</h5>
            <p className="text-[10px]">Certificada y emitida por la RENAPO</p>
          </FileInputItem>
        </div>

        <div className="text-center">
          <p className="text-xs mb-4">
            Los documentos deberán ser escaneados en alta resolución <br /> y en
            formato PDF, de lo contrario declinaremos el proceso.
          </p>
          <button className="bg-green-600 py-1 px-8 rounded">Siguiente</button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UploadDocuments;
