import { IonContent, IonPage, IonIcon, useIonRouter } from "@ionic/react";
import Icon from "../components/Icon/Icon";
import { ellipse } from "ionicons/icons";

const Summary: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading__paper flex justify-end gap-3 items-center h-20 py-10 px-7">
          <div>
            <button onClick={() => router.push("")}>
              <IonIcon className="w-2 text-gray-300" icon={ellipse}></IonIcon>
            </button>

            <button onClick={() => router.push("")}>
              <IonIcon className="w-2 text-gray-300" icon={ellipse}></IonIcon>
            </button>

            <button onClick={() => router.push("")}>
              <IonIcon className="w-2 text-gray-300" icon={ellipse}></IonIcon>
            </button>
          </div>

          <Icon name="bell" className="mr-6 text-2xl bg-blue-800" />
        </div>
        <div className="py-8">
          <div className="h-80 bg-cover text-white px-9 py-6 heading--blue flex flex-col justify-center">
            <h5 className="font-bold text-2xl leading-6">Adelantto 00001</h5>
            <p className="text-[15px] mb-2">Calle 17 Sur 22</p>
            <div className="border-full" />
            <div>
              <h6 className="mb-10 text-green-400">CUOTA A PAGAR</h6>
              <p className="font-bold text-2xl leading-3 mb-10">$ 10.000</p>
              <h6 className="mb-8 text-green-400">Saldo</h6>
              <p className="font-bold text-2xl leading-3">$ 30.000</p>
            </div>
          </div>
        </div>

        <div className="px-7">
          <div>
            <h4 className="font-bold text-lx mb-4 px-4">RESUMEN</h4>
          </div>
          <div className="mb-7 px-4">
            <button>MES 1</button>
            <button>MES 2</button>
            <button>MES 3</button>
            <button>MES 2</button>
          </div>
          <div className="px-4 mb-10">
            <form>
              <div className="flex justify-between items-center">
                <div className="items-center">
                  <h6 className="font-bold text-[15px] leading-6">
                    MES 1 - PAGADO
                  </h6>
                  <p className="text-[12px] mb-4">26-04-2023</p>
                </div>

                <button
                  className="font-regular px-2 py-1 rounded text-white leading-5 button-secondary"
                  onClick={() => router.push("")}
                >
                  Ver
                </button>
              </div>
              <div className="border-full" />
              <div className="flex justify-between items-center">
                <div className="items-center">
                  <h6 className="font-bold text-[15px] leading-6">
                    MES 2 - PAGADO
                  </h6>
                  <p className="text-[12px] mb-4">26-04-2023</p>
                </div>

                <button
                  className="font-regular px-2 py-1 rounded text-white leading-5 button-secondary"
                  onClick={() => router.push("")}
                >
                  Ver
                </button>
              </div>
              <div className="border-full" />
              <div className="flex justify-between items-center">
                <div className="items-center">
                  <h6 className="font-bold text-[15px] leading-6">
                    MES 3 - PAGADO
                  </h6>
                  <p className="text-[12px] mb-4">26-04-2023</p>
                </div>

                <button
                  className="font-regular px-2 py-1 rounded text-white leading-5 button-secondary"
                  onClick={() => router.push("")}
                >
                  Ver
                </button>
              </div>
              <div className="border-full" />
            </form>
          </div>
        </div>

        <div className="bg-gray-100 py-4">
          <div className="flex justify-between px-10 mb-5">
            <Icon name="home" className="text-6xl bg-black " />
            <Icon name="world" className="text-6xl bg-black" />
            <Icon name="location" className="text-6xl bg-black" />
            <Icon name="search" className="text-6xl bg-black" />
          </div>
          <div className="border-bottom border-primary-blue px-6" />
        </div>
        <div>
          <h6>CUOTA A PAGAR</h6>
          <p>$ 10.000</p>
          <h4>MEDIOS DE PAGO</h4>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Summary;
