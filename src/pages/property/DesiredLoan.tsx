import { useState, useEffect } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import { applications } from "../../api";
import * as Page from "../../components/page";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(value);
}

interface Application {
  lease_monthly_income: number,
}

interface DesiredLoanProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const DesiredLoan: React.FC<DesiredLoanProps> = ({ match }) => {
  const router = useIonRouter();
  const [loading, setLoading] = useState(true);
  const [months, setMonths] = useState();
  const [application, setApplication] = useState(null);

  // GET with fetch API
  useEffect(() => {
    const fetchData = async () => {
      const response = await applications.get(match.params.id);
      const data = await response.json();

      setLoading(false);
      setApplication(data);
    };

    fetchData();
  }, []);

  const handleOptionClick = (option: number) => () => {
    setMonths(option);
  };

  const handleClick = async () => {
    await applications.desiredLoan(match.params.id, {
      desired_loan_amount: application.lease_monthly_income * months,
      desired_loan_term_frame: months,

      step: 'desired_loan'
    });

    router.push(
      `/applications/${match.params.id}/pre-offer?months=${months}`
    );
  };

  const allowedMonths = [3, 4, 5, 6];

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root>
          <Page.Header>
            <div className="heading heading--blue">
              <h1 className="heading-3">
                Selecciona el monto <br />
                <strong>que te gustaría recibir</strong>
              </h1>
            </div>
          </Page.Header>
          <Page.Body className="flex flex-col gap-2">
            {loading && <div>Loading</div>}

            {!loading &&
              allowedMonths.map((value) => (
                <button
                  key={`dl-${value}`}
                  id={`desired-loan-${value}`}
                  className={`button ${value === months ? "is-secondary" : ""}`}
                  onClick={handleOptionClick(value)}
                >
                  <div className="w-full text-2xl">
                    {formatCurrency(value * application.lease_monthly_income)}
                  </div>
                  <div className="font-normal">x {value} meses</div>
                </button>
              ))}
          </Page.Body>
          <Page.Footer>
            <button className="button is-primary" onClick={handleClick}>
              Siguiente
            </button>
          </Page.Footer>
        </Page.Root>
      </IonContent>
    </IonPage>
  );
};

export default DesiredLoan;
