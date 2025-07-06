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
        {item.status === "uncompleted" && (
          <>
            <div className="text-sm">Renta mensual:</div>
            <h3 className="mb-2 text-xl heading-5">
              {formatCurrency(item.lease_monthly_income)}{" "}
              <span className="text-xs">{item.status} | {item.step}</span>
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
