import { useState, useEffect } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { calculator, loanContracts } from "../../api";

import * as Page from "../../components/page"
import { formatCurrency } from "../../utils";

interface PreOfferProps
  extends RouteComponentProps<{
    id: string;
  }> { }

interface LoanContract {
  desired_loan: number;
}

const PreOffer: React.FC<PreOfferProps> = ({ match }) => {
  const router = useIonRouter();
  const [loading, setLoading] = useState(true);
  const [months, setMonths] = useState(6);
  const [offer, setOffer] = useState()!;
  const [income, setIncome] = useState()!;

  // GET with fetch API
  useEffect(() => {
    const fetchLoanContract = async () => {
      const response = await loanContracts.load({ id: match.params.id });
      const loan = await response.json();
      const calcResponse = await calculator.calc({ clientRent: loan.monthly_lease_income, months: months })
      const data = await calcResponse.json();
      setOffer(data);
      setLoading(false);
      setIncome(loan.monthly_lease_income)
    };

    fetchLoanContract();
  }, []);

  const handleMothsChange = async (event) => {
    const newMonths = parseInt(event.target.value);
    setMonths(newMonths);

    const calcResponse = await calculator.calc({ clientRent: income, months: newMonths })
    const data = await calcResponse.json();
    setOffer(data);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <form className="form">
          <Page.Root>
            <Page.Header>
              <div className="heading heading--blue heading--center heading--compact">
                <h2 className="text-3xl">
                  Pre<strong>-Oferta Adelantto</strong>
                </h2>
              </div>

            </Page.Header>
            <Page.Body>
              <h3 className="mb-6 leading-5 text-center">
                <strong className="text-lg">
                  Seleccionaste {months} meses,
                </strong>
                <br />
                a continuación te presentamos el resumen de nuestra
                oferta.
              </h3>

              {offer && (
                <div className="mx-5 flex flex-col gap-1" >
                  <div className="dislay-control">
                    <div className="number">
                      {formatCurrency(offer.primal)} MXN
                    </div>
                    <span>El total de los meses de tu renta</span>
                  </div>

                  <div className="dislay-control">
                    <div className="number">
                      {formatCurrency(offer.advance)} MXN
                    </div>
                    <span>El monto que recibirás</span>
                  </div>

                  <div className="dislay-control">
                    <div className="number">
                      {formatCurrency(offer.revenue)} MXN
                    </div>
                    <span>Costo de nuestro servicio y seguro</span>
                  </div>

                  <div className="dislay-control">
                    <div className="number">
                      {formatCurrency(offer.opening_commission)} MXN
                    </div>
                    <span>Costo de apertura</span>
                  </div>
                </div>
              )}


            </Page.Body>
            <Page.Footer className="has-divider">
              <div className="form-control is-center">
                <label>¿Te interesa ver el resumen para otros meses?</label>
                  <input
                    min={3}
                    max={6}
                    type="number"
                    size="4"
                    defaultValue={months}
                    onChange={handleMothsChange}
                    className="font-semibold text-xl text-center bg-gray-100 w-12 py-3 shadow-md"
                  />
              </div>

              <button onClick={() => router.push("/passport")} className="button button-secondary mb-7">
                Iniciar proceso de Validación de documentos
              </button>

              <p className="text-xs text-center leading-4">
                Al aceptar estas aprovando el uso de tus datos para validaciones de identificación.{" "}
                <a className="underline" href="">Ver detalle</a>
              </p>
            </Page.Footer>
          </Page.Root>

        </form>
      </IonContent>
    </IonPage>
  );
};

export default PreOffer;
