import { IonContent, IonPage, IonCheckbox, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import searchHomeAnimation from "../assets/animations/search-home.json";

const DataValidation: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="content">
          <Lottie
            animationData={searchHomeAnimation}
            style={{ width: 251, height: 251 }}
            loop
            play
          />
          <h3 className="font-bold text-2xl">¡Ya casi!</h3>
          <div className="border-full" />
          <p className="text-center text-sm leading-4">
            Por último validaremos los datos de tu propiedad. Te
            <br />
            enviaremos un correo electrónico en las próximas <br />
            <strong>72 horas con el resultado de la validación.</strong>
          </p>
          <div className="border-full" />
        </div>
        <div className="heading--center">
          <div className="mb-7">
            <IonCheckbox labelPlacement="end">
              Acepto que “S.A. de C.V.” <br /> consulte mi buró de crédito
            </IonCheckbox>{" "}
            <br />
            <IonCheckbox labelPlacement="end">SMS</IonCheckbox> <br />
            <IonCheckbox labelPlacement="end">Push</IonCheckbox>
          </div>
          <div className="border-full" />
          <div className="mb-7">
            <h4 className="font-bold text-[30px]">¡Hasta pronto!</h4>
          </div>
          <button
            className="button button-primary mb-16"
            onClick={() => router.push("")}
          >
            Finalizar
          </button>
          <div className="border-bottom border-primary-blue" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DataValidation;
