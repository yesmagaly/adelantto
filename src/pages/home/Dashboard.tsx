import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useState, useEffect } from "react";

import * as api from "../../api";
import * as Page from "../../components/page";
import * as Modal from "../../components/modal";

import TotalCard from "../../components/TotalCard";
import LoanCard from "../../components/LoanCard";
import ApplicationCard from "../../components/ApplicationCard";

import { UnauthorizedError, applications } from "../../api";
import { useAuth } from "../auth/authContext";
import { ApplicationType, LoanType } from "../../types";

import { MaterialIcon } from "@adelantto/core";

const Dashboard: React.FC = () => {
  const { authInfo, logOut } = useAuth()!;
  const router = useIonRouter();
  const [items, setItems] = useState<Array<ApplicationType>>([]);
  const [loans, setLoans] = useState<Array<LoanType>>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authInfo.user?.is_verified) {
      router.push("/update-temporary-password");
    } else {
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
    }
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
      <IonContent fullscreen className="ion-padding">
        <div className="grid gap-6">
          <h1 className="text-xl">
            {authInfo.user?.full_name && (
              <>
                ¡Hola, <br />
                <strong>{authInfo.user.full_name}!</strong>
              </>
            )}

            {!authInfo.user?.full_name && <strong>¡Hola!</strong>}
          </h1>

          <div role="alert" className="alert alert-horizontal">
            <MaterialIcon
              name="info"
              className="stroke-info h-6 w-6 shrink-0"
            />
            <div>
              <h3 className="font-bold">New message!</h3>
              <div className="text-xs">You have 1 unread message</div>
            </div>
            <button className="btn btn-sm">
              <MaterialIcon name="arrow_forward" />
            </button>
          </div>

          <div className="card bg-linear-to-r from-indigo-600 to-indigo-300 text-white">
            <div className="card-body p-4">
              <h2 className="card-title">Card Title</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
              <div className="card-actions">
                <button className="btn btn-block btn-primary">Buy Now</button>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-dark-blue-700">
            Temas de interés
          </h2>

          <div className="card bg-base-100 shadow-sm">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title">Card Title</h2>
              <p>
                A card component has a figure, a body part, and inside body
                there are title and actions parts
              </p>
            </div>
          </div>

          {loans.length === 0 && (
            <div className="flex flex-col gap-2">
              {items
                .filter((item) => item.status !== "approved")
                .map((item) => (
                  <ApplicationCard key={item.id} item={item} className="mb-4" />
                ))}
            </div>
          )}

          {loans.length > 0 && (
            <>
              <TotalCard
                amount={loans.reduce((acc, loan) => acc + loan.amount, 0)}
              />
              {loans.map((loan) => (
                <LoanCard key={loan.id} url={`/loans/${loan.id}`} {...loan} />
              ))}
            </>
          )}
        </div>

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
