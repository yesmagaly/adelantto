import { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import * as api from "../../api";
import InstallmentCard from "../../components/InstallmentCard";
import LoanCard from "./components/LoanCard";
import { T_loan } from "@adelantto/store";

const Summary: React.FC<{ match: any }> = ({ match }) => {
  const [loan, setLoan] = useState<T_loan>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.loans.get(match.params.id);
        const data = (await response.json()) as T_loan;

        setLoan(data);
      } catch {}
    };

    fetchData();
  }, []);

  if (!loan) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <span className="font-medium text-sm">Cargando ...</span>
      </div>
    );
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="gap-6 grid">
          <LoanCard loan={loan} />

          <div>
            <h4 className="mb-4 text-h6">Historial de pagos</h4>

            <div className="flex flex-col gap-4">
              {loan?.installments.map((installment, key) => (
                <InstallmentCard
                  key={installment.id}
                  index={key}
                  loanId={match.params.id}
                  {...installment}
                />
              ))}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Summary;
