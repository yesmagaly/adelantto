import { MaterialIcon } from "@adelantto/core";
import { IonContent, IonFooter, IonPage } from "@ionic/react";
import { AppNav } from "../../layout/AppNav";
import { logout, useGetUserQuery, userStepsUrls } from "@adelantto/store";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export function ProfilePage() {
  const { data: user } = useGetUserQuery();
  const dispatch = useDispatch();

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="gap-6 grid">
          {user && (
            <div className="">
              {user?.selfie && (
                <div className="relative mb-4 avatar">
                  <div className="rounded-full ring-1 ring-gray-500 ring-offset-7 ring-offset-base-100 w-24">
                    <img
                      className="size-24"
                      // src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                      src={user.selfie.url}
                    />
                  </div>

                  <div className="!hidden -right-1 -bottom-1 absolute">
                    <button className="inline-flex justify-center items-center bg-white border border-gray-600 rounded-full size-8">
                      <MaterialIcon
                        name="photo_camera"
                        size="18px"
                        className="text-gray-700"
                      />
                    </button>
                  </div>
                </div>
              )}

              <div>
                <div className="font-semibold text-lg">
                  {user.name} {user.last_name}
                </div>
                <div className="text-gray-600 text-xs">{user.email}</div>
              </div>
            </div>
          )}

          {/* Use a card */}

          {user && !user?.is_completed && (
            <div className="bg-amber-100 shadow-sm card card-sm">
              <div className="gap-3 card-body">
                <h2 className="text-h6 card-title">Completa tu perfil</h2>
                <p className="text-sm">
                  Ingresa tus datos básicos para identificarte correctamente.
                  Esta información es necesaria para poder solicitar tu primer
                  Adelantto.
                </p>
                <progress
                  className="mb-4 w-full text-amber-500 progress"
                  value={user.next_step === "income_and_taxes" ? 66 : 33}
                  max="100"
                ></progress>

                {/* <h2 className="text-h6 card-title">Siguiente paso</h2> */}

                <Link
                  to={userStepsUrls[user.next_step]}
                  className="btn btn-primary"
                >
                  Continuar
                </Link>
              </div>
            </div>
          )}

          <div>
            <h3 className="mb-4 font-semibold text-gray-600">
              Sobre Adelantto
            </h3>

            <ul className="gap-4 grid">
              {/* <li>
                <Link
                  to="#"
                  className="flex items-center bg-gray-200 p-4 rounded-lg font-semibold"
                >
                  <MaterialIcon
                    name="notifications"
                    className="inline-block mr-2"
                  />
                  Notificaciones
                </Link>
              </li> */}
              <li>
                <Link
                  to="/profile/my-data"
                  className="flex items-center bg-gray-200 p-4 rounded-lg font-semibold"
                >
                  <MaterialIcon
                    name="account_circle"
                    className="inline-block mr-2"
                  />
                  Mis datos
                </Link>
              </li>
              <li>
                <Link
                  to="/profile/update-password"
                  className="flex items-center bg-gray-200 p-4 rounded-lg font-semibold"
                >
                  <MaterialIcon name="password" className="inline-block mr-2" />
                  Cambiar contraseña
                </Link>
              </li>
              <li>
                <button
                  className="btn-block flex items-center bg-gray-200 p-4 rounded-lg font-semibold"
                  onClick={() => dispatch(logout())}
                >
                  <MaterialIcon name="logout" className="inline-block mr-2" />
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-gray-600">Ayuda</h3>

            <ul className="gap-4 grid">
              <li>
                <Link
                  to="#"
                  className="flex items-center bg-gray-200 p-4 rounded-lg font-semibold"
                >
                  <MaterialIcon
                    name="notifications"
                    className="inline-block mr-2"
                  />
                  Reportar un problema
                </Link>
              </li>
              <li>
                <a
                  href="https://dev-website.adelanttocash.com/como-funciona#faqs"
                  target="_blank"
                  className="flex items-center bg-gray-200 p-4 rounded-lg font-semibold"
                >
                  <MaterialIcon
                    name="account_circle"
                    className="inline-block mr-2"
                  />
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a
                  href="https://dev-website.adelanttocash.com/terminos-y-condiciones"
                  target="_blank"
                  className="flex items-center bg-gray-200 p-4 rounded-lg font-semibold"
                >
                  <MaterialIcon
                    name="account_circle"
                    className="inline-block mr-2"
                  />
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>
      </IonContent>

      <IonFooter>
        <AppNav />
      </IonFooter>
    </IonPage>
  );
}
