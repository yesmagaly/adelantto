import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IonContent, IonFooter, IonPage } from "@ionic/react";
import { formatCurrency } from "@adelantto/utils";
import { DateTime } from "luxon";
import { t } from "@adelantto/utils";

import { InstallmentType } from "../../types";
import Tag from "../../components/Tag";

import { uploadInstallmentFile } from "../../api";
import { useGetInstallmentQuery } from "../../queries";
import FileInputItem from "../../components/FileInputItem";
import exclamation from "../../assets/svgs/exclamation.svg";

interface ComponentProps extends InstallmentType {
  index: number;
  loanId: number;
}

function capitalizeFirstLetter(string: string) {
  return string
    .split(" ")
    .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
    .join(" ");
}

export const InstallmentDetail = ({ match }: ComponentProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const installementId = match.params.installment_id;
  const { data }: { data: InstallmentType } =
    useGetInstallmentQuery(installementId);

  const {
    control,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: any) => {
    const response = await uploadInstallmentFile(installementId, data);

    if (modalRef.current && response.status === 200) {
      modalRef.current.showModal();
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="pt-6">
          <h6 className="font-bold text-blue-700 text-center uppercase">
            Cuota a pagar
          </h6>
        </div>

        <div className="flex flex-col gap-4">
          {data && (
            <>
              <p className="text-center">
                Fecha limite de pago:
                <span className="block font-medium">
                  {capitalizeFirstLetter(
                    DateTime.fromISO(data.due_date)
                      .setLocale("es")
                      .toFormat("dd / LLL / yyyy")
                  )}
                </span>
              </p>
              <p className="font-bold text-3xl text-center">
                <span className="block font-normal text-sm">Monto:</span>
                {formatCurrency(data.total_amount)}
              </p>
              <div className="flex justify-center py-2">
                <Tag status={data.status}>{t(data.status)}</Tag>
              </div>

              <div>
                <p className="mb-1 font-semibold text-sm">
                  Realiza tu pago por transferencia
                </p>

                <ul className="bg-slate-100 p-3 rounded text-sm">
                  <li className="mt-2">
                    Banco: <span className="block font-semibold">BBVA</span>
                  </li>
                  <li className="mt-2">
                    Beneficiario:{" "}
                    <span className="block font-semibold">
                      Soluciones integrales TAFS SAPI de CV
                    </span>
                  </li>
                  <li className="mt-2">
                    CLABE:{" "}
                    <span className="block font-semibold">
                      012180001208318320
                    </span>
                  </li>
                  <li className="mt-2">
                    Referencia:{" "}
                    <span className="block font-semibold">
                      Contrato {match.params.id.toString().padStart(5, "0")}
                    </span>
                  </li>
                </ul>
              </div>

              <form id="form" onSubmit={handleSubmit(onSubmit)}>
                <FileInputItem
                  name="file"
                  control={control}
                  rules={{ required: "Imagen obligatoria" }}
                  accept="image/*"
                  label="Sube tu comprobante"
                />
              </form>

              <p className="text-dark-gray text-sm">
                Una vez realizado el pago se reflejará en un máximo de 72 hrs
                hábiles. Si tienes alguna duda puedes escribirnos a:{" "}
                <Link
                  className="text-blue-700"
                  to="mailto:contacto@adelantto.com"
                >
                  contacto@adelantto.com
                </Link>
              </p>
            </>
          )}
        </div>

        <dialog ref={modalRef} id="my_modal_1" className="modal">
          <div className="modal-box">
            <div className="flex flex-col items-center gap-6">
              <img src={exclamation} alt="exclamation" className="size-24" />

              <div className="flex flex-col items-center gap-2">
                <p className="max-w-3/4 text-sm text-center">
                  Su comprobante de pago fue subido exitosamente y esta siendo
                  validada.
                </p>
              </div>
            </div>

            <div className="justify-center px-4 modal-action">
              <form method="dialog" className="w-full">
                <Link
                  className="btn-block btn btn-primary"
                  to={`/loans/${match.params.id}`}
                >
                  Continuar
                </Link>
              </form>
            </div>
          </div>
        </dialog>
      </IonContent>

      <IonFooter className="ion-padding">
        <div className="gap-2 grid">
          <button
            form="form"
            disabled={isSubmitting}
            className="btn btn-primary"
            type="submit"
          >
            Validar pago
          </button>

          <Link to={`/loans/${match.params.id}`} className="btn">
            Regresar
          </Link>
        </div>
      </IonFooter>
    </IonPage>
  );
};
