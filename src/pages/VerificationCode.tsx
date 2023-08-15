import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const VerificationCode: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading">
          <h1 className="heading__title">
            Código
            <br />
            <strong>de verificación</strong>
          </h1>
          <div className="heading__pager">Paso 2 de 4</div>
        </div>

        <div className="content">
          <form className="form">
            <input type="text" placeholder="Código de verificación" />
          </form>

          <div className="mb-32">
            <p className="text-primary-green mb-4">03:00</p>
            <p className="help-text mb-4">
              Si no recibiste el código, envíalo nuevamente desde{" "}
              <a className="underline">aquí</a>
            </p>
          </div>

          <button
            className="button-primary"
            onClick={() => router.push("/verification-email")}
          >
            Enviar código
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VerificationCode;
