import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";
import { useForm } from "react-hook-form";

import * as Modal from "../components/modal";
import walletAnimation from "../assets/animations/wallet.json";
import lensAnimation from "../assets/animations/lens.json";
import { useState } from "react";
import FileInput from "../components/FileInput";
import { applications } from "../api";

const Withdrawals: React.FC = ({ match }) => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useIonRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await applications.accountStatement(match.params.id, data);
    await response.json();

    if (response.status === 200) {
      setShowModal(true)
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue text-center heading--compact mb-2">
          <h3 className="heading-3 py-5">
            ¿Dónde quieres <strong>tu dinero?</strong>
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
            <form className="form w-full" onSubmit={handleSubmit(onSubmit)}>
              <FileInput
                name="account_statement"
                control={control}
                rules={{ required: "Documento obligatorio" }}
              >
                <h5 className="font-bold text-sm leading-4">
                  Subir carátula de tu estado de cuenta
                </h5>

                {errors?.account_statement && (
                  <span className="message is-small is-danger">
                    {errors?.account_statement?.message}
                  </span>
                )}
              </FileInput>

              <div className="mb-16 mt-4">
                <a onClick={() => setOpen(true)} className="underline leading-10">
                  Términos interbancarios
                </a>
                <p>
                  A continuación encontrarás el contrato relacionado a tu
                  solicitud.
                </p>
              </div>

              <button className="button is-primary mb-8">
                Siguiente
              </button>
            </form>
          </div>
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
          <Modal.Body>
            <Lottie
              animationData={lensAnimation}
              style={{ width: 219, height: 219 }}
              loop
              play
            />
            <p className="text-[16px] mb-6 leading-5">
              En este punto estamos validando el convenio con tu entidad bancaria,
              para cualquier disposición de efectivo necesaria.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="button is-secondary mb-8"
              onClick={() => router.push("/dashboard")}
            >
              Siguiente
            </button>
          </Modal.Footer>
        </Modal.Root>
      </IonContent>
    </IonPage>
  );
};

export default Withdrawals;
