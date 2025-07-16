import { IonContent, IonPage, useIonRouter } from "@ionic/react";

import exclamation from "../../assets/svgs/exclamation.svg";
import adelanttoBgUrl from "../../assets/images/adelantto-bg.png";
import adelanttoBg from "../../assets/images/adelantto-gradient-bg.png";
import { Link } from "react-router-dom";

const FailBuroScore: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <img src={adelanttoBg} className="absolute inset-0 w-full" />
        <img src={adelanttoBgUrl} className="absolute inset-0 w-full" />
        <div className="flex flex-col justify-center items-center h-full">
          <img src={exclamation} alt="exclamation" className="mb-18" />
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h1 className="mb-3 text-h2">¡Lo sentimos!</h1>
              <p className="text-sm">
                La puntuación de Buró es baja.
                <br />
                Te recomendamos intentarlo nuevamente <br /> en{" "}
                <strong>3</strong> meses.
              </p>
            </div>

            <Link className="btn btn-primary btn-wide" to="/">
              Aceptar
            </Link>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FailBuroScore;
