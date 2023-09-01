import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  useIonRouter,
} from "@ionic/react";

const DataValidation: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="content">
          <IonCard>
            <img
              alt="Silhouette of mountains"
              src="https://ionicframework.com/docs/img/demos/card-media.png"
            />
            <IonCardHeader>
              <IonCardTitle>¡Ya casi!</IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </div>
        <div className="heading--center">
          <form className="form">
            <div className="mb-7">
              <p className="text-center text-sm leading-4">
                Por último validaremos los datos de tu propiedad. Te
                <br />
                enviaremos un correo electrónico en las próximas <br />
                <strong>72 horas con el resultado de la validación.</strong>
              </p>
            </div>
          </form>
          <div className="mb-7">
            <IonCheckbox labelPlacement="end">
              Acepto que “S.A. de C.V.” <br /> consulte mi buró de crédito
            </IonCheckbox>{" "}
            <br />
            <IonCheckbox labelPlacement="end">SMS</IonCheckbox> <br />
            <IonCheckbox labelPlacement="end">Push</IonCheckbox>
          </div>

          <div className="mb-7">
            <h4 className="font-bold text-xl">
              <strong>¡Hasta pronto!</strong>
            </h4>
          </div>
          <button
            className="button button-primary mb-16"
            onClick={() => router.push("")}
          >
            Finalizar
          </button>
          <div className="border-bottom border-primary-blue" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DataValidation;
