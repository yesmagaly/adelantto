import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import exclamation from "../../v2/assets/svgs/exclamation.svg";
import adelanttoBgUrl from "../../v2/assets/images/adelantto-bg.png";
import adelanttoBg from "../../v2/assets/images/adelantto-gradient-bg.png";

const FailBuroScore: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <img src={adelanttoBg} className="absolute inset-0 mx-auto" />
        <img src={adelanttoBgUrl} className="absolute inset-0 mx-auto" />
        <div className="flex flex-col justify-center items-center h-full">
          <img src={exclamation} alt="exclamation" className="mb-18" />
          <div className="content heading-light-green">
            <div className="mb-6 text-center">
              <h1 className="mb-3 text-h2">¡Lo sentimos!</h1>
              <p className="text-sm">
                La puntuación de Buró es baja.
                <br />
                Te recomendamos intentarlo nuevamente en <strong>3</strong>{" "}
                meses.
              </p>
            </div>
            <a className="btn-block btn btn-primary" href="/">
              Aceptar
            </a>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FailBuroScore;
