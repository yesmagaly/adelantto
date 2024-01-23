import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";

import * as api from "../../api";
import * as Page from "../../components/page";
import * as Modal from "../../components/modal";

import TotalCard from "../../components/TotalCard";
import LoanCard from "../../components/LoanCard"
import ApplicationCard from "../../components/ApplicationCard"

import { UnauthorizedError, applications } from "../../api";
import { useAuth } from "../auth/authContext";
import { ApplicationType, LoanType } from "../../types";

const Dashboard: React.FC = () => {
  const { logOut } = useAuth()!;
  const router = useIonRouter();
  const [items, setItems] = useState<Array<ApplicationType>>([]);
  const [loans, setLoans] = useState<Array<LoanType>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await applications.list()) ?? [];

        if (data.length === 0) {
          router.push("/advance-immediately");
        }

        setItems(data);
      } catch (error: any) {
        if (error instanceof UnauthorizedError) {
          setError(error.message);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.loans.list();
        const data = await response.json();

        setLoans(data);
      } catch (error: any) {
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
          <Page.Header className="px-6 pt-8">
            <h1 className="heading-3">
              ¡Hola, <br />
              <strong>Alexander Cruz!</strong>
            </h1>
          </Page.Header>
          <Page.Body>
            {loans.length === 0  && (
              <div className="flex gap-2 flex-col">
                {items.filter(item => item.status === 'awaiting_validation').map((item) => <ApplicationCard item={item} className="mb-4" />)}
              </div>
            )}

            {loans.length > 0 && (
              <>
                <TotalCard amount={loans.reduce((acc, loan) => acc + loan.amount, 0)} />
                {loans.map(loan => <LoanCard key={loan.id} url={`/loans/${loan.id}`} {...loan} />)}
              </>
            )}
          </Page.Body>
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
