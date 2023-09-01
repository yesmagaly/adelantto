import {
  IonContent,
  IonPage,
  IonAvatar,
  useIonRouter,
  IonIcon,
} from "@ionic/react";
import { close, closeCircle, pin } from "ionicons/icons";

const BiometricValidation: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <div>
            <h2 className="heading__title text-center pt-20">
              Validación
              <strong>
                <br />
                Biométrica
              </strong>
            </h2>
            <p className="text-sm leading-4 text-center">
              ¡Sonrie! Queremos conocerte
            </p>
          </div>

          <div className="content">
            <IonAvatar className="mb-16">
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </IonAvatar>

            <button
              className="button button-primary mb-16"
              onClick={() => router.push("/verification-email")}
            >
              Capturar foto
            </button>

            <div className="border-bottom border-primary-blue" />
          </div>
        </div>

        <div className="content">
          <IonIcon icon={closeCircle}></IonIcon>
          <h5 className="mb-7">
            Lo sentimos, tu validación <br />
            <strong>no ha sido exitosa.</strong>
          </h5>
          <button
            className="button button-primary mb-16"
            onClick={() => router.push("/verification-email")}
          >
            Tomar foto
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BiometricValidation;
