import { IonContent, useIonRouter, IonPage } from "@ionic/react";

const ValidationError: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <h3>
            <strong>¡Lo sentimos!</strong>
          </h3>
        </div>
        <p>
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
      </IonContent>
    </IonPage>
  );
};

export default ValidationError;
