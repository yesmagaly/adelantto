import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  useIonRouter,
} from "@ionic/react";

const Passport: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--green flex flex-col justify-center">
          <h1 className="heading__title">
            Captura tu
            <strong>
              <br /> INE o Pasaporte
            </strong>
          </h1>
          <p className="text-[15px]">
            Captura una foto de tus identificaciones.
          </p>
        </div>
        <div className="content">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Frente</IonCardTitle>
            </IonCardHeader>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Vuelta</IonCardTitle>
            </IonCardHeader>
          </IonCard>
          <div className="content">
            <button
              className="button button-primary mb-16"
              onClick={() => router.push("")}
            >
              Siguiente
            </button>
            <div className="border-bottom border-primary-blue" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Passport;
