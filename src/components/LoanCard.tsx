import { useIonRouter } from "@ionic/react";
import masterCardIcon from "../assets/icons/master-card.png";
import { LoanType } from "../types";


function trans(key: string) {
  const mapper = {
    'awaiting_account_statement_upload': 'Esperando la carga de estado de cuenta',
    'awaiting_account_statement_check': 'Su estado de cuenta esta a la espera de revisión',
    'awaiting_client_signature': 'Estamos esperamos su firma digital del contrato. Por favor revise el correo electrónico de Weetrust.',
    'signature_document_completed': 'Firma de documento completado',
    'pending_disbursement': 'En espera de desembolso',
    'active': 'Activo',
  }

  return mapper[key] ?? key;
}

interface ComponentProps extends LoanType {
  url: string
}

export default function LoanCard({ amount, url, status, application, id }: ComponentProps) {
  const router = useIonRouter();
  const showMore = () => router.push(url);

  return (
    <div className="p-4 border-b">
      <div className="flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <img src={masterCardIcon} className="w-5 h-4" />
          <div>
            <h4 className="font-bold text-lx leading-5">Adelantto 00001</h4>
            <p className="text-xs">Calle 17 Sur 13-22</p>
          </div>
        </div>

        {status === "awaiting_account_statement_upload" &&
          application.status === "approved" && (
            <button
              className="font-regular px-3 py-1 rounded text-white leading-5 bg-green-500"
              onClick={() => router.push(`/loans/${id}/success`)}
            >
              Continuar
            </button>
          )}

        {status === "active" && (
          <button
            className="font-regular px-3 py-1 rounded text-white leading-5 bg-blue-900"
            onClick={showMore}
          >
            Ver
          </button>
        )}
      </div>

      {status !== 'active' && (
        <div className="pt-4">
          <p className="leading-tight">{trans(status)}</p>
        </div>
      )}

    </div>
  );
}
