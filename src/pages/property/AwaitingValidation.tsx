import { IonContent, IonPage, useIonRouter } from "@ionic/react";

import exclamation from "../../v2/assets/svgs/exclamation.svg";
import adelanttoBgUrl from "../../v2/assets/images/adelantto-bg.png";
import adelanttoBg from "../../v2/assets/images/adelantto-gradient-bg.png";

export const AwaitingValidation: React.FC = () => {

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <img src={adelanttoBg} className="absolute inset-0 w-full" />
        <img src={adelanttoBgUrl} className="absolute inset-0 w-full" />
        <div className="flex flex-col justify-center items-center h-full">
          <img src={exclamation} alt="exclamation" className="mb-18" />
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <h1 className="mb-3 text-h2">¡Ya casi!</h1>
              <p className="mx-auto max-w-[90%] text-sm">
                Por último validaremos los datos de tu propiedad. Te enviaremos
                un correo electrónico en las próximas{" "}
                <strong>72 horas con el resultado de la validación.</strong>
              </p>
            </div>

            <a className="btn btn-primary btn-wide" href="/">
              Finalizar
            </a>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
