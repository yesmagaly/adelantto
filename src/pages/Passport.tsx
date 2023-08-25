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
        <div className="heading">
          <h1 className="heading__title">
            Captura tu
            <strong>
              <br /> INE o Pasaporte
            </strong>
          </h1>
          <h5>Captura una foto de tus identificaciones.</h5>
        </div>

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
        <button
          className="button-primary mb-16"
          onClick={() => router.push("")}
        >
          Siguiente
        </button>
        <div className="border-bottom" />
      </IonContent>
    </IonPage>
  );
};

export default Passport;
