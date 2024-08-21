import { useIonRouter } from "@ionic/react";
import { formatCurrency } from "@adelantto/utils";
import { useState } from "react";
import * as Modal from "../components/modal";
import { InstallmentType } from "../types";
import { DateTime } from "luxon";
import { t } from "@adelantto/utils";

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
          <h6 className="mb-6 text-center font-bold text-blue-700">CUOTA A PAGAR</h6>

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

          <p className="rounded bg-blue-700 py-1 text-sm font-semibold text-white">
            {t(status)}
          </p>
        </Modal.Header>
        <Modal.Body>

          <p className="mb-1 text-start">
            Realiza tu pago por transferencia
          </p>

          <ul className="mb-4 bg-blue-700 p-2 text-start text-white">
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

          <form className="mb-5">
            <label htmlFor="voucher" className="mb-1 block text-start text-lg font-semibold">
              Sube tu comprobante
            </label>
            <input
              type="file"
              id="voucher"
              name="voucher"
              accept="image/png, image/jpeg pdf"
            />
          </form>

          <p className="text-start">
            Una vez realizado el pago se reflejará en un máximo de 72 hrs
            hábiles. Si tienes alguna duda puedes escribirnos a:{" "}
            <a className="text-blue-700">contacto@adelantto.com</a>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button className="button" onClick={() => setIsOpen(false)}>
            cerrar
          </button>
        </Modal.Footer>
      </Modal.Root>
    </>
  );
}
