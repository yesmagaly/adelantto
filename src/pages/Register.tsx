import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";
import "./Home.css";

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading">
          <div className="text-xs text-right mb-2">Paso 1 de 4</div>
          <h1 className="text-4xl mb-2">
            Registra <br />
            <strong className="font-semibold">tu número</strong>
          </h1>
          <p>
            <strong className="font-semibold">
              Regálanos tu número para validar tu identidad
            </strong>
          </p>
        </div>

        <div className="p-4 text-center">
          <p className="help-text mb-4">
            Enviaremos un código de confirmación para iniciar el proceso de
            validación de tu identidad.
          </p>

          <button className="button-primary">Enviar código</button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
