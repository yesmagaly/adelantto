import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const FullAdvance: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <h4>
            ¡Hola, <br />
            <strong>Alexander Cruz!</strong>{" "}
          </h4>
        </div>
        <div>
          <h5>Adelantto total</h5>
          <p>$150,000.00</p>
        </div>
        <h6>Pagos</h6>
        <div>
          <h4>Adelantto 00001</h4>
          <p>Calle 17 Sur 13-22</p>
          <h4>Adelantto 00002</h4>
          <p>Calle 17 Sur 13-22</p>
          <h4>Adelantto 00003</h4>
          <p>Calle 17 Sur 13-22</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FullAdvance;
