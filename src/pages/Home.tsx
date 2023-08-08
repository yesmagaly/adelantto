import { IonContent, IonPage } from "@ionic/react";
import "./Home.css";

import logo from "../assets/icons/logo.svg";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex items-center flex-col justify-center text-center h-full">
          <img className="mb-24" src={logo} />
          <h1 className="font-semibold text-[40px]">¡Hola!</h1>
          <p className="w-44 mb-14 leading-5">
            ¿Estás listo para anticipar tus rentas?
          </p>
          <button className="font-semibold mb-4 bg-primary-green px-7 py-3 rounded text-white">
            Crear cuenta
          </button>
          <p>
            <a href="#" className="text-sm">
              Términos y condiciones
            </a>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
