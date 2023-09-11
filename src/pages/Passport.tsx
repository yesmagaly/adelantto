import { IonContent, IonPage, useIonRouter } from "@ionic/react";

import check from "../assets/icons/check.png";

import close from "../assets/icons/close.png";

const Passport: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--green flex flex-col justify-center">
          <h1 className="heading__title">
            Captura tu
            <strong>
              <br /> INE o Pasaporte
            </strong>
          </h1>
          <p className="text-[15px]">
            Captura una foto de tus identificaciones.
          </p>
        </div>
        <div className="content ">
          <form className="form py-20">
            <input type="text" placeholder="Frente" />

            <input type="text" placeholder="Vuelta" />
          </form>
          <div className="content">
            <button
              className="button button-primary mb-16"
              onClick={() => router.push("")}
            >
              Siguiente
            </button>
            <div className="border-bottom border-primary-blue" />
          </div>
        </div>

        <div className="heading--center ">
          <img className="h-10 mb-4" src={check} />
          <p className="text-[20px] mb-4">Datos correctos</p>
        </div>

        <div className="content">
          <div className="heading--center ">
            <img className="h-12 mb-8" src={close} />
          </div>
          <h5 className="font-bold text-[30px]">¡Ups!</h5>
          <p>
            Por el momento no cumples <br />
            los requisitos Adelantto, <br /> te recomendamos intentarlo en
            <br />
            <strong>3 meses nuevamente</strong>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Passport;
