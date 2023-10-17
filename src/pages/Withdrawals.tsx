import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import * as Modal from "../components/modal";
import walletAnimation from "../assets/animations/wallet.json";
import lensAnimation from "../assets/animations/lens.json";
import { useState } from "react";
import { fastFoodOutline } from "ionicons/icons";

const Withdrawals: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue text-center heading--compact mb-2">
          <h3 className="text-3xl py-5">
            ¿Dónde quieres <br />
            <strong>tu dinero?</strong>
          </h3>
        </div>
        <div className="content">
          <div className="content bg-white py-5 shadow-2xl w-full border border-gray-200 mb-5">
            <Lottie
              animationData={walletAnimation}
              style={{ width: 251, height: 251 }}
              loop
              play
            />
            <form className="form mb-7">
              <input
                type="text"
                placeholder="Subir carátula de tu estado de cuenta"
              />
            </form>
            <div className="mb-16">
              <a onClick={() => setOpen(true)} className="underline leading-10">
                Términos interbancarios
              </a>
              <p>
                A continuación encontrarás el contrato <br /> relacionado a tu
                solicitud.
              </p>
            </div>
          </div>

          <div className="mb-7">
            <button
              className="button is-primary mb-8"
              onClick={() => setShowModal(true)}
            >
              Siguiente
            </button>
          </div>

          <div className="border-bottom border-primary-blue" />
        </div>

        <Modal.Root isOpen={open}>
          <Modal.Header>
            <h2>
              <strong>
                Términos <br /> interbancarios
              </strong>
            </h2>
          </Modal.Header>
          <Modal.Body>
            <h5>
              <strong>
                1. Lorem ipsum dolor sit amet,
                <br /> consectetuer adipiscing elit, sed
              </strong>
            </h5>
            <p>
              diam nonummy nibh euismod tincidunt ut laoreet dolore magna
              aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
              exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons
              ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
              ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
              minim veniam, quis nostrud exerci tation ullamcorper suscipit
              lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => setOpen(false)}>Cerrar</button>
          </Modal.Footer>
        </Modal.Root>

        <Modal.Root isOpen={showModal}>
          <Modal.Header></Modal.Header>
          <Modal.body>
            <Lottie
              animationData={lensAnimation}
              style={{ width: 219, height: 219 }}
              loop
              play
            />
            <p className="text-[16px] mb-6 leading-5">
              En este punto estamos validando <br />
              el convenio con tu entidad bancaria,
              <br />
              para cualquier disposición de <br /> efectivo necesaria.
            </p>
          </Modal.body>
          <Modal.Footer>
            <button
              className="button is-secondary mb-8"
              onClick={() => router.push("/firma-page")}
            >
              Siguiente
            </button>
          </Modal.Footer>
        </Modal.Root>
        <div className="content"></div>
      </IonContent>
    </IonPage>
  );
};

export default Withdrawals;
