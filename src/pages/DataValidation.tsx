import {
  IonContent,
  IonPage,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  useIonRouter,
} from "@ionic/react";

const DataValidation: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard>
          <img
            alt="Silhouette of mountains"
            src="https://ionicframework.com/docs/img/demos/card-media.png"
          />
          <IonCardHeader>
            <IonCardTitle>¡Ya casi!</IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <div>
          <p className="text-sm leading-4">
            Por último validaremos los datos de tu propiedad. Te
            <br />
            enviaremos un correo electrónico en las próximas <br />
            <strong>72 horas con el resultado de la validación.</strong>
          </p>
        </div>
        <IonCheckbox labelPlacement="end">
          Acepto que “S.A. de C.V.” <br /> consulte mi buró de crédito
        </IonCheckbox>{" "}
        <br />
        <IonCheckbox labelPlacement="end">SMS</IonCheckbox> <br />
        <IonCheckbox labelPlacement="end">Push</IonCheckbox>
        <div>
          <strong>¡Hasta pronto!</strong>
        </div>
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

export default DataValidation;
