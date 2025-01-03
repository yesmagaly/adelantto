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
        <div className="heading heading--blue heading--compact mb-2 text-center">
          <h3 className="heading-3 py-5">
            ¿Dónde quieres <strong>tu dinero?</strong>
          </h3>
        </div>
        <div className="content">
          <div className="content mb-5 w-full border border-gray-200 bg-white py-5 shadow-2xl">
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
                <h5 className="text-sm font-bold leading-4">
                  Subir estado de cuenta bancario completo (con QR)
                </h5>

                {errors?.account_statement && (
                  <span className="message is-small is-danger">
                    {errors?.account_statement?.message}
                  </span>
                )}
              </FileInput>

              <div className="mb-16 mt-4">
                <p>
                  Enviaremos el contrato de tu AdelanttoCash® a tu correo electrónico, por favor, ayudanos a revisarlo y firmarlo de manera digital.
                </p>
              </div>

              <button className="button is-primary mb-8">
                Siguiente
              </button>
            </form>
          </div>
        </div>

        <Modal.Root isOpen={showModal}>
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <Lottie
              animationData={lensAnimation}
              style={{ width: 219, height: 219 }}
              loop
              play
            />
            <p className="mb-6 text-[16px] leading-5">
              En este momento validaremos la información bancaria que nos proporcionaste. Este proceso llevará máximo 24 hrs hábiles.
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
