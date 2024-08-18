import { useIonRouter } from "@ionic/react";
import { formatCurrency } from "@adelantto/utils"
import { useState } from "react";
import * as Modal from "../components/modal";
import { InstallmentType } from "../types";

interface ComponentProps extends InstallmentType {
  index: number;
}

export default function InstallmentCard({ index, amount, status, due_date }: ComponentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h6 className="font-semibold leading-6">
            Mes {index + 1}: {status === 'paid' ? 'Pagado' : 'Pendiente por pagar'}
          </h6>
          <p className="text-sm">Fecha limite de pago:
            <span className="block font-medium">{due_date}</span>
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
          <p className="mb-6 text-3xl font-bold">{formatCurrency(amount)}</p>
        </Modal.Header>
        <Modal.Body>
          <h4 className="mb-4 text-lg font-bold text-blue-900">
            MEDIOS DE PAGO
          </h4>

          <div className="flex justify-center">
            Master Card
          </div>

        </Modal.Body>
        <Modal.Footer>
          <button className="button" onClick={() => setIsOpen(false)}>
            cerrar
          </button>
        </Modal.Footer>
      </Modal.Root>
    </>
  )
}