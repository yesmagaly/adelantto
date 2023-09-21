import { IonContent, IonPage, IonButton, useIonRouter } from "@ionic/react";

import check from "../assets/icons/check.png";

const SuccesfulTransaction: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="blue-bg flex items-center flex-col justify-center text-center">
          <div className="pt-72">
            <img className="h-14 mb-10 " src={check} />
          </div>

          <h3 className="font-bold text-primary-green text-3xl text-center h-60">
            Tu transacción <br />
            <span className="text-white">ha sido exitosa</span>
          </h3>

          <div className="py-10">
            <button
              className=" button button-primary mb-16"
              onClick={() => router.push("")}
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
