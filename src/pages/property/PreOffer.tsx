import { useState, useEffect } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { calculator, applications } from "../../api";

import * as Page from "../../components/page";
import { formatCurrency } from "@adelantto/utils";

interface PreOfferProps
  extends RouteComponentProps<{
    id: string;
  }> { }

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
      const response = await applications.get(match.params.id);
      const application = await response.json();
      const calcResponse = await calculator.calc({
        principal: application.lease_monthly_income * months,
        months: months,
      });
      const data = await calcResponse.json();
      setOffer(data);
      setLoading(false);
      setIncome(application.lease_monthly_income);
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
      pre_offer_amount: offer.principal,
      pre_offer_fees: offer.fees,
      pre_offer_commissions: offer.commission,
      pre_offer_term_frame: months,
      step: 'pre_offer'
    };

    const response = await applications.preOffer(match.params.id, body);
    await response.json();

    if (response.status === 200) {
      router.push(`/applications/${match.params.id}/identity-check`);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root>
          <Page.Header className="text-center">
            <div className="heading heading--blue heading--compact">
              <h1 className="heading-3">
                Pre<strong>-Oferta Adelantto</strong>
              </h1>
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
