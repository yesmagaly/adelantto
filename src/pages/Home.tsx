import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import logo from "../assets/icons/logo.svg";

const Home: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex items-center flex-col justify-center text-center h-full">
          <img className="mb-24" src={logo} />
          <h1 className="font-semibold text-[40px]">¡Hola!</h1>
          <p className="w-44 mb-14 leading-5">
            ¿Estás listo para anticipar tus rentas?
          </p>

          <button
            className="button is-primary mb-4"
            onClick={() => router.push("/register")}
          >
            Crear cuenta
          </button>

          <p>
            <a href="/terms-and-conditions" className="text-sm">
              Términos y condiciones
            </a>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
