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

      <Modal.Root isOpen={isOpen}>
        <Modal.Header>
          <h6 className="mb-6 text-blue-700">CUOTA A PAGAR</h6>
          <p className="text-sm mb-4">
            Fecha limite de pago:
            <span className="block font-medium">
              {capitalizeFirstLetter(
                DateTime.fromISO(due_date)
                  .setLocale("es")
                  .toFormat("dd / LLL / yyyy")
              )}
            </span>
          </p>
          <p className="mb-4 text-3xl font-bold">
            <span className="text-sm block font-normal">Monto:</span>
            {formatCurrency(amount)}
          </p>
          <p className="text-sm bg-blue-700 text-white font-semibold rounded py-1">
            {t(status)}
          </p>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm text-start mb-1">
            Realiza tu pago por transferencia
          </p>
          {/* <h4 className="mb-4 text-lg font-bold text-blue-900">
            MEDIOS DE PAGO
          </h4> */}

          <ul className="text-start bg-blue-700 text-white p-2 mb-4">
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
            <label htmlFor="voucher" className="text-start font-semibold text-lg">
              Sube tu comprobante
            </label>
            <input
              type="file"
              id="voucher"
              name="voucher"
              accept="image/png, image/jpeg pdf"
            />
          </form>

          <p className="text-xs text-start">
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
