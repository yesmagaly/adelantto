import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import logo from "../assets/icons/logo.svg";

const Home: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen class="ion-padding">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="mb-14 text-center">
            <img className="mb-16 inline-block h-40 w-[220px]" src={logo} />
            <h2 className="text-[28px] leading-tight mb-4 font-semibold">
              Convierte tus rentas{" "}
              <span className="text-aqua-green-700">en liquidez inmediata</span>
            </h2>
            <p className="text-balance leading-tight">
              Con AdelanttoCash®, anticipa hasta 12 meses de renta en menos de 3
              días. Solo para quienes ya tienen rentado un inmueble.
            </p>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <a className="btn btn-primary rounded-full" href="/login">
              Iniciar sesión
            </a>

            <a
              className="btn btn-ghost rounded-full shadow-none"
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
