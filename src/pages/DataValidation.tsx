import { IonContent, IonPage, useIonRouter } from "@ionic/react";
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
            style={{ width: 220, height: 220 }}
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
        <div className="heading--center px-10">
          <div className="mb-7">
            <div className="flex items-center mb-3">
              <input type="checkbox" className="w-6 h-6" />
              <label htmlFor="cv" className="ml-4">
                Acepto que “S.A. de C.V.” consulte mi buró de crédito
              </label>
            </div>
            <div className="flex items-center mb-5">
              <input type="checkbox" className="w-5 h-5" />
              <label htmlFor="cv" className="ml-4">
                SMS
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="w-5 h-5" />
              <label htmlFor="cv" className="ml-4">
                Push
              </label>
            </div>
          </div>
          <div className="border-full" />
          <div className="my-7">
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
