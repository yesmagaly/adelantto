import { IonContent, IonFooter, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import homeAnimation from "../assets/animations/home.json";

const Welcome: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="h-40 px-9 pt-6">
          <h1 className="text-3xl text-center pt-20">
            Recibe una <strong>pre-oferta</strong> en segundos
          </h1>
        </div>
        <div className="content">
          <Lottie
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
        </div>
      </IonContent>
      <IonFooter>
        <button
          className="button button is-primary"
          onClick={() => router.push("/lease-contract")}
        >
          Iniciar
        </button>
      </IonFooter>
    </IonPage>
  );
};

export default Welcome;
