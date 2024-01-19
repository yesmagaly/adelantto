import { useIonRouter } from "@ionic/react";
import { formatCurrency } from "@adelantto/utils";

import { nextStepUrl } from "../utils/steps";

export default function ApplicationCard({ item, className }) {
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
          <div>{item.status !== "approved" && item.status}</div>
        </>
      )}

      {item.status === "approved" && item?.loan && (
        <button
          className="button is-small !py-2"
          onClick={() => router.push(`/loans/${item.loan?.id}/success`)}
        >
          Continuar
        </button>
      )}
    </div>
  );
}
