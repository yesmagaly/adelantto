import { formatCurrency } from "@adelantto/utils";
import { useState } from "react";
import * as Modal from "../components/modal";
import { InstallmentType } from "../types";
import { DateTime } from "luxon";
import { t } from "@adelantto/utils";
import FileInputItem from "../components/FileInputItem";
import ErrorMessage from "../components/ErrorMessage";
import { useForm } from "react-hook-form";
import Tag from "./Tag";
interface ComponentProps extends InstallmentType {
  index: number;
}

function capitalizeFirstLetter(string: string) {
  return string
    .split(" ")
    .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
    .join(" ");
}

export default function InstallmentCard({
  index,
  amount,
  status,
  due_date,
}: ComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: any) => {

  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h6 className="font-semibold leading-6">
            Mes {index + 1}: {t(status)}
          </h6>
          <p className="text-sm">
            Fecha limite de pago:
            <span className="block font-medium">
              {capitalizeFirstLetter(
                DateTime.fromISO(due_date)
                  .setLocale("es")
                  .toFormat("dd LLL yyyy")
              )}
            </span>
          </p>
        </div>

        <button
          className="font-regular rounded bg-blue-900 px-3 py-1 text-white"
          onClick={() => setIsOpen(true)}
        >
          Ver
        </button>
      </div>

      <Modal.Root isOpen={isOpen} variant="fully">
        <Modal.Header>
          <h6 className="mb-6 text-center font-bold text-blue-700">
            CUOTA A PAGAR
          </h6>

          <p className="mb-4 text-center">
            Fecha limite de pago:
            <span className="block font-medium">
              {capitalizeFirstLetter(
                DateTime.fromISO(due_date)
                  .setLocale("es")
                  .toFormat("dd / LLL / yyyy")
              )}
            </span>
          </p>

          <p className="mb-4 text-center text-3xl font-bold">
            <span className="block text-sm font-normal">Monto:</span>
            {formatCurrency(amount)}
          </p>

          <div className="flex justify-center">
            <Tag status={status}>{t(status)}</Tag>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <p className="text-start">Realiza tu pago por transferencia</p>

              <ul className="bg-blue-700 p-2 text-start text-white">
                <li>
                  Banco: <strong>BBVA</strong>
                </li>
                <li>
                  Beneficiario:{" "}
                  <strong>Soluciones integrales TAFS SAPI de CV</strong>
                </li>
                <li>
                  CLABE: <strong>1234567890123456789</strong>
                </li>
                <li>
                  Referencia: <strong>Tu número de contrato</strong>
                </li>
              </ul>
            </div>

            <FileInputItem
              name="file"
              control={control}
              rules={{ required: "Documento obligatorio" }}
              className="flex-row-reverse"
            >
              <h5 className="text-xl font-bold leading-4">
                Sube tu comprobante
              </h5>
              {errors.file && <ErrorMessage error={errors.file} />}
            </FileInputItem>

            <p className="text-start">
              Una vez realizado el pago se reflejará en un máximo de 72 hrs
              hábiles. Si tienes alguna duda puedes escribirnos a:{" "}
              <a className="text-blue-700" href="mailto:contacto@adelantto.com">contacto@adelantto.com</a>
            </p>

            <div className="flex-1"></div>

            <div className="flex flex-col gap-4">
              <button className="button is-primary" type="submit">
                Continuar
              </button>

              <button className="button" onClick={() => setIsOpen(false)}>
                Salir
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal.Root>
    </>
  );
}
