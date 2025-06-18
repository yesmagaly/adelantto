import { IonContent, IonPage, useIonRouter } from "@ionic/react";

import fireworks from "../../v2/assets/svgs/fireworks.svg";
import adelanttoBgUrl from "../../v2/assets/images/adelantto-bg.png";
import adelanttoBg from "../../v2/assets/images/adelantto-gradient-bg.png";

export const CongratulationsPage: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <img src={adelanttoBgUrl} className="absolute inset-0 mx-auto" />
        <img src={adelanttoBg} className="absolute inset-0 mx-auto" />

        <div className="flex flex-col justify-center items-center h-full">
          <img src={fireworks} alt="fireworks" className="mb-18" />
          <div className="mb-6 text-center">
            <h1 className="mb-3 text-h2">¡Felicitaciones!</h1>
            <p className="text-sm">
              Tu adelantto ha sido aprobado.
              <br />
              Cuéntanos dónde quieres recibir tu dinero
            </p>
          </div>
          <a className="btn-block btn btn-primary" href="/home">
            Ingresar datos bancarios
          </a>
        </div>
      </IonContent>
    </IonPage>
  );
};
