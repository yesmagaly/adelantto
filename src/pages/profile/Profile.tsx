import { MaterialIcon } from "@adelantto/core";
import { IonContent, IonPage } from "@ionic/react";

export function Profile() {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="grid gap-6">
          <div className="grid gap-4">
            <div className="avatar">
              <div className="ring-gray-600 ring-offset-base-100 w-24 rounded-full ring-1 ring-offset-4">
                <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold">Alexander Cruz Páez</div>
              <div className="text-xs text-gray-600">email@gmail.com</div>
            </div>
          </div>
          {/* Use a card */}
          Completa tu perfil Ingresa tus datos básicos para identificarte
          correctamente. Esta información es necesaria para poder solicitar tu
          primer Adelantto. Siguiente paso Comprobante de ingresos Reset your
          password Últimos 3 meses (Nómina o bancarios)
          <div>
            <h3 className="font-semibold mb-4 text-gray-600">
              Sobre Adelantto
            </h3>

            <ul className="grid gap-4">
              <li>
                <a
                  href="#"
                  className="bg-gray-200 p-4 rounded-lg font-semibold flex items-center"
                >
                  <MaterialIcon
                    name="notifications"
                    className="inline-block mr-2"
                  />
                  Notificaciones
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-gray-200 p-4 rounded-lg font-semibold flex items-center"
                >
                  <MaterialIcon
                    name="account_circle"
                    className="inline-block mr-2"
                  />
                  Mis datos
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-gray-600">Ayuda</h3>

            <ul className="grid gap-4">
              <li>
                <a
                  href="#"
                  className="bg-gray-200 p-4 rounded-lg font-semibold flex items-center"
                >
                  <MaterialIcon
                    name="notifications"
                    className="inline-block mr-2"
                  />
                  Reportar un problema
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="bg-gray-200 p-4 rounded-lg font-semibold flex items-center"
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
                  href="#"
                  className="bg-gray-200 p-4 rounded-lg font-semibold flex items-center"
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
    </IonPage>
  );
}
