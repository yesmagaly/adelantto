import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCheckbox,
} from "@ionic/react";
import "./Home.css";

const RentAdvance: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <strong>
            Selecciona el monto
            <br /> que te gustaría que <br /> adelentemos de rentas
          </strong>
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

        <IonButton>Siguiente</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RentAdvance;
