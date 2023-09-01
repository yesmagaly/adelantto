import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const Summary: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="py-10">
          <div className="heading heading--blue flex flex-col justify-center">
            <h5 className="font-bold text-lx leading-3"> Adelantto 00001</h5>
            <p className="text-[15px] mb-7">Calle 17 Sur 22</p>
            <div>
              <h6 className="mb-4">CUOTA A PAGAR</h6>
              <p className="font-bold text-lx leading-3 mb-4">$ 10.000</p>
              <h6 className="mb-4">Saldo</h6>
              <p className="font-bold text-lx leading-3">$ 30.000</p>
            </div>
          </div>
        </div>

        <div className="px-7">
          <div>
            <h4 className="font-bold text-lx mb-4">RESUMEN</h4>
          </div>
          <div className="mb-7">
            <button>MES 1</button>
            <button>MES 2</button>
            <button>MES 3</button>
            <button>MES 2</button>
          </div>
          <div>
            <h6 className="font-bold text-[15px] leading-3">MES 1 - PAGADO</h6>
            <p className="text-[12px] mb-4">26-04-2023</p>
            <h6 className="font-bold text-[15px] leading-3">MES 2 - PAGADO</h6>
            <p className="text-[12px] mb-4">26-05-2023</p>
            <h6 className="font-bold text-[15px] leading-3">
              MES 3 - PENDIENTE POR PAGAR
            </h6>
            <p className="text-[12px] mb-4">26-06-2023</p>
          </div>
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
