import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import logo from "../assets/icons/logo.svg";

const Home: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex items-center justify-center flex-col h-full px-6 py-8">
          <div className="mb-14 text-center">
            <img className="mb-16 h-40 inline-block" src={logo} />
            <h1 className="font-semibold leading-normal text-5xl mb-4">¡Hola!</h1>
            <p className="text-xl leading-tight max-w-xs">
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
                className="block text-balance"
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
