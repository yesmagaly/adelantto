import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const CorrectDeposit: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <h1>¡Gracias!</h1>
        </div>
        <div>
          <h3>
            ¡Gracias por confiar <br /> en nosotros!
          </h3>
          <p>
            El dinero ya está en tu cuenta. Recuerda que al terminar de pagar el
            total de las rentas adelantadas podrás solicitar un nuevo Adelantto.
          </p>
        </div>
        <button className="button-primary mb-4" onClick={() => router.push("")}>
          Menú
        </button>
      </IonContent>
    </IonPage>
  );
};

export default CorrectDeposit;
