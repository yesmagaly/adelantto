import { useIonRouter } from "@ionic/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { T_loan_item } from "@adelantto/store";
import { formatCurrency } from "@adelantto/utils";
import { MaterialIcon } from "@adelantto/core";

function trans(key: string) {
  const mapper = {
    awaiting_account_statement_upload:
      "Esperando la carga de tu estado de cuenta",
    awaiting_account_statement_check:
      "Tu estado de cuenta bancaria esta en revisión",
    awaiting_client_signature:
      "Estamos esperamos su firma digital del contrato. Por favor revise el correo electrónico de Weetrust.",
    signature_document_completed: "Firma de documento completado",
    pending_disbursement: "En espera de desembolso",
    approved: "Aprobado",
    active: "Activo",
    liquidated: "Liquidado",
  };

  return mapper[key] ?? key;
}

type T_props = T_loan_item;

export default function LoanCard({
  id,
  amount,
  missing_installments_counter,
  paid_amount,
  status,
  ...loan
}: T_props) {
  const router = useIonRouter();
  const showMore = () => router.push(`/loans/${id}`);

  console.log({ amount, status, id, ...loan });

  return (
    <div className="bg-linear-to-r from-indigo-600 to-indigo-300 text-white card card-sm">
      <div className="card-body">
        <h4 className="font-semibold text-lg leading-5">
          AdelanttoCash® {id.toString().padStart(4, "0")}
        </h4>

        {status === "active" && (
          <dl>
            {loan.missing_installment && (
              <>
                <dt className="mr-1">Valor a pagar este mes</dt>
                <dd className="mb-2 font-bold text-emerald-300 text-h3">
                  {formatCurrency(loan.missing_installment?.amount)} MXN
                </dd>

                <dt className="float-left mr-1 mb-1">Fecha límite:</dt>
                <dd className="mb-1 font-bold">
                  {format(loan.missing_installment?.due_date, "d 'de' MMMM", {
                    locale: es,
                  })}
                </dd>
              </>
            )}

            <dt className="float-left mr-1 mb-1">Total pagado:</dt>
            <dd className="mb-1 font-bold">
              {formatCurrency(paid_amount)} MXN
            </dd>

            <dt className="float-left mr-1 mb-1">Deuda total:</dt>
            <dd className="mb-1 font-bold">{formatCurrency(amount)} MXN</dd>

            <dt className="float-left mr-1">Cuotas restantes:</dt>
            <dd className="font-bold">{missing_installments_counter}</dd>
          </dl>
        )}

        {status === "awaiting_account_statement_upload" && (
          <button
            className="mt-4 btn btn-primary"
            onClick={() => router.push(`/loans/${id}/success`)}
          >
            Continuar
          </button>
        )}

        {status === "active" && (
          <button className="btn" onClick={showMore}>
            Ver
          </button>
        )}

        {status !== "active" && (
          <div className="flex gap-1.5 mt-2">
            <MaterialIcon name="info" size="18px" />
            <p className="text-sm leading-4">
              {trans(status)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
