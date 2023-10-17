import { IonContent, IonPage, useIonRouter } from "@ionic/react";

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

          <h3 className="heading-3 text-primary-green text-center h-60">
            Tu transacción <br />
            <span className="text-white">ha sido exitosa</span>
          </h3>

          <div className="py-10">
            <button
              className="button is-primary mb-16"
              onClick={() => router.push("/dashboard")}
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
