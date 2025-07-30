import { IonContent, IonPage } from "@ionic/react";
import InstallmentCard from "./components/InstallmentCard";
import LoanCard from "./components/LoanCard";
import { useGetLoanQuery } from "@adelantto/store";

const Summary: React.FC<{ match: any }> = ({ match }) => {
  const { data: loan } = useGetLoanQuery(match.params.id);

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
