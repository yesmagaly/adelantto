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
        <div className="content">
          <div>
            <h2 className="font-bold text-3xl mb-2">
              Validación
              <strong>
                <br />
                Biométrica
              </strong>
            </h2>
            <p className="text-sm leading-4">¡Sonrie! Queremos conocerte</p>
          </div>

          <div>
            <IonAvatar>
              <img
                alt="Silhouette of a person's head"
                src="https://ionicframework.com/docs/img/demos/avatar.svg"
              />
            </IonAvatar>

            <button
              className="button-primary mb-16"
              onClick={() => router.push("/verification-email")}
            >
              Capturar foto
            </button>

            <div className="border-bottom" />
          </div>
        </div>

        <div>
          <IonIcon icon={closeCircle}></IonIcon>
          <h5>
            Lo sentimos, tu validación <br />
            <strong>no ha sido exitosa.</strong>
          </h5>
          <button
            className="button-primary mb-16"
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
