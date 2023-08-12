import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./Home.css";

const UploadDocuments: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <div>Paso 3 de 3</div>
          <strong>
            A continuación <br /> sube los siguientes documentos <br /> para tu
            propiedad
          </strong>
        </div>
        <IonList>
          <IonItem>
            <IonLabel>
              Caratula de tu escritura <br /> Con sello de inscripsión del
              Registro Público <br /> de la Propiedad{" "}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Contrato de arrendamiento <br /> Firmado por ambas partes{" "}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Copia del último pago predial del inmueble </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Comprobante de ingresos
              <br /> útimos tres meses (Nóminas o Bancarios){" "}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              Certificado de fiscalización en el RPP
              <br /> Registro Público de la Propiedad{" "}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              RFC <br /> Constancia de situación fiscal con antigüedad <br /> no
              mayor a 3 meses{" "}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              CURP <br /> Certificada y emitida por la RENAPO{" "}
            </IonLabel>
          </IonItem>
        </IonList>
        <p>
          Los documentos deberán ser escaneados en alta resolución <br /> y en
          formato PDF, de lo contrario declinaremos el proceso.
        </p>
        <IonButton>Siguiente</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default UploadDocuments;
