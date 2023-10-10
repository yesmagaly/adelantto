import { IonContent, IonPage, useIonRouter, IonIcon } from "@ionic/react";

import Lottie from "react-lottie-player";
import avatar from "../../assets/icons/avatar.png";
import check from "../../assets/icons/check.png";
import { close, closeCircle, pin } from "ionicons/icons";

import photographyAnimation from "../../assets/animations/photography.json";

const BiometricValidation: React.FC = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="content">
          <div className="bg-white py-5 shadow-2xl w-96 border border-gray-200 mb-10">
            <h2 className="heading__title pt-8">
              Validación
              <strong>
                <br />
                Biométrica
              </strong>
            </h2>
            <p className="text-sm leading-4 mb-16">
              ¡Sonrie! Queremos conocerte
            </p>
            <div className="heading--center mb-36">
              <Lottie
                animationData={photographyAnimation}
                style={{ width: 320, height: 320 }}
                loop
                play
              />
            </div>

            <div className="text-center">
              <button
                className="button button is-primary mb-10"
                onClick={() => router.push("")}
              >
                Capturar foto
              </button>
            </div>
          </div>
          <div className="border-bottom border-primary-blue" />
        </div>

        <div className="content">
          <IonIcon icon={closeCircle}></IonIcon>
          <h5 className="mb-7 text-[20px] mb-4">
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

        <div className="content">
          <div className="heading--center ">
            <img className="h-40 mb-8" src={avatar} />
          </div>
          <button
            className="button button-primary mb-10"
            onClick={() => router.push("")}
          >
            Tomar foto
          </button>
          <button
            className="button button-secondary mb-16"
            onClick={() => router.push("")}
          >
            Cancelar
          </button>
        </div>

        <div>
          <div className="heading--center ">
            <img className="h-10 mb-4" src={check} />
            <p className="text-[20px] mb-4">Datos correctos</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default BiometricValidation;
