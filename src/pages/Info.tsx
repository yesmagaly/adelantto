import { IonContent, IonPage } from "@ionic/react";

const Info: React.FC = () => {

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--green">
          <h1 className="heading__title">
            Documentación <br />
            <strong>requerida</strong>
          </h1>
        </div>

        <div className="content">
          <p className="text-left font-medium">
            Los siguiente documentos son necesarios para continuar con el proceso:
          </p>

          <ul className="text-left list-disc m-6 mb-12">
            <li>Identificación oficial</li>
            <li>Contrato de arrendamiento</li>
            <li>Boleta predial</li>
            <li>Comprobantes de ingresos (nómina o estados de cuenta)</li>
            <li>Certificado de finalización en el registro público de la propiedad</li>
            <li>RFC</li>
            <li>CURP</li>
            <li>Comprobante de domicilio</li>
          </ul>

          <a href="/start" className="button is-primary">Regresar a la página de inicio</a>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Info;
