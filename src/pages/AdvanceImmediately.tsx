import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { logoIonic, ellipse } from "ionicons/icons";

const AdvanceImmediately: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="h-60 px-9 py-6">
          <div className="heading__pager text-right">Paso 1 de 3</div>
          <h1 className="heading__title text-center pt-20">
            <strong>Adelanto</strong> <br /> de inmediato
          </h1>
        </div>

        <div className="content">
          <div className="mb-14">
            <p className="help-text">
              Recibe un adelanto de tus rentas <br />
              <strong className="text-xl">en tan solo 72 horas.</strong>
            </p>
          </div>
          <div>
            <IonIcon icon={ellipse}></IonIcon>
            <IonIcon icon={ellipse}></IonIcon>
            <IonIcon icon={ellipse}></IonIcon>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdvanceImmediately;
