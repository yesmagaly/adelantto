import {
  IonContent,
  IonPage,
  IonAvatar,
  useIonRouter,
  IonIcon,
} from "@ionic/react";
import Lottie from "react-lottie-player";
import { close, closeCircle, pin } from "ionicons/icons";

import photographyAnimation from "../assets/animations/photography.json";

const BiometricValidation: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <div className="content">
            <h2 className="heading__title pt-20">
              Validación
              <strong>
                <br />
                Biométrica
              </strong>
            </h2>
            <p className="text-sm leading-4 mb-16">
              ¡Sonrie! Queremos conocerte
            </p>

            <Lottie
              animationData={photographyAnimation}
              style={{ width: 320, height: 320 }}
              loop
              play
            />
          </div>

          <div className="text-center py-24">
            <button
              className="button button-primary mb-14"
              onClick={() => router.push("")}
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
