import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const Signature: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="content">
          <form className="form">
            <div className="mb-7">
              <h3 className="font-bold text-4xl text-center">
                ¡Firma y recibe!
              </h3>
            </div>
            <div className=" mb-7">
              <input type="text" placeholder="Firmar aquí" />
            </div>
            <button
              className="button button-primary mb-16"
              onClick={() => router.push("")}
            >
              Firmar
            </button>
            <div className="border-bottom border-primary-blue" />
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signature;
