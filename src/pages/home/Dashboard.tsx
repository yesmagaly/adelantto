import { useEffect, useRef } from "react";
import { IonContent, IonFooter, IonPage, useIonRouter } from "@ionic/react";

import { Carousel, CarouselItem, MaterialIcon } from "@adelantto/core";
import LoanCard from "../loan/components/LoanCard";
import ApplicationCard from "../applications/components/ApplicationCard";
import { AppNav } from "../../layout/AppNav";
import adelanttoBgTopRightUrl from "../../assets/images/adelantto-bg-top-right.png";
import exclamation from "../../assets/svgs/exclamation.svg";

import {
  authSlice,
  useGetApplicationsQuery,
  useGetArticlesQuery,
  useGetLoansQuery,
  useGetUserQuery,
  userStepsUrls,
} from "@adelantto/store";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard: React.FC = () => {
  const isAuthenticated = useSelector(
    authSlice.selectors.selectIsAuthenticated
  );
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useIonRouter();
  const { data: loans = [] } = useGetLoansQuery();
  const { data: applications = [] } = useGetApplicationsQuery();
  const { data: articles = [] } = useGetArticlesQuery();

  const { data: user } = useGetUserQuery();

  useEffect(() => {
    if (!isAuthenticated) {
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
          <div className="flex flex-col gap-6">
            {user && (
              <h1 className="text-h5">
                {user?.name ? (
                  <>
                    <span className="font-normal">¡Hola,</span>
                    <br />
                    {user.name}!
                  </>
                ) : (
                  <span>¡Hola!</span>
                )}
              </h1>
            )}

            {user && !user?.is_completed && (
              <div
                role="alert"
                className="alert alert-horizontal alert-warning"
              >
                <MaterialIcon
                  name="info"
                  className="stroke-info text-amber-400"
                />
                <div>
                  <h3 className="mb-1 text-h6">Completa tu perfil</h3>
                  <div className="text-gray-900 text-sm">
                    Ingresa tus datos básicos para identificarte correctamente.
                    Esta información es necesaria para poder solicitar tu primer
                    Adelantto.
                  </div>
                </div>
                <Link
                  className="btn btn-sm btn-ghost btn-warning"
                  to={userStepsUrls[user.next_step]}
                >
                  <MaterialIcon name="arrow_forward" />
                </Link>
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
                    <button
                      className="btn-block btn btn-primary"
                      onClick={() => {
                        if (user?.is_completed) {
                          router.push("/applications/lease-contract");
                        } else {
                          if (modalRef.current) {
                            modalRef.current.showModal();
                          }
                        }
                      }}
                    >
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
                    <LoanCard key={loan.id} loan={loan} displayActions />
                  ))}
                </div>

                <Link
                  className="btn-block mt-4 btn btn-primary"
                  to="/applications/lease-contract"
                >
                  Solicitar nuevo AdelanttoCash®
                </Link>
              </div>
            )}

            <h2 className="font-semibold text-dark-blue-700 text-lg">
              Temas de interés
            </h2>

            <Carousel displayDots>
              {articles.map((article) => (
                <CarouselItem key={article.id}>
                  <div className="bg-base-100 shadow-md mx-1 mb-2 card">
                    <figure>
                      <img
                        className="w-full h-48 object-cover"
                        src={`http://adelanttocash.com/${article.image}`}
                        alt={article.title}
                      />
                    </figure>
                    <div className="p-4 card-body">
                      <h2 className="text-base line-clamp-2 leading-tight card-title">{article.title}</h2>
                      <div
                        className="overflow-hidden text-gray-700 text-sm line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: article.summary }}
                      />
                      <a
                        target="_blank"
                        href={article.url}
                        className="after:absolute after:inset-0"
                      >
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </Carousel>
          </div>
        </div>

        <dialog ref={modalRef} id="my_modal_1" className="modal">
          <div className="modal-box">
            <button
              className="top-0.5 right-0.5 absolute btn btn-sm btn-circle btn-ghost"
              onClick={() => modalRef.current?.close()}
            >
              <MaterialIcon name="close" className="text-red-500" size="20px" />
            </button>

            <div className="flex flex-col items-center gap-6">
              <img src={exclamation} alt="exclamation" className="size-32" />

              <div className="flex flex-col items-center gap-2">
                <h1 className="text-h2">¡Ups!</h1>
                <p className="max-w-3/4 text-sm text-center">
                  Debes completar tu perfil para solicitar tu primer Adelantto
                </p>
              </div>
            </div>

            <div className="justify-center px-4 modal-action">
              <form method="dialog" className="w-full">
                <button
                  className="btn-block btn btn-primary"
                  onClick={() => router.push("/profile/identification")}
                >
                  Completa tu perfil
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </IonContent>
      <IonFooter>
        <AppNav />
      </IonFooter>
    </IonPage>
  );
};

export default Dashboard;
