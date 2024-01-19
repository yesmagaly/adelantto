import { IonContent, IonPage, IonIcon, useIonRouter } from "@ionic/react";
import Icon from "../../components/Icon/Icon";
import { ellipse } from "ionicons/icons";
import masterCardIcon from "../../assets/icons/master-card.png";

const FullAdvance: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
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

            <Icon name="bell" className="mr-6 text-2xl bg-blue-900" />
          </div>
          <h1 className="heading-3 py-7 px-7">
            ¡Hola, <br />
            <strong>Alexander Cruz!</strong>{" "}
          </h1>
        </div>

        <div className="px-8">
          <div className="heading heading--blue heading--compact mb-7">
            <form className="">
              <div className="flex justify-between items-end">
                <div>
                  <h5 className="text-xl mb-4 text-green-300">
                    Adelantto total
                  </h5>
                  <p className="text-3xl font-bold">$150,000.00</p>
                </div>

                <button
                  className="text-2xl px-4 py-1 rounded-xl text-white bg-blue-900"
                  onClick={() => router.push("")}
                >
                  Ver
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="px-10 mb-40">
          <h6 className="mb-7 text-gray-400">Pagos</h6>
          <div className="border-full" />
          <form>
            <div className="flex justify-between items-center">
              <div className="flex gap-6 items-center">
                <img src={masterCardIcon} className="w-5 h-4" />
                <div>
                  <h4 className="font-bold text-lx leading-5">
                    Adelantto 00001
                  </h4>
                  <p className="text-xs">Calle 17 Sur 13-22</p>
                </div>
              </div>

              <button
                className="font-regular px-3 py-1 rounded text-white leading-5 bg-blue-900"
                onClick={() => router.push("/summary")}
              >
                Ver
              </button>
            </div>
            <div className="border-full" />

            <div className="flex justify-between items-center">
              <div className="flex gap-6 items-center">
                <img src={masterCardIcon} className="w-5 h-4" />
                <div>
                  <h4 className="font-bold text-lx leading-5">
                    Adelantto 00002
                  </h4>
                  <p className="text-xs">Calle 17 Sur 13-22</p>
                </div>
              </div>
              <button
                className="font-regular px-3 py-1 rounded text-white leading-5 bg-blue-900"
                onClick={() => router.push("")}
              >
                Ver
              </button>
            </div>
            <div className="border-full" />

            <div className="flex justify-between items-center">
              <div className="flex gap-6 items-center">
                <img src={masterCardIcon} className="w-5 h-4" />
                <div>
                  <h4 className="font-bold text-lx leading-5">
                    Adelantto 00003
                  </h4>
                  <p className="text-xs">Calle 17 Sur 13-22</p>
                </div>
              </div>
              <button
                className="font-regular px-3 py-1 rounded text-white leading-5 bg-blue-900"
                onClick={() => router.push("")}
              >
                Ver
              </button>
            </div>
            <div className="border-full" />
          </form>
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
      </IonContent>
    </IonPage>
  );
};

export default FullAdvance;
