import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonAvatar,
  IonCheckbox,
} from "@ionic/react";
import "./Home.css";

const Withdrawals: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <strong>
            ¿Dónde quieres <br />
            tu dinero?
          </strong>
        </div>
        <div>
          <form>
            <input
              type="text"
              placeholder="Subir carátula de tu estado de cuenta"
            />
          </form>
        </div>
        <a href="">Términos interbancarios</a>
        <p>
          A continuación encontrarás el contrato <br /> relacionado a tu
          solicitud.
        </p>
        <IonButton>Siguiente</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Withdrawals;
