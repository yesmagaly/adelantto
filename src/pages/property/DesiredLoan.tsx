import { useState, useEffect } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import { applications } from "../../api";
import * as Page from "../../components/page";
import { atLeastThreeMonths } from "./LeaseContract";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(value);
}

export interface T_application {
  lease_monthly_income: number;
  lease_maintenance_fee: number;
  lease_end_date: string;
}

interface DesiredLoanProps
  extends RouteComponentProps<{
    id: string;
  }> {}

const DesiredLoan: React.FC<DesiredLoanProps> = ({ match }) => {
  const router = useIonRouter();
  const [error, setError] = useState<string>()!;
  const [loading, setLoading] = useState(true);
  const [months, setMonths] = useState<number>()!;
  const [application, setApplication] = useState<T_application>();

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

  const handleOptionClick = (value: number) => () => {
    setMonths(value);
  };

  const handleClick = async () => {
    if (months) {
      await applications.desiredLoan(match.params.id, {
        desired_loan_amount: application.lease_monthly_income * months,
        desired_loan_term_frame: months,

        step: "desired_loan",
      });

      router.push(`/applications/${match.params.id}/pre-offer`);
    } else {
      setError("Por favor, selecciona un monto para continuar");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root>
          <Page.Header>
            <div className="heading heading--blue">
              <div className="heading__pager text-right">Paso 2 de 7</div>
              <h1 className="heading-3">
                Selecciona el monto <br />
                <strong>que te gustaría recibir</strong>
              </h1>
            </div>
          </Page.Header>
          <Page.Body className="flex flex-col gap-2">
            {loading && <div>Loading</div>}

            {!loading &&
              application &&
              [6, 9, 12]
                .filter((value) =>
                  atLeastThreeMonths(application?.lease_end_date, value)
                )
                .map((value) => (
                  <button
                    key={`dl-${value}`}
                    id={`desired-loan-${value}`}
                    className={`button ${
                      value === months ? "is-secondary" : ""
                    }`}
                    onClick={handleOptionClick(value)}
                  >
                    <div className="w-full text-2xl">
                      {formatCurrency(
                        value *
                          (application.lease_monthly_income -
                            application.lease_maintenance_fee)
                      )}
                    </div>
                    <div className="font-normal">x {value} meses</div>
                  </button>
                ))}

            {error && !months && (
              <p className="mt-4 text-center font-medium text-orange-500">
                {error}
              </p>
            )}
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
