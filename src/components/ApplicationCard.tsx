import { useIonRouter } from "@ionic/react";
import { formatCurrency } from "@adelantto/utils";

import { nextStepUrl } from "../utils/steps";
import { ApplicationType } from "../types"


export const trans = function (key: string) {
  const mapper: { [key: string]: string } = {
    'uncompleted': 'Incompleto',
    'awaiting_validation': 'Esperando validación',
    'validating': 'Validando',
    'approved': 'Aceptado',
    'rejected': 'Rechazado',
  }

  return mapper[key] ?? key;
}

export default function ApplicationCard({ item, className }: { item: ApplicationType, className: string }) {
  const router = useIonRouter();
  const redirectTo = nextStepUrl(item);

  return (
    <div className={`border rounded-md border-solid border-gray-300 p-4 ${className}`}>
      {item.status === "uncompleted" && (
        <>
          <div className="text-sm">Renta mensual:</div>
          <h3 className="text-xl heading-5 mb-2">
            {formatCurrency(item.lease_monthly_income)}
          </h3>

          {redirectTo && (
            <button
              className="button is-small !py-2"
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
          <div className="text-base mb-4">
            x {item.pre_offer_term_frame} meses
          </div>
          <div>{item.status !== "approved" && trans(item.status)}</div>
        </>
      )}
    </div>
  );
}
