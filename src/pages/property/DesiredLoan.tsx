import { useState, useEffect } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import { RouteComponentProps } from "react-router";

import { API_SERVER_URL } from "../../config";
import { useAuth } from "../auth/authContext";
import * as Page from "../../components/page"

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
}

interface DesiredLoanProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const DesiredLoan: React.FC<DesiredLoanProps> = ({ match }) => {
  const router = useIonRouter();
  const [loading, setLoading] = useState(true);
  const [loanContract, setLoanContract] = useState(null);
  const { authInfo } = useAuth()!;

  // GET with fetch API
  useEffect(() => {
    const fetchLoanContract = async () => {
      const response = await fetch(
        `${API_SERVER_URL}/api/leasing-contracts/${match.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${authInfo.user.token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();
      setLoading(false);
      setLoanContract(data);
    };

    fetchLoanContract();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await fetch(
      `${API_SERVER_URL}/api/leasing-contracts/${match.params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authInfo.user.token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const leaseContract = await response.json();

    if (response.status === 200) {
      router.push(`/lease-contract/${leaseContract.id}/pre-offer`);
    }
  };

  const months = [3, 4, 5, 6];

  return (
    <IonPage>
      <IonContent fullscreen>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Page.Root>
            <Page.Header>
              <div className="heading heading--blue">
                <h3 className="text-3xl">
                  Selecciona el monto <br />
                  <strong>
                    que te gustaría que <br /> adelantemos de rentas
                  </strong>
                </h3>
              </div>
            </Page.Header>
            <Page.Body>
              {loading && <div>Loading</div>}

              {!loading && months.map((option) => (
                <div
                  key={`dl-${option}`}
                  className="cursor-pointer px-5 py-4 bg-gradient-to-t bg-gray-100"
                >
                  <input
                    className="mr-4"
                    {...register("desired_loan")}
                    type="radio"
                    value={option * loanContract.monthly_lease_income}
                    id={`desired_loan-${option}`}
                  />
                  <label
                    className="w-full text-3xl font-semibold"
                    htmlFor={`desired_loan-${option}`}
                  >
                    {formatCurrency(option * loanContract.monthly_lease_income)}
                  </label>
                </div>
              ))}
            </Page.Body>
            <Page.Footer>
              <button className="button button-secondary">Siguiente</button>
            </Page.Footer>
          </Page.Root>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default DesiredLoan;
