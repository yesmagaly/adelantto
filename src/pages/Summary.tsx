import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Icon from "../components/Icon/Icon";

const Summary: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="py-20">
          <div className="heading heading--blue flex flex-col justify-center">
            <h5 className="font-bold text-[24px] leading-6">Adelantto 00001</h5>
            <p className="text-[15px] mb-2">Calle 17 Sur 22</p>
            <div className="border-full" />
            <div>
              <h6 className="mb-4">CUOTA A PAGAR</h6>
              <p className="font-bold text-[24px] leading-3 mb-4">$ 10.000</p>
              <h6 className="mb-4">Saldo</h6>
              <p className="font-bold text-[24px] leading-3">$ 30.000</p>
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
          <form className="flex flex-row space-x-44">
            <div>
              <h6 className="font-bold text-[15px] leading-3">
                MES 1 - PAGADO
              </h6>
              <p className="text-[12px] mb-4">26-04-2023</p>
            </div>
            <button
              className="font-regular px-2 py-1 rounded text-white leading-5 button-secondary mb-10"
              onClick={() => router.push("")}
            >
              Ver
            </button>
          </form>

          <div className="border-full" />
          <form className="flex flex-row space-x-44">
            <div>
              <h6 className="font-bold text-[15px] leading-3">
                MES 2 - PAGADO
              </h6>
              <p className="text-[12px] mb-4">26-05-2023</p>
            </div>

            <button
              className="font-regular px-2 py-1 rounded text-white leading-5 button-secondary mb-10"
              onClick={() => router.push("")}
            >
              Ver
            </button>
          </form>

          <div className="border-full" />
          <form className="flex flex-row space-x-16">
            <div>
              <h6 className="font-bold text-[15px] leading-3">
                MES 3 - PENDIENTE POR PAGAR
              </h6>
              <p className="text-[12px] mb-4">26-06-2023</p>
            </div>

            <button
              className=" font-regular px-2 py-1 rounded text-white leading-5 button-secondary mb-10"
              onClick={() => router.push("")}
            >
              Ver
            </button>
          </form>

          <div className="border-full" />
        </div>

        <div className="px-10 py-6">
          <Icon name="home" className="mr-6 text-6xl bg-black " />
          <Icon name="world" className="mr-6 text-6xl bg-black" />
          <Icon name="location" className="mr-6 text-6xl bg-black" />
          <Icon name="search" className="mr-6 text-6xl bg-black" />
        </div>
        <div className="border-bottom border-primary-blue" />
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
