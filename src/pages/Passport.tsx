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
        <div className="heading heading--green">
          <h1 className="heading__title">
            Captura tu
            <strong>
              <br /> INE o Pasaporte
            </strong>
          </h1>
          <h6>Captura una foto de tus identificaciones.</h6>
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
          <button
            className="button-primary mb-16"
            onClick={() => router.push("")}
          >
            Siguiente
          </button>
          <div className="border-bottom" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Passport;
