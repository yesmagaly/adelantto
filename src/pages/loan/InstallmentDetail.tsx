import { useState } from "react";
import { useForm } from "react-hook-form";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { formatCurrency } from "@adelantto/utils";
import { DateTime } from "luxon";
import { t } from "@adelantto/utils";

import { InstallmentType } from "../../types";
import FileInput from "../../components/FileInput";
import PhotoInputItem from "../../components/photo-input/PhotoInputItem";
import Icon from "../../components/Icon/Icon";
import ErrorMessage from "../../components/ErrorMessage";
import Tag from "../../components/Tag";
import * as Modal from "../../components/modal";
import * as Page from "../../components/page";

import { uploadInstallmentFile } from "../../api";
import { useGetInstallmentQuery } from "../../queries";

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
  const installementId = match.params.installment_id;
  const { data }: { data: InstallmentType } =
    useGetInstallmentQuery(installementId);

  const router = useIonRouter();
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: any) => {
    const response = await uploadInstallmentFile(installementId, data);

    if (response.status === 200) {
      setIsOpen(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root as="form" onSubmit={handleSubmit(onSubmit)}>
          <Page.Header className="pt-6">
            <h6 className="text-center font-bold uppercase text-blue-700">
              Cuota a pagar
            </h6>
          </Page.Header>
          <Page.Body className="flex flex-col gap-4">
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
                <p className="text-center text-3xl font-bold">
                  <span className="block text-sm font-normal">
                    Monto:
                  </span>
                  {formatCurrency(data.amount)}
                </p>
                <div className="flex justify-center py-2">
                  <Tag status={data.status}>{t(data.status)}</Tag>
                </div>

                <div>
                  <p className="mb-1 text-start">
                    Realiza tu pago por transferencia
                  </p>

                  <ul className="rounded bg-slate-100 p-3">
                    <li>
                      Banco: <strong className="font-medium">BBVA</strong>
                    </li>
                    <li>
                      Beneficiario: <strong className="font-medium">
                        Soluciones integrales TAFS SAPI de CV
                      </strong>
                    </li>
                    <li>
                      CLABE: <strong className="font-medium">
                        1234567890123456789
                      </strong>
                    </li>
                    <li>
                      Referencia: <strong className="font-medium">
                        Tu número de contrato
                      </strong>
                    </li>
                  </ul>
                </div>

                <FileInput
                  name="file"
                  control={control}
                  rules={{ required: "Imagen obligatoria" }}
                  accept="image/*"
                >
                  <h5 className="inline-flex gap-4 text-lg font-bold leading-none">
                    Sube tu comprobante
                    <Icon name="upload" className="bg-slate-500 text-lg" />
                  </h5>
                  {errors.file && <ErrorMessage error={errors.file} />}
                </FileInput>

                <p className="text-start">
                  Una vez realizado el pago se reflejará en un máximo de 72 hrs
                  hábiles. Si tienes alguna duda puedes escribirnos a:{" "}
                  <a
                    className="text-blue-700"
                    href="mailto:contacto@adelantto.com"
                  >
                    contacto@adelantto.com
                  </a>
                </p>
              </>
            )}

            <Modal.Root isOpen={isOpen}>
              <Modal.Body>
                <p>
                  Su comprobante de pago fue subido exitosamente y esta siendo validada.
                </p>
              </Modal.Body>
              <Modal.Footer>

                <button className="button" onClick={() => setIsOpen(false)}>
                  Continuar
                </button>
              </Modal.Footer>
            </Modal.Root>

          </Page.Body>
          <Page.Footer className="gap-2">
            <button className="button is-primary" type="submit">
              Validar pago
            </button>

            <button
              className="button"
              onClick={() => router.push(`/loans/${match.params.id}`)}
            >
              Regresar
            </button>
          </Page.Footer>
        </Page.Root>
      </IonContent>
    </IonPage >
  );
};
