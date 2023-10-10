import { useState, useEffect } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { calculator, loanContracts } from "../../api";

import * as Page from "../../components/page";
import { formatCurrency } from "../../utils";
import { loanAgreements } from "../../api";

interface PreOfferProps
  extends RouteComponentProps<{
    id: string;
  }> {}

interface LoanContract {
  desired_loan: number;
}

const PreOffer: React.FC<PreOfferProps> = ({ match }) => {
  const params = new URLSearchParams(window.location.search);
  const router = useIonRouter();
  const [loading, setLoading] = useState(true);
  const [months, setMonths] = useState(params.get("months"));
  const [offer, setOffer] = useState()!;
  const [income, setIncome] = useState()!;

  // GET with fetch API
  useEffect(() => {
    const fetchLoanContract = async () => {
      const response = await loanContracts.load({ id: match.params.id });
      const loan = await response.json();
      const calcResponse = await calculator.calc({
        principal: loan.monthly_lease_income * months,
        months: months,
      });
      const data = await calcResponse.json();
      setOffer(data);
      setLoading(false);
      setIncome(loan.monthly_lease_income);
    };

    fetchLoanContract();
  }, []);

  const handleMothsChange = async (event) => {
    const newMonths = parseInt(event.target.value);
    setMonths(newMonths);

    const calcResponse = await calculator.calc({
      principal: income * newMonths,
      months: newMonths,
    });
    const data = await calcResponse.json();
    setOffer(data);
  };

  const handleSubmit = async () => {
    const body = {
      principal: offer.principal,
      fees: offer.fees,
      opening_commission: offer.commission,
      months: months,
      leasing_contract_id: match.params.id,
    };
    const response = await loanAgreements.create({ body });
    const loan = await response.json();

    if (response.status === 200) {
      router.push(`/passport?lease_contract=${match.params.id}`);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
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
              <strong className="text-lg">Seleccionaste {months} meses,</strong>
              <br />a continuación te presentamos el resumen de nuestra oferta.
            </h3>

            {offer && (
              <div className="mx-5 flex flex-col gap-3">
                <div className="dislay-control">
                  <div className="number">
                    {formatCurrency(offer.principal)} MXN
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
                  <div className="number">{formatCurrency(offer.fees)} MXN</div>
                  <span>Costo de nuestro servicio y seguro</span>
                </div>

                <p className="text-center text-xs leading-tight">
                  {offer.note}
                </p>
              </div>
            )}
          </Page.Body>

          <Page.Footer className="has-divider">
            <div className="form-control is-center">
              <label>¿Te interesa ver el resumen para otros meses?</label>
              <select defaultValue={months} onChange={handleMothsChange}>
                <option value={3}>3 meses</option>
                <option value={4}>4 meses</option>
                <option value={5}>5 meses</option>
                <option value={6}>6 meses</option>
              </select>
            </div>

            <button onClick={handleSubmit} className="button is-secondary mb-7">
              Iniciar proceso de Validación de documentos
            </button>

            <p className="text-xs text-center leading-4">
              Al aceptar estas aprovando el uso de tus datos para validaciones
              de identificación.{" "}
              <a className="underline" href="">
                Ver detalle
              </a>
            </p>
          </Page.Footer>
        </Page.Root>
      </IonContent>
    </IonPage>
  );
};

export default PreOffer;
