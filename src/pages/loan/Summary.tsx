import { useEffect, useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Icon from "../../components/Icon/Icon";
import * as api from "../../api";
import { formatCurrency } from "@adelantto/utils";
import InstallmentCard from "../../components/InstallmentCard";
import { InstallmentType, LoanType } from "../../types";

const Summary: React.FC = ({ match }) => {
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
            .filter((installment) => installment.status === "paid")
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
      } catch (error: any) {
        // if (error instanceof UnauthorizedError) {
        //   setError(error.message);
        // }
      }
    };

    fetchData();
  }, []);

  if (!loan) {
    return <div>Loading ...</div>;
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="h-90 bg-cover text-white px-9 py-10 heading--blue">
          <h1 className="heading-4">Adelantto 00001</h1>
          <p className="mb-6">Calle 17 Sur 13-22</p>

          <div className="border-full" />

          <div>
            <h6 className="mb-4 mt-5 text-primary-green">CUOTA A PAGAR</h6>
            {detail && (
              <p className="font-bold text-2xl mb-8">
                {formatCurrency(detail.installment.amount)}
              </p>
            )}
            <h6 className="text-primary-green mb-4">Saldo</h6>
            {detail && (
              <p className="font-bold text-2xl">
                {formatCurrency(detail.residue)}
              </p>
            )}
          </div>
        </div>

        <div className="px-7 py-8">
          <h4 className="font-bold text-xl mb-4">RESUMEN</h4>

          {detail && (
            <div className="flex gap-3 mb-8">
              {loan?.installments.map((installment, key) => (
                <div
                  className={`px-4 py-2 rounded-md ${
                    installment.id === detail.installment.id
                      ? "bg-primary-green"
                      : "bg-gray-200"
                  }`}
                >
                  MES {key + 1}
                </div>
              ))}
            </div>
          )}

          {loan?.installments.map((installment, key) => (
            <InstallmentCard
              key={installment.id}
              index={key}
              {...installment}
            />
          ))}
        </div>

        <div className="bg-gray-100 py-4">
          <div className="flex justify-between px-10 mb-5">
            <button onClick={() => router.push("/")}>
              <Icon name="home" className="text-6xl bg-black" />
            </button>
            <Icon name="world" className="text-6xl bg-black" />
            <Icon name="location" className="text-6xl bg-black" />
            <Icon name="search" className="text-6xl bg-black" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Summary;
