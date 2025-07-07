import { useEffect, useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Icon from "../../components/Icon/Icon";
import * as api from "../../api";
import { formatCurrency } from "@adelantto/utils";
import InstallmentCard from "../../components/InstallmentCard";
import { InstallmentType, LoanType } from "../../types";
import * as Page from "../../components/page";

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
        <div className="bg-cover px-6 py-8 heading--blue">
          <h1 className="font-medium heading-4">
            AdelanttoCash® {loan.id.toString().padStart(5, "0")}
          </h1>

          <div className="block mb-4 border-full" />

          <div className="flex flex-col gap-4">
            <div>
              <h6 className="text-sm">CUOTA A PAGAR</h6>
              {detail && (
                <p className="font-semibold text-2xl">
                  {formatCurrency(detail.installment.total_amount)}
                </p>
              )}
            </div>
            <div>
              <h6 className="text-sm">SALDO</h6>
              {detail && (
                <p className="font-semibold text-2xl">
                  {formatCurrency(detail.residue)}
                </p>
              )}
            </div>
          </div>
        </div>

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
      </IonContent>
    </IonPage>
  );
};

export default Summary;
