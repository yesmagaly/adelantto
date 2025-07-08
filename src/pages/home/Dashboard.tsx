import { useEffect } from "react";
import { IonContent, IonFooter, IonPage, useIonRouter } from "@ionic/react";
import { MaterialIcon } from "@adelantto/core";

import LoanCard from "../../components/LoanCard";
import ApplicationCard from "../../components/ApplicationCard";
import { useAuth } from "../auth/authContext";
import { AppNav } from "../../layout/AppNav";
import adelanttoBgTopRightUrl from "../../v2/assets/images/adelantto-bg-top-right.png";
import {
  useGetApplicationsQuery,
  useGetLoansQuery,
  useGetUserQuery,
} from "@adelantto/store";

const Dashboard: React.FC = () => {
  const { authInfo, logOut } = useAuth()!;
  const router = useIonRouter();

  const { data: user, isLoading: isUserLoading } = useGetUserQuery();
  const { data: loans = [], isLoading: isLoansLoading } = useGetLoansQuery();
  const { data: applications = [], isLoading: isApplicationLoading } =
    useGetApplicationsQuery();

  useEffect(() => {
    if (!authInfo.user?.is_verified) {
      // router.push("/update-temporary-password");
      router.push("/home");
    }
  }, []);

  return (
    <IonPage>
      <IonContent
        class="ion-padding"
        style={{
          "--background": `url(${adelanttoBgTopRightUrl}) no-repeat top right`,
        }}
      >
        <div id="home-page">
          <div className="gap-6 grid">
            {user && (
              <h1 className="text-h5">
                <span className="font-normal">¡Hola,</span>
                <br />
                {[user.name, user.last_name].join(" ")}!
              </h1>
            )}

            {Boolean(user?.is_completed) && (
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
            )}

            {loans.length === 0 && (
              <div className="bg-linear-to-r from-indigo-600 to-indigo-300 text-white card">
                <div className="p-4 card-body">
                  <h2 className="card-title">
                    Convierte tus rentas en liquidez inmediata
                  </h2>
                  <p>
                    Con AdelanttoCash®, anticipa hasta 12 meses de renta en
                    menos de 72 horas. Solo para quienes ya tienen rentado un
                    inmueble.
                  </p>
                  <div className="mt-4 card-actions">
                    <button className="btn-block btn btn-primary">
                      Solicita tu primer Adelantto
                    </button>
                  </div>
                </div>
              </div>
            )}

            {applications.length > 0 && (
              <div>
                <h4 className="mb-4 text-h6">
                  Tus solicitudes de AdelanttoCash®
                </h4>

                <div className="flex flex-col gap-2">
                  {applications.map((item) => (
                    <ApplicationCard
                      key={item.id}
                      item={item}
                      className="mb-4"
                    />
                  ))}
                </div>
              </div>
            )}

            {loans.length > 0 && (
              <div>
                <h4 className="mb-4 text-h6">Tus AdelanttoCash®</h4>
                <div className="flex flex-col gap-2">
                  {loans.map((loan) => (
                    <LoanCard key={loan.id} {...loan} />
                  ))}
                </div>

                <a
                  className="btn-block mt-4 btn btn-primary"
                  href="/applications/lease-contract"
                >
                  Solicitar nuevo AdelanttoCash®
                </a>
              </div>
            )}

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
          </div>
        </div>
      </IonContent>
      <IonFooter>
        <AppNav />
      </IonFooter>
    </IonPage>
  );
};

export default Dashboard;
