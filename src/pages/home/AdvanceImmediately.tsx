import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import adelanttoBgUrl from "../../v2/assets/images/adelantto-blue-bg.png";
import adelanttoWhiteLogoUrl from "../../v2/assets/svgs/logo-white.svg";

const AdvanceImmediately: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent
        fullscreen
        className="bg-cover ion-padding"
        style={{ "--background": "var(--blue-radial-gradient-bg)" }}
      >
        <img src={adelanttoBgUrl} className="absolute inset-0 mx-auto" />

        <div className="flex flex-col justify-center items-center h-full">
          <img
            src={adelanttoWhiteLogoUrl}
            alt="Adelantto Logo"
            className="mb-10"
          />
          <div className="mb-16 text-white text-center">
            <h1 className="mb-2 font-bold text-h4">¡Bienvenido!</h1>
            <p className="text-sm">Ahora eres parte de adelantto</p>
          </div>
          <a className="btn-block btn btn-primary" href="/dashboard">
            Continuar
          </a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdvanceImmediately;
