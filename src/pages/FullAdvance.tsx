import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const FullAdvance: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <h4 className="font-bold text-2xl py-7 ">
            ¡Hola, <br />
            <strong>Alexander Cruz!</strong>{" "}
          </h4>
        </div>
        <div className="heading heading--blue heading--compact mb-7">
          <h5 className="leading-7">Adelantto total</h5>
          <p className="text-2xl font-bold">$150,000.00</p>
        </div>
        <h6 className=" mb-7">Pagos</h6>
        <div className="content">
          <div>
            <h4 className="font-bold text-lx leading-5">Adelantto 00001</h4>
            <p className="text-[12px]">Calle 17 Sur 13-22</p>
            <h4 className="font-bold text-lx leading-5">Adelantto 00002</h4>
            <p className="text-[12px]">Calle 17 Sur 13-22</p>
            <h4 className="font-bold text-lx leading-5">Adelantto 00003</h4>
            <p className="text-[12px]">Calle 17 Sur 13-22</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FullAdvance;
