import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const Welcome: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <h1 className="heading__title">¡Bienvenido!</h1>
          <p className="w-44 mb-14 leading-5">
            Ahora eres parte <br />
            <strong> de Adelantto </strong>
          </p>
        </div>
        <div className="content">
          <p>Actualiza tu contraseña</p>
          <form className="form mb-7">
            <input type="text" placeholder="Nueva contraseña" />
          </form>
          <form className="form mb-7">
            <input type="text" placeholder="Repite tu nueva contraseña" />
          </form>
          <div>
            <a className="underline"> Validación de password*</a>
          </div>

          <button
            className="button-primary mb-16"
            onClick={() => router.push("/verification-email")}
          >
            Cambiar contraseña
          </button>
          <div className="border-bottom" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
