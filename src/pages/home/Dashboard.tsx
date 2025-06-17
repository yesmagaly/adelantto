import { useState, useEffect } from "react";
import { IonContent, IonFooter, IonPage, useIonRouter } from "@ionic/react";
import { MaterialIcon, Nav } from "@adelantto/core";

import TotalCard from "../../components/TotalCard";
import LoanCard from "../../components/LoanCard";
import ApplicationCard from "../../components/ApplicationCard";
import { ApplicationType, LoanType } from "../../types";
import { UnauthorizedError, applications } from "../../api";
import { useAuth } from "../auth/authContext";
import * as api from "../../api";
import { AppNav } from "../../layout/AppNav";

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
      <IonContent class="ion-padding">
        <div id="home-page">
          <div className="gap-6 grid">
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
                className="stroke-info w-6 h-6 shrink-0"
              />
              <div>
                <h3 className="font-bold">Completa tu perfil</h3>
                <div className="text-xs">
                  Ingresa tus datos básicos para identificarte correctamente.
                  Esta información es necesaria para poder solicitar tu primer
                  Adelantto.
                </div>
              </div>
              <button className="btn btn-sm">
                <MaterialIcon name="arrow_forward" />
              </button>
            </div>

            <div className="bg-linear-to-r from-indigo-600 to-indigo-300 text-white card">
              <div className="p-4 card-body">
                <h2 className="card-title">
                  Convierte tus rentas en liquidez inmediata
                </h2>
                <p>
                  Con AdelanttoCash®, anticipa hasta 12 meses de renta en menos
                  de 72 horas. Solo para quienes ya tienen rentado un inmueble.
                </p>
                <div className="card-actions">
                  <button className="btn-block btn btn-primary">
                    Solicita tu primer Adelantto
                  </button>
                </div>
              </div>
            </div>

            <h2 className="font-semibold text-dark-blue-700 text-lg">
              Temas de interés
            </h2>

            <div className="bg-base-100 shadow-sm card">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="p-4 card-body">
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
                    <ApplicationCard
                      key={item.id}
                      item={item}
                      className="mb-4"
                    />
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

          {/* {error && (
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
              )} */}
        </div>
      </IonContent>
      <IonFooter>
        <AppNav />
      </IonFooter>
    </IonPage>
  );
};

export default Dashboard;
