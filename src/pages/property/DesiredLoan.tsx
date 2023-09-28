import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import { RouteComponentProps } from "react-router";

import { API_SERVER_URL } from "../../config";
import { useAuth } from "../auth/authContext";

interface DesiredLoanProps
  extends RouteComponentProps<{
    id: string;
  }> {}


const DesiredLoan: React.FC<DesiredLoanProps> = ({ match }) => {
  const router = useIonRouter();
  const { authInfo } = useAuth()!;

  const {
    handleSubmit,
    register,
    formState: { },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch(`${API_SERVER_URL}/api/leasing-contracts/${match.params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${authInfo.user.token}`,
      },
      body: JSON.stringify(data),
    });

    const leaseContract = await response.json();

    if (response.status === 200) {
      router.push(`/lease-contract/${leaseContract.id}/pre-offer`);
    }
  };

  const options = [
    5000,
    10000,
    15000,
    20000,
    25000,
    30000,
  ]

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
            {options.map(option => (
              <div key={`dl-${option}`}>
                <input {...register('desired_loan')} type="radio" value={option} id={`desired_loan-${option}`} />
                <label className="w-full text-3xl font-semibold" htmlFor={`desired_loan-${option}`}>
                  {option}
                </label>
              </div>
            ))}

            <button className="button button-secondary mb-7">Siguiente</button>
            <div className="border-primary-blue border-bottom" />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DesiredLoan;
