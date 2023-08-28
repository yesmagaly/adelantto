import { IonContent, IonPage, IonButton, useIonRouter } from "@ionic/react";

const RentAdvance: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <h3>
            Selecciona el monto <br />{" "}
            <strong>
              que te gustaría que <br /> adelentemos de rentas
            </strong>
          </h3>
        </div>
        <div>
          <button>$ 5,000.00</button>{" "}
        </div>
        <div>
          <button>$ 10,000.00</button>{" "}
        </div>
        <div>
          <button>$ 15,000.00</button>{" "}
        </div>
        <div>
          <button>$ 20,000.00</button>{" "}
        </div>
        <div>
          <button>$ 25,000.00</button>{" "}
        </div>
        <div>
          <button>$ 30,000.00</button>{" "}
        </div>

        <button
          className="button-primary mb-16"
          onClick={() => router.push("/verification-code")}
        >
          Siguiente
        </button>
        <div className="border-bottom" />
      </IonContent>
    </IonPage>
  );
};

export default RentAdvance;
