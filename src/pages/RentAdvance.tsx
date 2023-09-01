import { IonContent, IonPage, IonButton, useIonRouter } from "@ionic/react";

const RentAdvance: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue flex flex-col justify-center">
          <h3 className="text-[30px]">
            Selecciona el monto <br />{" "}
            <strong>
              que te gustaría que <br /> adelentemos de rentas
            </strong>
          </h3>
        </div>
        <div className="content">
          <form>
            <div className="mb-7">
              <button>$ 5,000.00</button>{" "}
            </div>
            <div className="mb-7">
              <button>$ 10,000.00</button>{" "}
            </div>
            <div className="mb-7">
              <button>$ 15,000.00</button>{" "}
            </div>
            <div className="mb-7">
              <button>$ 20,000.00</button>{" "}
            </div>
            <div className="mb-7">
              <button>$ 25,000.00</button>{" "}
            </div>
            <div className="mb-7">
              <button>$ 30,000.00</button>{" "}
            </div>

            <button
              className="button button-secondary mb-18 mb-7"
              onClick={() => router.push("/verification-code")}
            >
              Siguiente
            </button>

            <div className="border-primary-blue border-bottom" />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RentAdvance;
