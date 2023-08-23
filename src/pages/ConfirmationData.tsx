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
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./Home.css";

const ConfirmationData: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <strong>
            Confirmación de datos <br />y solicitud de consulta <br />
            Reporte de Crédito
          </strong>
        </div>
        <p>
          Autorizo expresamente a Adelantto, para que lleve a cabo
          investigaciones sobre el comportamiento crediticio de mi persona, con
          las Sociedades de Información Crediticia: Bla, bla, bla, S.A. y/o
          Trans Banco de México, S.A., durante los siguientes tres años o
          durante el tiempo que mantenga relación jurídica con Adelantto.
        </p>
        <p>
          Así mismo, declaro que conozco la naturaleza y alcance de la
          información que se solicitará, del uso que Adelantto hará de tal
          información y de que ésta podrá realizar consultas periódicas del
          historial crediticio de mi persona, durante los siguientes tres años o
          durante el tiempo que mantengamos relación jurídica.
        </p>
        <p>
          De igual manera corroboró que toda la información aquí expresada es
          verídica y esta a dispocisión y consulta para fines prácticos de
          Adelantto y sus servicios.
        </p>
        <IonCheckbox labelPlacement="end">
          Acepto términos y condiciones del servicio
        </IonCheckbox>
        <IonButton>Siguiente</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ConfirmationData;
