import { IonContent, IonPage, IonButton } from "@ionic/react";
import logo from "../assets/icons/alternative-logo.svg";

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="body__blue-bg text-white flex items-center flex-col justify-center text-center h-full">
          <img className="mb-5" src={logo} />
          <h1 className="font-semibold text-4xl mb-5">¡Bienvenido!</h1>
          <p className="text-xl leading-6 mb-12">
            Ahora eres parte <br />
            <strong>de Adelantto</strong>
          </p>

          <form className="form mb-4">
            <h5 className="mb-5">Actualiza tu contraseña</h5>
            <input type="text" placeholder="Nueva contraseña" />
            <input type="text" placeholder="Repite tu nueva contraseña" />
          </form>
          <a
            className="font-semibold text-primary-green text-sm underline mb-10"
            href=""
          >
            Validación de password*
          </a>
          <IonButton>Cambiar contraseña</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
