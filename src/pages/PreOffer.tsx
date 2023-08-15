import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import "./Home.css";

const PreOffer: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <strong>Pre-Oferta Adelantto</strong>
        </div>
        <div>
          <strong>
            Seleccionaste 6 meses, <br /> a continuación te presentamos <br />{" "}
            el resumen de nuestra oferta.
          </strong>
        </div>
        <div>
          <button>
            $ 30,000.00 MXN <br />
            El total de los meses de tu renta
          </button>
          <button>
            $ 28,000.00 MXN <br />
            El monto que recibirás
          </button>
          <button>
            $ 2,000.00 MXN <br />
            Costo de nuestro servicio y seguro
          </button>
        </div>
        <strong>¿Te interesa ver el reumen para otros meses?</strong>
        <form action="">
          <input type="text" placeholder="6" />
        </form>

        <IonButton>
          Iniciar proceso de Validación <br />
          de documentos
        </IonButton>
        <p>
          Al aceptar estas aprovando el uso de tus datos <br />
          para validaciones de identificación. <a href="">Ver detalle</a>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default PreOffer;
