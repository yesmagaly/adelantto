import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";

import * as Page from "../../components/page";

import { applications } from "../../api";
import { nextStepUrl } from "../../utils/steps";
import { formatCurrency } from "../../utils";

const Dashboard: React.FC = () => {
  const router = useIonRouter();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await applications.list();
      const data = await response.json();

      if (response.status === 200) {
        setItems(data);
      }
    };

    fetchData();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root>
          <Page.Header className="px-6 py-8">
            <h2 className="heading-3 !mb-0">Dahsboard</h2>
          </Page.Header>
          <Page.Body>
            <h3 className="heading-5 text-2xl mb-2">Solicitudes:</h3>
            <div className="flex gap-2 flex-col">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-md border-solid border-gray-300 p-4"
                >
                  {item.status === "uncompleted" && (
                    <>
                      <div className="text-sm">Renta mensual:</div>
                      <h3 className="text-xl heading-5 mb-2">
                        {formatCurrency(item.lease_monthly_income)}
                      </h3>
                    </>
                  )}

                  {item.status !== "uncompleted" && (
                    <>
                      <div className="text-sm">Adelanto:</div>
                      <h3 className="text-xl heading-5">
                        {formatCurrency(item.pre_offer_amount)}
                      </h3>
                      <div className="text-base mb-4">
                        x {item.pre_offer_term_frame} meses
                      </div>
                    </>
                  )}

                  {item.status === "uncompleted" && (
                    <button
                      className="button is-small !py-2"
                      onClick={() => router.push(nextStepUrl(item))}
                    >
                      Continuar
                    </button>
                  )}

                  {item.status !== "uncompleted" && (
                    <div className="">{item.status}</div>
                  )}
                </div>
              ))}
            </div>
          </Page.Body>
          <Page.Footer>
            <button
              className="button is-primary mb-6"
              onClick={() => router.push("/correct-data")}
            >
              Siguiente
            </button>
          </Page.Footer>
        </Page.Root>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
