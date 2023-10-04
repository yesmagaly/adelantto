import { useState, useEffect } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { RouteComponentProps } from "react-router";

import { useAuth } from "../auth/authContext";
import { API_SERVER_URL } from "../../config";

interface PreOfferProps
  extends RouteComponentProps<{
    id: string;
  }> {}

interface LoanContract {
  desired_loan: number;
}

const PreOffer: React.FC<PreOfferProps> = ({ match }) => {
  const router = useIonRouter();
  const [loanContract, setLoanContract] = useState(null);
  const [loanMonths, setLoanMonths] = useState(6);
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
      setLoanContract(data);
    };

    fetchLoanContract();
  }, []);

  const handleMothsChange = (event) => {
    setLoanMonths(event.target.value);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue heading--center heading--compact mb-7">
          <h2 className="text-3xl py-5">
            Pre<strong>-Oferta Adelantto</strong>
          </h2>
        </div>

        {!loanContract?.id && <div>Loading ...</div>}
        {loanContract?.id && (
          <div className="content mb-7">
            <form className="form">
              <div className="bg-white py-4 shadow-2xl w-96 border border-gray-200 mb-5">
                <div className="mb-7 leading-5">
                  <p>
                    <strong className="text-lg">
                      Seleccionaste {loanMonths} meses,
                    </strong>
                    <br />
                    a continuación te presentamos <br /> el resumen de nuestra
                    oferta.
                  </p>
                </div>

                <div className="px-5">
                  <div className="bg-gray-100 mb-4 py-3">
                    <div className="font-medium text-2xl">
                      $ {loanContract?.desired_loan} MXN
                    </div>
                    <span>El total de los meses de tu renta</span>
                  </div>

                  <div className="bg-gray-100 mb-4 py-3">
                    <div className="font-medium text-2xl">
                      $ {loanContract?.desired_loan * 0.9} MXN
                    </div>
                    <span>El monto que recibirás</span>
                  </div>

                  <div className="bg-gray-100 py-3">
                    <div className="font-medium text-2xl">
                      $ {loanContract?.desired_loan * 0.1} MXN
                    </div>
                    <span>Costo de nuestro servicio y seguro</span>
                  </div>
                </div>
              </div>

              <div className="bg-white py-6 shadow-2xl w-96 border border-gray-200 mb-7">
                <p className="text-center font-medium mb-4 leading-4">
                  ¿Te interesa ver el resumen <br /> para otros meses?
                </p>
                <div className="mb-5">
                  <input
                    type="number"
                    size="4"
                    defaultValue={loanMonths}
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
