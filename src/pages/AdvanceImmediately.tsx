import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
} from "@ionic/react";
import "./Home.css";
import { logoIonic, ellipse } from "ionicons/icons";

const AdvanceImmediately: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar></IonToolbar>
        </IonHeader>
        <IonContent class="ion-padding">
          <span>Paso 1 de 3</span>
          <h1>
            <strong>Adelanto</strong> <br /> de inmediato
          </h1>
          <p>
            Recibe un adelanto de tus rentas <br />
            <strong>en tan solo 72 horas</strong>
          </p>
          <IonIcon icon={ellipse}></IonIcon>
          <IonIcon icon={ellipse}></IonIcon>
          <IonIcon icon={ellipse}></IonIcon>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default AdvanceImmediately;
