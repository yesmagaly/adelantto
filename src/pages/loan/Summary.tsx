import { useEffect, useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import * as api from "../../api";
import InstallmentCard from "../../components/InstallmentCard";
import { InstallmentType, LoanType } from "../../types";
import LoanCard from "./components/LoanCard";

const Summary: React.FC<{ match: any }> = ({ match }) => {
  const router = useIonRouter();
  const [loan, setLoan] = useState<LoanType>();
  const [detail, setDetail] = useState<{
    installment: InstallmentType;
    residue: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.loans.get(match.params.id);
        const data = (await response.json()) as LoanType;
        const residue =
          data.amount +
          data.moratorium_amount -
          data.installments
            .filter((installment) => installment.status === "approved")
            .reduce((acc, installment) => acc + installment.amount, 0);

        const installment = data.installments.find(
          (installment) => installment.status !== "approved"
        );

        if (installment) {
          setDetail({
            residue,
            installment,
          });
        }

        setLoan(data);
      } catch (error: any) {}
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
