import { IonContent, IonPage, useIonRouter } from "@ionic/react";

import check from "../assets/icons/check.png";

const SuccesfulTransaction: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex flex-col justify-center items-center text-center blue-bg">
          <div className="pt-72">
            <img className="mb-10 h-14" src={check} />
          </div>

          <h3 className="h-60 text-primary-green text-center heading-3">
            Tu transacción <br />
            <span className="text-white">ha sido exitosa</span>
          </h3>

          <div className="py-10">
            <button
              className="mb-16 button is-primary"
              onClick={() => router.push("/home")}
            >
              Finalizar
            </button>
            <div className="border-bottom" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SuccesfulTransaction;
