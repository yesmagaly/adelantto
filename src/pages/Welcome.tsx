import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const Welcome: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading--center">
          <h1 className="text-[35px]">¡Bienvenido!</h1>
          <p>
            Ahora eres parte <br />
            <strong> de Adelantto </strong>
          </p>
        </div>
        <div className="content">
          <form className="form">
            <p>Actualiza tu contraseña</p>
            <div className="mb-7">
              <input type="text" placeholder="Nueva contraseña" />
              <input type="text" placeholder="Repite tu nueva contraseña" />
            </div>

            <div>
              <a className="underline"> Validación de password*</a>
            </div>

            <button
              className="button-primary mb-16"
              onClick={() => router.push("")}
            >
              Cambiar contraseña
            </button>
            <div className="border-bottom" />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Welcome;
