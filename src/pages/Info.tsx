// import { IonContent, IonPage } from "@ionic/react";

// const Info: React.FC = () => {

//   return (
//     <IonPage>
//       <IonContent fullscreen>
//         <div className="heading heading--green">
//           <h1 className="heading__title">
//             Documentación <br />
//             <strong>requerida</strong>
//           </h1>
//         </div>

//         <div className="content">
//           <p className="text-left font-medium">
//             Los siguiente documentos son necesarios para continuar con el proceso:
//           </p>

//           <ul className="m-6 mb-12 list-disc text-left">
//             <li>Identificación oficial</li>
//             <li>Contrato de arrendamiento</li>
//             <li>Boleta predial</li>
//             <li>Comprobantes de ingresos (nómina o estados de cuenta)</li>
//             <li>Certificado de finalización en el registro público de la propiedad</li>
//             <li>RFC</li>
//             <li>CURP</li>
//             <li>Comprobante de domicilio</li>
//           </ul>

//           <a href="/start" className="button is-primary">Regresar a la página de inicio</a>
//         </div>

//       </IonContent>
//     </IonPage>
//   );
// };

// export default Info;


import { IonContent, IonPage, IonIcon, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import homeAnimation from "../assets/animations/home.json";
import * as Page from "../components/page";

const Info: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root variant="compact">
          <Page.Body>
            <div className="">
              <div>
                <h1 className="heading__title mt-20 text-center">
                  Documentación <br />
                  <strong>requerida</strong>
                </h1>
              </div>

              <div className="content">
                <div className="mb-14">
                  <p className="help-text mb-4">
                    Los siguiente documentos serán necesarios:
                  </p>

                  <ul className="mx-2 mb-12 list-disc text-left">
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

                <div>
                  <button
                    onClick={() => router.push("/create-profile")}
                    className="button is-primary"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </Page.Body>
        </Page.Root>
      </IonContent>
    </IonPage>
  );
};

export default Info;
