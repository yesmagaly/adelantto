import { useState, useEffect } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { calculator, loanContracts } from "../../api";

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
        <div className="heading heading--blue heading--center heading--compact mb-7">
          <h2 className="text-3xl py-5">
            Pre<strong>-Oferta Adelantto</strong>
          </h2>
        </div>

        {loading && <div>Loading ...</div>}
        {!loading && (
          <div className="content mb-7">
            <form className="form">
              <div className="bg-white py-4 shadow-2xl w-96 border border-gray-200 mb-5">
                <div className="mb-7 leading-5">
                  <p>
                    <strong className="text-lg">
                      Seleccionaste {months} meses,
                    </strong>
                    <br />
                    a continuación te presentamos el resumen de nuestra
                    oferta.
                  </p>
                </div>

                <div className="px-5">
                  <div className="bg-gray-100 mb-4 py-3">
                    <div className="font-medium text-2xl">
                      {formatCurrency(offer.primal)} MXN
                    </div>
                    <span>El total de los meses de tu renta</span>
                  </div>

                  <div className="bg-gray-100 mb-4 py-3">
                    <div className="font-medium text-2xl">
                      {formatCurrency(offer.advance)} MXN
                    </div>
                    <span>El monto que recibirás</span>
                  </div>

                  <div className="bg-gray-100 py-3">
                    <div className="font-medium text-2xl">
                      {formatCurrency(offer.revenue)} MXN
                    </div>
                    <span>Costo de nuestro servicio y seguro</span>
                  </div>

                  <div className="bg-gray-100 py-3">
                    <div className="font-medium text-2xl">
                      {formatCurrency(offer.opening_commission)} MXN
                    </div>
                    <span>Costo de apertura</span>
                  </div>
                </div>
              </div>

              <div className="bg-white py-6 shadow-2xl w-96 border border-gray-200 mb-7">
                <p className="text-center font-medium mb-4 leading-4">
                  ¿Te interesa ver el resumen <br /> para otros meses?
                </p>
                <div className="mb-5">
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
                  Iniciar proceso de Validación <br />
                  de documentos
                </button>

                <p className="text-xs leading-4">
                  Al aceptar estas aprovando el uso de tus datos <br />
                  para validaciones de identificación.{" "}
                  <a className="underline">Ver detalle</a>
                </p>
              </div>
            </form>
            <div className="border-bottom border-primary-blue" />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PreOffer;
