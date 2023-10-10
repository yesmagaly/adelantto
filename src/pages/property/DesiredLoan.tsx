import { useState, useEffect } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import { loanContracts } from "../../api";
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
  const [months, setMonths] = useState();
  const [loanContract, setLoanContract] = useState(null);

  // GET with fetch API
  useEffect(() => {
    const fetchLoanContract = async () => {
      const response = await loanContracts.load({ id: match.params.id });
      const data = await response.json();

      setLoading(false);
      setLoanContract(data);
    };

    fetchLoanContract();
  }, []);

  const handleOptionClick = (option: number) => () => {
    setMonths(option);
  };

  const handleClick = () => {
    router.push(`/lease-contract/${match.params.id}/pre-offer?months=${months}`);
  };

  const allowedMonths = [3, 4, 5, 6];

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root>
          <Page.Header>
            <div className="heading heading--blue">
              <h3 className="text-3xl">
                Selecciona el monto <br />
                <strong>
                  que te gustaría que adelantemos de rentas
                </strong>
              </h3>
            </div>
          </Page.Header>
          <Page.Body className="flex flex-col gap-2">
            {loading && <div>Loading</div>}

            {!loading && allowedMonths.map((value) => (
              <button key={`dl-${value}`}
                id={`desired-loan-${value}`}
                className={`button ${value === months ? 'is-secondary' : ''}`}
                onClick={handleOptionClick(value)}
              >
                <div className="w-full text-2xl">
                  {formatCurrency(value * loanContract.monthly_lease_income)}
                </div>
                <div className="font-normal">x {value} meses</div>
              </button>
            ))}
          </Page.Body>
          <Page.Footer>
            <button className="button is-primary" onClick={handleClick}>Siguiente</button>
          </Page.Footer>
        </Page.Root>
      </IonContent>
    </IonPage>
  );
};

export default DesiredLoan;
