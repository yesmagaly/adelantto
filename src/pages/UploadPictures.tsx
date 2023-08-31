import { IonContent, IonPage, IonList, IonItem, IonLabel } from "@ionic/react";

const UploadPictures: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue">
          <div className="heading__pager text-right">Paso 3 de 3</div>
          <h4 className="text-xl">
            A continuación
            <strong>
              <br /> sube algunas fotografías <br />
            </strong>
            para validar tu propiedad
          </h4>
        </div>
        <div className="content">
          <form className="form">
            <IonList>
              <IonItem>
                <IonLabel>
                  <strong>Frente de la casa</strong>
                  <p>Toma una foto del frente de tu casa</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <strong>Medidor de luz</strong>
                  <p>Toma una foto del medidor de luz</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <strong>Toma de agua</strong>
                  <p>Toma una foto de la toma de agua principal</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <strong>Calle</strong>
                  <p>Toma una foto de la vista de la calle</p>
                </IonLabel>
              </IonItem>
            </IonList>
            <div className="text center mb-7">
              <p className="font-semibold text-[10px] leading-3 mb-4">
                Los documentos deberán ser escaneados en alta resolución <br />{" "}
                y en formato PDF, de lo contrario declinaremos el proceso.
              </p>
              <button className="bg-primary-green font-semibold py-2 px-11 rounded text-white">
                Siguiente
              </button>
            </div>
            <div className="border-bottom" />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UploadPictures;
