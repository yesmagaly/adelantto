import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import logo from "../assets/icons/logo.svg";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <div className="flex h-full flex-col justify-center">
          <div className="mb-14 text-center">
            <img className="mb-16 inline-block h-40 w-[220px]" src={logo} />
            <h2 className="text-2xl mb-4 font-semibold">
              Convierte tus rentas{" "}
              <span className="text-emerald-700">en liquidez inmediata</span>
            </h2>

            <p className="text-balance leading-tight">
              Con AdelanttoCash®, anticipa hasta 12 meses de renta en menos de 3
              días. Solo para quienes ya tienen rentado un inmueble.
            </p>
          </div>

          <div className="grid gap-2">
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
