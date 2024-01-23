import { useIonRouter } from "@ionic/react";
import { formatCurrency } from "@adelantto/utils";
import masterCardIcon from "../assets/icons/master-card.png";
import { LoanType } from "../types";


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

      <div className="pt-4">
        <p className="leading-tight">
          {status === "awaiting_account_statement_check" &&
            "Your account statement is awaiting for review."}
          {status === "awaiting_client_signature" &&
            "We are waiting for you to sign the contract. Please check your email."}
          {status === "signature_document_completed" &&
            "We are waiting to execute the disbursement."}
        </p>
      </div>
    </div>
  );
}
