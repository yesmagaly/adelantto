import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";

const Search: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard>
          <img
            alt="Silhouette of mountains"
            src="https://ionicframework.com/docs/img/demos/card-media.png"
          />
          <IonCardHeader>
            <IonCardTitle>Buscar</IonCardTitle>
          </IonCardHeader>
          <IonButton>Continuar</IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Search;
