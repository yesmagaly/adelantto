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
        <h4 className="font-semibold text-lg leading-4">
          Solicitud AdelanttoCash® {item.id.toString().padStart(4, "S0")}
        </h4>
        <div className="flex gap-2 mb-2">
          <div className="badge-outline text-xs badge">{item.step}</div>
          <div className="badge-outline text-xs badge">{item.status}</div>
        </div>

        <dl>
          {item.status === "uncompleted" && (
            <>
              <dt className="float-left mr-1 mb-1">
                Valor de la renta mensual:
              </dt>
              <dd className="mb-1 font-bold">
                {formatCurrency(item.lease_monthly_income)} MXN
              </dd>

              <dt className="mt-2 font-semibold">Pre-oferta</dt>
              <dd className="mb-1 font-bold"></dd>

              <dt className="float-left mr-1 mb-1 ml-2">Cantidad de meses:</dt>
              <dd className="mb-1 font-bold">
                {item.pre_offer_term_frame} meses
              </dd>

              <dt className="float-left mr-1 mb-1 ml-2">Total que pagarás:</dt>
              <dd className="mb-1 font-bold">
                {formatCurrency(item.pre_offer_amount)} MXN
              </dd>

              <dt className="float-left mr-1 mb-1 ml-2">
                Total que recibiras:
              </dt>
              <dd className="mb-1 font-bold">
                {formatCurrency(item.pre_offer_amount - item.pre_offer_fees)}{" "}
                MXN
              </dd>

              <dt className="float-left mr-1 mb-1 ml-2">Pago de seguro:</dt>
              <dd className="mb-1 font-bold">
                {formatCurrency(item.pre_offer_fees)} MXN
              </dd>

              {redirectTo && (
                <button
                  className="btn-block mt-2 btn btn-primary"
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
