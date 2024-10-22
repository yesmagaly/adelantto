import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import * as Page from "../components/page";

const Info: React.FC = ({ cta }: { cta?: { url: string, label: string } }) => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root variant="compact">
          <Page.Body>
            <div className="">
              <div>
                <h1 className="heading__title mt-20 text-center !text-3xl !leading-none">
                  Documentación <strong>requerida</strong>
                </h1>
              </div>

              <div className="content !px-0">
                <div className="mb-14">
                  <p className="help-text mb-4">
                    Los siguiente documentos serán necesarios:
                  </p>

                  <ul className="mx-2 mb-12 list-disc pl-4 text-left">
                    <li>Identificación oficial</li>
                    <li>Contrato de arrendamiento</li>
                    <li>Boleta predial</li>
                    <li>Comprobantes de ingresos (nómina o estados de cuenta)</li>
                    <li>Certificado de finalización en el registro público de la propiedad</li>
                    <li>RFC</li>
                    <li>CURP</li>
                    <li>Comprobante de domicilio</li>
                  </ul>
                </div>

                {cta && (
                  <div>
                    <button
                      onClick={() => router.push(cta.url)}
                      className="button is-primary"
                    >
                      {cta.label}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Page.Body>
        </Page.Root>
      </IonContent>
    </IonPage>
  );
};

export default Info;
