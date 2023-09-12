import { IonContent, IonPage, IonButton, useIonRouter } from "@ionic/react";

const RentAdvance: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue flex flex-col justify-center">
          <h3 className="text-[30px]">
            Selecciona el monto <br />
            <strong>
              que te gustaría que <br /> adelantemos de rentas
            </strong>
          </h3>
        </div>
        <div className="px-16 py-8">
          <form className="form">
            <div className="mb-6">
              <button
                type="submit"
                className="font-[600] w-full text-3xl font-medium pattern-format"
              >
                $ 5,000.00
              </button>
              <button
                type="submit"
                className="font-[600] w-full text-3xl font-medium pattern-format"
              >
                $ 10,000.00
              </button>
              <button
                type="submit"
                className="font-[600] w-full text-3xl font-medium pattern-format"
              >
                $ 15,000.00
              </button>
              <button
                type="submit"
                className="font-[600] w-full text-3xl font-medium pattern-format"
              >
                $ 20,000.00
              </button>
              <button
                type="submit"
                className="font-[600] w-full text-3xl font-medium pattern-format"
              >
                $ 25,000.00
              </button>
              <button
                type="submit"
                className="font-[600] w-full text-3xl font-medium pattern-format"
              >
                $ 30,000.00
              </button>
            </div>

            <button
              className="button button-secondary mb-7"
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
