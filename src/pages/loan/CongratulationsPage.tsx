import { useRef } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";

import fireworks from "../../assets/svgs/fireworks.svg";
import adelanttoBgUrl from "../../assets/images/adelantto-bg.png";
import adelanttoBg from "../../assets/images/adelantto-gradient-bg.png";
import exclamation from "../../assets/svgs/exclamation.svg";
import FileInputItem from "../../components/FileInputItem";
import { applications } from "../../api";
import { RouteComponentProps } from "react-router";

type T_form = {
  account_statement?: File;
};

type T_props = RouteComponentProps<{
  id: string;
}>;

export const CongratulationsPage: React.FC<T_props> = ({ match }) => {
  const router = useIonRouter();
  const modalRef = useRef<HTMLDialogElement>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<T_form>();

  const onSubmit = async (data: T_form) => {
    const response = await applications.accountStatement(match.params.id, data);

    if (modalRef.current && response.status === 200) {
      modalRef.current.showModal();
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <img src={adelanttoBgUrl} className="absolute inset-0 w-full" />
        <img src={adelanttoBg} className="absolute inset-0 w-full" />

        <div className="flex flex-col justify-center items-center h-full">
          <img src={fireworks} alt="fireworks" className="mb-18" />
          <div className="mb-6 text-center">
            <h1 className="mb-3 text-h2">¡Felicitaciones!</h1>
            <p className="text-sm">
              Tu adelantto ha sido aprobado.
              <br />
              Cuéntanos dónde quieres recibir tu dinero
            </p>
          </div>

          <form className="gap-6 grid" onSubmit={handleSubmit(onSubmit)}>
            <FileInputItem
              name="account_statement"
              control={control}
              rules={{ required: "Documento obligatorio" }}
              accept="application/pdf"
              label="Subir estado de cuenta bancario completo (con QR)"
            />

            <button
              disabled={isSubmitting}
              className="btn-block mb-8 btn btn-primary"
            >
              Enviar
            </button>
          </form>

          {/* <Link
            className="btn-block btn btn-primary"
            to={`/loans/${match.params.id}/account-statement`}
          >
            Ingresar datos bancarios
          </Link> */}
        </div>

        <dialog ref={modalRef} id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="flex flex-col items-center gap-6">
              <img src={exclamation} alt="exclamation" className="size-20" />

              <div className="flex flex-col items-center gap-2">
                <p className="text-sm text-center">
                  En este momento validaremos la información bancaria que nos
                  proporcionaste. Este proceso llevará máximo 24 hrs hábiles.
                </p>

                <p className="text-sm text-center">
                  Luego, enviaremos el contrato de tu AdelanttoCash® a tu correo
                  electrónico, por favor, ayudanos a revisarlo y firmarlo de
                  manera digital.
                </p>
              </div>
            </div>

            <div className="justify-center px-4 modal-action">
              <form method="dialog" className="w-full">
                <button
                  className="btn-block btn btn-primary"
                  onClick={() => router.push("/")}
                >
                  Aceptar
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </IonContent>
    </IonPage>
  );
};
