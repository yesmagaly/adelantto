import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const VerificationEmail: React.FC = () => {
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
          <div className="heading__pager">Paso 3 de 4</div>
        </div>

        <div className="content">
          <form className="form">
            <input type="email" placeholder="Email" />
          </form>
          <div className="mb-32">
            <p className="help-text mb-4">
              Enviaremos una contraseña tu cuenta de correo para que puedas{" "}
              <a className="underline">iniciar sesión.</a>
            </p>
          </div>

          <button
            className="button-primary"
            onClick={() => router.push("/advance-immediately")}
          >
            Enviar código
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VerificationEmail;
