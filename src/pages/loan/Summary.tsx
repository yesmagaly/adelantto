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
          data.amount -
          data.installments
            .filter((installment) => installment.status === "approved")
            .reduce((acc, installment) => acc + installment.amount, 0);

        const installment = data.installments.find(
          (installment) => installment.status !== "paid"
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
      <div className="flex h-screen w-full items-center justify-center">
        <span className="text-sm font-medium">Cargando ...</span>
      </div>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root>
          <Page.Header>
            <div className="heading--blue bg-cover px-6 py-8 text-white">
              <h1 className="heading-4 font-medium">
                AdelanttoCash® {loan.id.toString().padStart(5, "0")}
              </h1>

              <div className="border-full mb-4 block" />

              <div className="flex flex-col gap-4">
                <div>
                  <h6 className="text-sm">CUOTA A PAGAR</h6>
                  {detail && (
                    <p className="text-2xl font-semibold">
                      {formatCurrency(detail.installment.amount)}
                    </p>
                  )}
                </div>
                <div>
                  <h6 className="text-sm">SALDO</h6>
                  {detail && (
                    <p className="text-2xl font-semibold">
                      {formatCurrency(detail.residue)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Page.Header>
          <Page.Body className="flex-1">
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
          </Page.Body>
          <Page.Footer className="bg-gray-100">
            <div className="flex justify-between">
              <button onClick={() => router.push("/")}>
                <Icon name="home" className="h-5 w-5 bg-black" />
              </button>
            </div>
          </Page.Footer>
        </Page.Root>
      </IonContent>
    </IonPage>
  );
};

export default Summary;
