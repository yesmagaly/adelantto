import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import logo from "../assets/icons/logo.svg";

const Home: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex h-full flex-col items-center justify-center px-6 py-8">
          <div className="mb-14 text-center">
            <img className="mb-16 inline-block h-40" src={logo} />
            <h1 className="mb-4 text-5xl font-semibold leading-normal">¡Hola!</h1>
            <p className="max-w-xs text-xl leading-tight">
              ¿Estás listo para recibir el pago de tus rentas por anticipado?
            </p>
          </div>

          <button
            className="button is-primary mb-8"
            onClick={() => router.push("/register")}
          >
            Crear cuenta
          </button>

          <div className="text-center">
            <p>
              Si tienes una cuenta puedes <br />
              <a className="font-semibold" onClick={() => router.push("/login")}>
                Iniciar sesión
              </a>
            </p>

            <p className="mt-10 flex flex-col gap-2">
              <a
                href="https://adelantto.com/terminos-y-condiciones"
                target="_blank"
              >
                Términos y condiciones
              </a>
              <a
                href="https://adelantto.com/aviso-privacidad"
                target="_blank"
              >
                Aviso de privacidad
              </a>
              <a
                className="block text-balance leading-tight"
                href="/info"
              >
                Información sobre la documentación requerida
              </a>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
