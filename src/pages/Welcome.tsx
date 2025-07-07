import { IonContent, IonFooter, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import * as Page from "../components/page";

import homeAnimation from "../assets/animations/home.json";

const Welcome: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root>
          <Page.Header className="pt-20 text-center">
            <h1 className="heading-3">
              Recibe una <strong>pre-oferta</strong> en segundos
            </h1>
          </Page.Header>
          <Page.Body className="text-center">
            <Lottie
              className="inline-block"
              animationData={homeAnimation}
              style={{ width: 280, height: 280 }}
              loop
              play
            />
            <p className="text-xl leading-tight">
              A continuación solicitaremos algunos datos de tu propiedad para
              poder generar una propuesta y en caso de que sea de tu interés,
              iniciaremos el proceso de validación de documentos.
            </p>
          </Page.Body>
          <Page.Footer>
            <button
              className="button is-primary"
              onClick={() => router.push("/lease-contract")}
            >
              Iniciar
            </button>
          </Page.Footer>
        </Page.Root>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
