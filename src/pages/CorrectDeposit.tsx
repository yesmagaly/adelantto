import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const CorrectDeposit: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <h3 className="font-bold text-4xl text-center py-10 mb-7">
            ¡Gracias!
          </h3>
        </div>
        <div className="text-center mb-10">
          <h3 className="mb-7">
            <strong>
              ¡Gracias por confiar <br /> en nosotros!
            </strong>
          </h3>
          <p className="text-sm mb-10">
            El dinero ya está en tu cuenta. Recuerda que al terminar de pagar el
            total de las rentas adelantadas podrás solicitar un nuevo Adelantto.
          </p>
          <button
            className=" button bg-primary-blue-light"
            onClick={() => router.push("")}
          >
            Menú
          </button>
        </div>
        <div className="border-bottom border-primary-blue" />
      </IonContent>
    </IonPage>
  );
};

export default CorrectDeposit;
