import { useIonRouter } from "@ionic/react";
import { formatCurrency } from "@adelantto/utils";

import { nextStepUrl } from "../utils/steps";
import { ApplicationType } from "../types";

export const trans = function (key: string) {
  const mapper: { [key: string]: string } = {
    uncompleted: "Incompleto",
    awaiting_validation: "Esperando validación",
    validating: "Validando",
    approved: "Aceptado",
    rejected: "Rechazado",
  };

  return mapper[key] ?? key;
};

export default function ApplicationCard({
  item,
  className,
}: {
  item: ApplicationType;
  className: string;
}) {
  const router = useIonRouter();
  const redirectTo = nextStepUrl(item);

  return (
    <div className={`card card-sm bg-gray-200 ${className}`}>
      <div className="card-body">
        <h4 className="font-semibold text-lg leading-5">
          Solicitud AdelanttoCash® {item.id.toString().padStart(4, "S0")}
        </h4>
        <dl>
          {item.status === "uncompleted" && (
            <>
              <dt className="float-left mr-1 mb-1">Renta mensual:</dt>
              <dd className="mb-1 font-bold">
                {formatCurrency(item.lease_monthly_income)} MXN
              </dd>

              <dt className="float-left mr-1 mb-1">Pre-oferta Monto:</dt>
              <dd className="mb-1 font-bold">
                {formatCurrency(item.pre_offer_amount)} MXN
              </dd>


              {/* pre_offer_commissions
              pre_offer_fees
              pre_offer_term_frame */}

              <div className="text-sm"></div>
              <h3 className="mb-2 text-xl heading-5">
                <span className="text-xs">
                  {item.status} | {item.step}
                </span>
              </h3>

              {redirectTo && (
                <button
                  className="btn btn-sm"
                  onClick={() => router.push(redirectTo)}
                >
                  Continuar
                </button>
              )}
            </>
          )}
        </dl>

        {item.status !== "uncompleted" && (
          <>
            <div className="text-sm">Adelanto:</div>
            <h3 className="text-xl heading-5">
              {formatCurrency(item.pre_offer_amount)}
            </h3>
            <div className="mb-4 text-base">
              x {item.pre_offer_term_frame} meses
            </div>
            <div>{item.status !== "approved" && trans(item.status)}</div>
          </>
        )}
      </div>
    </div>
  );
}
