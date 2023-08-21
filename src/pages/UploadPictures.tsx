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
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./Home.css";

const UploadPictures: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <strong>
            A continuación <br /> sube algunas fotografías <br /> para validar
            tu propiedad
          </strong>
        </div>
        <IonList>
          <IonItem>
            <IonLabel>
              <strong>Frente de la casa</strong>
              <p>Toma una foto del frente de tu casa</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Medidor de luz</strong>
              <p>Toma una foto del medidor de luz</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Toma de agua</strong>
              <p>Toma una foto de la toma de agua principal</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Calle</strong>
              <p>Toma una foto de la vista de la calle</p>
            </IonLabel>
          </IonItem>
        </IonList>
        <h5>
          Los documentos deberán ser escaneados en alta resolución <br /> y en
          formato PDF, de lo contrario declinaremos el proceso.
        </h5>
        <IonButton>Siguiente</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default UploadPictures;
