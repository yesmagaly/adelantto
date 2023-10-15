import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";

import { applications } from "../../api";

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
        Dahsboard

        {items.map(item => (
          <div>
            {item.id}
            <pre>
              {JSON.stringify(item, null, 2)}
            </pre>
          </div>
        ))}

        <button>
          Recibe un adelantto de tus rentas en tan solo 72 horas.
        </button>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
