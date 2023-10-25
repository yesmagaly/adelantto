import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";

import * as Page from "../../components/page";
import * as Modal from "../../components/modal";

import { UnauthorizedError, applications } from "../../api";
import { nextStepUrl } from "../../utils/steps";
import { formatCurrency } from "../../utils";
import { useAuth } from "../auth/authContext";

const Dashboard: React.FC = () => {
  const { logOut } = useAuth()!;
  const router = useIonRouter();
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await applications.list()) ?? [];

        if (data.length === 0) {
          router.push("/advance-immediately");
        }

        setItems(data);
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          setError(error.message);
        }
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

                  {item.status === "approved" && (
                    <button
                      className="button is-small !py-2"
                      onClick={() => router.push(`/applications/${item.id}/success`)}
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

        {error && (
          <Modal.Root isOpen={!!error}>
            <Modal.Body>
              <p>Error message</p>
            </Modal.Body>
            <Modal.Footer>
              <button onClick={logOut} className="button is-primary">
                Okay
              </button>
            </Modal.Footer>
          </Modal.Root>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
