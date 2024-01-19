import { useIonRouter } from "@ionic/react";
import { formatCurrency } from "@adelantto/utils"
import { useState } from "react";
import * as Modal from "../components/modal";

export default function InstallmentCard({ index, amount, status, due_date }) {
  const router = useIonRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <div>
          <h6 className="font-bold uppercase leading-6">MES {index + 1} - {status === 'paid' ? 'Pagado' : 'Pendiente por pagar'}</h6>
          <p className="text-xs">{due_date}</p>
        </div>

        <button
          className="font-regular px-3 py-1 rounded text-white bg-blue-900"
          onClick={() => setIsOpen(true)}
        >
          Ver
        </button>
      </div>

      <Modal.Root isOpen={isOpen}>
        <Modal.Header>
          <h6 className="text-blue-700 mb-6">CUOTA A PAGAR</h6>
          <p className="text-3xl font-bold mb-6">{formatCurrency(amount)}</p>
        </Modal.Header>
        <Modal.Body>
          <h4 className="font-bold text-lg text-blue-900 mb-4">MEDIOS DE PAGO</h4>

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