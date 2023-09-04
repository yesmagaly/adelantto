import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const FullAdvance: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <h4 className="font-bold text-2xl py-7 px-7">
            ¡Hola, <br />
            <strong>Alexander Cruz!</strong>{" "}
          </h4>
        </div>
        <div className="heading heading--blue heading--compact mb-7">
          <form className="flex flex-row space-x-32">
            <div>
              <h5 className="leading-7">Adelantto total</h5>
              <p className="text-2xl font-bold">$150,000.00</p>
            </div>
            <button
              className="font-regular px-3 py-1 rounded text-white leading-5 button-secondary mb-7"
              onClick={() => router.push("")}
            >
              Ver
            </button>
          </form>
        </div>

        <div className="px-10">
          <h6 className=" mb-7">Pagos</h6>
          <div className="border-full" />
          <form className="flex flex-row space-x-36">
            <div>
              <h4 className="font-bold text-lx leading-5">Adelantto 00001</h4>
              <p className="text-[12px]">Calle 17 Sur 13-22</p>
            </div>

            <button
              className="font-regular px-3 py-1 rounded text-white leading-5 button-secondary mb-7"
              onClick={() => router.push("")}
            >
              Ver
            </button>
          </form>
          <div className="border-full" />
          <form className="flex flex-row space-x-36">
            <div>
              <h4 className="font-bold text-lx leading-5">Adelantto 00002</h4>
              <p className="text-[12px]">Calle 17 Sur 13-22</p>
            </div>

            <button
              className="font-regular px-3 py-1 rounded text-white leading-5 button-secondary mb-7"
              onClick={() => router.push("")}
            >
              Ver
            </button>
          </form>
          <div className="border-full" />
          <form className="flex flex-row space-x-36">
            <div>
              <h4 className="font-bold text-lx leading-5">Adelantto 00003</h4>
              <p className="text-[12px]">Calle 17 Sur 13-22</p>
            </div>

            <button
              className="font-regular px-3 py-1 rounded text-white leading-5 button-secondary mb-7"
              onClick={() => router.push("")}
            >
              Ver
            </button>
          </form>
          <div className="border-full" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FullAdvance;
