import { useIonRouter } from "@ionic/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { T_loan_item } from "@adelantto/store";
import { cn, formatCurrency } from "@adelantto/utils";
import { MaterialIcon } from "@adelantto/core";
import { Link } from "react-router-dom";

function trans(key) {
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

type T_props = {
  loan: T_loan_item;

  displayActions: boolean;
};

export default function LoanCard({ loan, displayActions = false }: T_props) {
  return (
    <div className="bg-linear-to-r from-indigo-600 to-indigo-300 text-white card card-sm">
      <div className="gap-3 card-body" style={{ '--card-fs': '14px'}}>
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-lg leading-5">
            <span>AdelanttoCash® {loan.id.toString().padStart(4, "0")}</span>
          </h4>

          {/* <Link to="" className="btn-outline btn-square btn btn-xs btn-primary">
            <MaterialIcon name="arrow_outward" size="18px" />
          </Link> */}
        </div>

        {loan.status === "active" && (
          <dl>
            {loan.summary?.missing_installment && (
              <>
                <dt className="mr-1">Valor a pagar este mes</dt>
                <dd className="mb-2 font-bold text-emerald-300 text-h3">
                  {formatCurrency(loan.summary.missing_installment?.amount)} MXN
                </dd>

                <dt className="float-left mr-1 mb-1">Fecha límite:</dt>
                <dd className="mb-1 font-bold">
                  {format(
                    loan.summary.missing_installment?.due_date,
                    "d 'de' MMMM",
                    {
                      locale: es,
                    }
                  )}
                </dd>

                <dt className="float-left mr-1 mb-1">Total pagado:</dt>
                <dd className="mb-1 font-bold">
                  {formatCurrency(loan.summary.total_paid_amount)} MXN
                </dd>
                <dt className="float-left mr-1 mb-1">Deuda total:</dt>
                <dd className="mb-1 font-bold">
                  {formatCurrency(loan.amount)} MXN
                </dd>

                <dt className="float-left mr-1">Cuotas restantes:</dt>
                <dd className="font-bold">
                  {loan.summary.missing_installments_counter}
                </dd>
              </>
            )}
          </dl>
        )}

        <div className={cn("card-actions", !displayActions && "hidden")}>
          {loan.status === "awaiting_account_statement_upload" && (
            <Link className="btn btn-primary" to={`/loans/${loan.id}/success`}>
              Continuar
            </Link>
          )}

          {loan.status === "active" && (
            <Link className="btn-block btn btn-primary" to={`/loans/${loan.id}`}>
              Ver
            </Link>
          )}

          {loan.status !== "active" && (
            <div className="flex gap-1.5">
              <MaterialIcon name="info" size="18px" />
              <p className="leading-4">{trans(loan.status)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
