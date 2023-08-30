import { IonContent, useIonRouter, IonPage } from "@ionic/react";

const ValidationError: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="content">
          <h3 className=" font-bold text-4xl text-center">
            <strong>¡Lo sentimos!</strong>
          </h3>
        </div>
        <div className="content">
          <p className="text-sm leading-4 border-y border-solid border-primary-blue py-6 mb-28">
            Los datos de tu propiedad no han pasado <br /> nuestro proceso de
            validación
          </p>
          <button
            className="button-primary mb-16"
            onClick={() => router.push("")}
          >
            Finalizar
          </button>
          <div className="border-bottom" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ValidationError;
