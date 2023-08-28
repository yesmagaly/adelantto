import { IonContent, IonPage, IonButton, useIonRouter } from "@ionic/react";

const CorrectData: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <h3 className="font-bold text-4xl text-center">¡Felicitaciones!</h3>
        </div>
        <div className="content">
          <p className="help-text border-y border-solid border-primary-blue py-6 mb-28">
            Cuéntanos dónde quieres tu dinero
          </p>
          <button
            className="button-primary mb-16"
            onClick={() => router.push("")}
          >
            Datos bancarios
          </button>
          <div className="border-bottom" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CorrectData;
