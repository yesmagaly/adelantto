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
    <div className="border-b p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h4 className="text-lx font-bold leading-5">AdelanttoCash® {id.toString().padStart(5, "0")}</h4>
        </div>

        {status === "awaiting_account_statement_upload" &&
          application.status === "approved" && (
            <button
              className="font-regular rounded bg-green-500 px-3 py-1 leading-5 text-white"
              onClick={() => router.push(`/loans/${id}/success`)}
            >
              Continuar
            </button>
          )}

        {status === "active" && (
          <button
            className="font-regular rounded bg-blue-900 px-3 py-1 leading-5 text-white"
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
