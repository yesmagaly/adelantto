import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";

import * as Page from "../../components/page";

import { applications } from "../../api";
import { nextStepUrl } from "../../utils/steps";

const Dashboard: React.FC = () => {
  const router = useIonRouter();
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await applications.list();
      const data = await response.json();

      setItems(data);
    };

    fetchData();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        {items.map((item) => (
          <div>
            {item.id}
            <pre>{JSON.stringify(item, null, 2)}</pre>

            <button onClick={() => router.push(nextStepUrl(item))}>
              Continuar {nextStepUrl(item)}
            </button>
          </div>
        ))}

        <button>Recibe un adelantto de tus rentas en tan solo 72 horas.</button>
        <Page.Root>
          <Page.Header>Dahsboard</Page.Header>
          <Page.Body></Page.Body>
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
