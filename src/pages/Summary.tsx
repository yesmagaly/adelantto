import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const Summary: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <h5>
            <strong>Adelantto 00001</strong>
          </h5>
          <p>Calle 17 Sur 13-22</p>
        </div>
        <div>
          <h6>CUOTA A PAGAR</h6>
          <p>$ 10.000</p>
          <h6>Saldo</h6>
          <p>$ 30.000</p>
        </div>
        <div>
          <h4>RESUMEN</h4>
        </div>
        <div>
          <button>MES 1</button>
          <button>MES 2</button>
          <button>MES 3</button>
          <button>MES 2</button>
        </div>
        <div>
          <h6>MES 1 - PAGADO</h6>
          <p>26-04-2023</p>
          <h6>MES 2 - PAGADO</h6>
          <p>26-05-2023</p>
          <h6>MES 3 - PENDIENTE POR PAGAR</h6>
          <p>26-06-2023</p>
        </div>

        <div>
          <h6>CUOTA A PAGAR</h6>
          <p>$ 10.000</p>
          <h4>MEDIOS DE PAGO</h4>
        </div>
        <div>
          <h3>
            Tu transacción <br />
            ha sido exitosa
          </h3>
          <button
            className="button-primary mb-16"
            onClick={() => router.push("/verification-code")}
          >
            Finalizar
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Summary;
