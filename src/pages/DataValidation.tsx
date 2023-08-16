import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonAvatar,
  IonCheckbox,
} from "@ionic/react";
import "./Home.css";

const DataValidation: React.FC = () => {
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
          <strong>
            Por último validaremos los datos de tu propiedad. Te
            <br />
            enviaremos un correo electrónico en las próximas <br />
            72 horas con el resultado de la validación.
          </strong>
        </div>
        <IonCheckbox labelPlacement="end">
          Acepto que “S.A. de C.V.” <br /> consulte mi buró de crédito
        </IonCheckbox>{" "}
        <br />
        <IonCheckbox labelPlacement="end">SMS</IonCheckbox> <br />
        <IonCheckbox labelPlacement="end">Push</IonCheckbox>
        <p>¡Hasta pronto!</p>
        <IonButton>Finalizar</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DataValidation;
