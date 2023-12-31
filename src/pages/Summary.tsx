import { IonContent, IonPage, IonIcon, useIonRouter } from "@ionic/react";
import Icon from "../components/Icon/Icon";
import masterCardIcon from "../assets/icons/master-card.png";
import { ellipse } from "ionicons/icons";
import { useState } from "react";
import * as Modal from "../components/modal";

const Summary: React.FC = () => {
  const [showPay, setShowPay] = useState(false);
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading__paper flex justify-end gap-3 items-center h-20 py-12 px-8">
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

          <Icon name="bell" className="text-2xl bg-blue-800" />
        </div>

        <div className="h-90 bg-cover text-white px-9 py-10 heading--blue">
          <h1 className="heading-4">Adelantto 00001</h1>
          <p className="mb-6">Calle 17 Sur 13-22</p>
          <div className="border-full" />
          <div>
            <h6 className="mb-8 mt-5 text-primary-green">CUOTA A PAGAR</h6>
            <p className="font-bold text-2xl mb-8">$ 10.000</p>
            <h6 className="text-primary-green mb-8">Saldo</h6>
            <p className="font-bold text-2xl">$ 30.000</p>
          </div>
        </div>

        <div className="px-7 py-8">
          <h4 className="font-bold text-xl mb-4">RESUMEN</h4>

          <div className="flex justify-between gap-3 mb-7">
            <button className="text-lg bg-gray-200 px-4 py-0.5 rounded-md">
              MES 1
            </button>
            <button className="text-lg bg-gray-200 px-4 py-0.5 rounded-md">
              MES 2
            </button>
            <button className="text-lg bg-primary-green px-4 py-0.5 rounded-md">
              MES 3
            </button>
            <button className="text-lg bg-gray-200 px-4 py-0.5 rounded-md">
              MES 2
            </button>
          </div>
          <div className="mb-10">
            <div className="flex justify-between items-center">
              <div className="mb-4">
                <h6 className="font-bold leading-6">MES 1 - PAGADO</h6>
                <p className="text-xs">26-04-2023</p>
              </div>

              <button
                className="font-regular px-3 py-1 rounded text-white bg-blue-900"
                onClick={() => router.push("")}
              >
                Ver
              </button>
            </div>
            <div className="border-full" />
            <div className="flex justify-between items-center">
              <div className="mb-4">
                <h6 className="font-bold leading-6">MES 2 - PAGADO</h6>
                <p className="text-xs">26-05-2023</p>
              </div>

              <button
                className="font-regular px-3 py-1 rounded text-white bg-blue-900"
                onClick={() => router.push("")}
              >
                Ver
              </button>
            </div>
            <div className="border-full" />
            <div className="flex justify-between items-center">
              <div className="mb-4">
                <h6 className="font-bold text-blue-900 leading-6">
                  MES 3 - PENDIENTE POR PAGAR
                </h6>
                <p className="text-xs">26-06-2023</p>
              </div>

              <button
                className="font-regular px-3 py-1 rounded text-white bg-blue-900"
                onClick={() => setShowPay(true)}
              >
                Ver
              </button>
            </div>
            <div className="border-full" />
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

        <Modal.Root isOpen={showPay}>
          <Modal.Header>
            <h6 className="text-blue-700 mb-6">CUOTA A PAGAR</h6>
            <p className="text-3xl font-bold mb-6">$ 10.000</p>
            <h4 className="font-bold text-lg text-blue-900">MEDIOS DE PAGO</h4>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <div className="flex justify-center gap-3 mb-2">
              <img src={masterCardIcon} className="bg-gray-100 px-14 py-3" />
              <img src={masterCardIcon} className="bg-gray-100 px-14 py-3" />
            </div>
            <div className="flex justify-center mb-2">
              <img src={masterCardIcon} className="bg-gray-100 px-32 py-3" />
            </div>
            <div className="flex justify-center mb-12">
              <div className="flex bg-gray-100">
                <img src={masterCardIcon} className="px-6 py-3" />
                <img src={masterCardIcon} className="px-6 py-3" />
                <img src={masterCardIcon} className="px-6 py-3" />
                <img src={masterCardIcon} className="px-6 py-3" />
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
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => router.push("/succesful-transaction")}>
              cerrar
            </button>
          </Modal.Footer>
        </Modal.Root>
        <div className="text-center py-10"></div>
      </IonContent>
    </IonPage>
  );
};

export default Summary;
