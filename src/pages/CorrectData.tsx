import { IonContent, IonPage, IonButton, useIonRouter } from "@ionic/react";

const CorrectData: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading-light-green flex p-4 flex-col items-center text-center mb-10 py-20">
          <h3 className="font-bold text-4xl text-center">¡Felicitaciones!</h3>
        </div>
        <div className="content">
          <p className="text-sm leading-4 border-y border-solid border-primary-blue py-6 mb-28">
            Cuéntanos dónde quieres tu dinero
          </p>
          <button
            className=" button button-secondary mb-10"
            onClick={() => router.push("")}
          >
            Datos bancarios
          </button>
          <div className="border-bottom border-primary-blue" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CorrectData;
