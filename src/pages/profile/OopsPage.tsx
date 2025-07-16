import { IonContent, IonPage, useIonRouter } from "@ionic/react";

import exclamation from "../../assets/svgs/exclamation.svg";
import adelanttoBgUrl from "../../assets/images/adelantto-bg.png";
import adelanttoBg from "../../assets/images/adelantto-gradient-bg.png";

export const OopsPage: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <img src={adelanttoBg} className="absolute inset-0 w-full" />
        <img src={adelanttoBgUrl} className="absolute inset-0 w-full" />

        <div className="flex flex-col justify-center items-center h-full">
          <img src={exclamation} alt="exclamation" className="mb-18" />
          <div className="mb-6 text-center">
            <h1 className="mb-3 text-h2">¡Ups!</h1>
            <p className="text-sm">
              El código que ingresaste es incorrecto.
              <br />
              Por favor vuelve a intentarlo
            </p>
          </div>
          <a className="btn-block btn btn-primary" href="/home">
            Reenviar el código
          </a>
        </div>
      </IonContent>
    </IonPage>
  );
};
