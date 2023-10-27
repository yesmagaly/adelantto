import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import logo from "../assets/icons/logo.svg";

const Home: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex items-center flex-col justify-center h-full">
          <div className="mb-14 text-center">
            <img className="mb-16 w-44 inline-block" src={logo} />
            <h1 className="font-semibold leading-normal text-5xl">¡Hola!</h1>
            <p className="text-xl leading-5 max-w-xs">
              ¿Estás listo para anticipar tus rentas?
            </p>
          </div>

          <button
            className="button is-primary mb-6"
            onClick={() => router.push("/register")}
          >
            Crear cuenta
          </button>

          <p className="text-base">
            <a onClick={() => router.push("/terms-and-conditions?redirect=/start")}>
              Términos y condiciones
            </a>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
