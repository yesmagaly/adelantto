import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import logo from "../assets/icons/logo.svg";

import adelanttoBgUrl from "../v2/assets/images/adelantto-bg.png"

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={`flex flex-col justify-center px-4 py-6 h-full`} >
          <img src={adelanttoBgUrl} className="absolute inset-0 mx-auto" />
          <div className="mb-14 text-center">
            <img className="inline-block mb-16 w-[220px] h-40" src={logo} />
            <h2 className="mb-4 font-semibold text-2xl">
              Convierte tus rentas{" "}
              <span className="text-emerald-700">en liquidez inmediata</span>
            </h2>

            <p className="text-balance leading-tight">
              Con AdelanttoCash®, anticipa hasta 12 meses de renta en menos de 3
              días. Solo para quienes ya tienen rentado un inmueble.
            </p>
          </div>

          <div className="gap-2 grid">
            <a className="btn btn-primary" href="/login">
              Iniciar sesión
            </a>
            <a
              className="btn btn-ghost"
              href="/register"
            >
              Regístrate
            </a>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
