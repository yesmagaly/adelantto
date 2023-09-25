import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import { API_SERVER_URL } from "../config";

const RentAdvance: React.FC = () => {
  const router = useIonRouter();

  const {
    handleSubmit,
    formState: {},
  } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch(`${API_SERVER_URL}/api/leasing-contracts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (json.status === "success") {
      router.push(`/pre-offer`);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue flex flex-col justify-center">
          <h3 className="text-3xl">
            Selecciona el monto <br />
            <strong>
              que te gustaría que <br /> adelantemos de rentas
            </strong>
          </h3>
        </div>
        <div className="px-16 py-8">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full text-3xl font-semibold pattern-format"
              >
                $ 5,000.00
              </button>
              <button
                type="submit"
                className="w-full text-3xl font-semibold pattern-format"
              >
                $ 10,000.00
              </button>
              <button
                type="submit"
                className="w-full text-3xl font-semibold pattern-format"
              >
                $ 15,000.00
              </button>
              <button
                type="submit"
                className="w-full text-3xl font-semibold pattern-format"
              >
                $ 20,000.00
              </button>
              <button
                type="submit"
                className="w-full text-3xl font-semibold pattern-format"
              >
                $ 25,000.00
              </button>
              <button
                type="submit"
                className="w-full text-3xl font-semibold pattern-format"
              >
                $ 30,000.00
              </button>
            </div>

            <button className="button button-secondary mb-7">Siguiente</button>
            <div className="border-primary-blue border-bottom" />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RentAdvance;
