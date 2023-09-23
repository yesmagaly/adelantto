import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const Welcome: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        Welcome!

        <div className="flex gap-2">
          <button className="button" onClick={() => router.push("/property/upload-documents")}>
            Iniciar
          </button>

          <button className="button button-secondary">
            Continuar
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
