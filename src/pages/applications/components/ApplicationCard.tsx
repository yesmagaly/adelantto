import { useIonRouter } from "@ionic/react";
import { formatCurrency } from "@adelantto/utils";

import {
  applicationStepsUrls,
  T_application,
  useDestroyApplicationMutation,
} from "@adelantto/store";

export const trans = function (key: string) {
  const mapper: { [key: string]: string } = {
    uncompleted: "Borrador",
    awaiting_validation: "Esperando validación",
    in_validation: "En validación",
    approved: "Aceptado",
    rejected: "Rechazado",
  };

  return mapper[key] ?? key;
};

export default function ApplicationCard({
  item,
  className,
}: {
  item: T_application;
  className: string;
}) {
  const [destroyApplication] = useDestroyApplicationMutation();
  const router = useIonRouter();

  const redirectTo =
    item?.next_step &&
    `/applications/${item.id}${applicationStepsUrls[item.next_step]}`;

  return (
    <div className={`card card-sm bg-gray-200 ${className}`}>
      <div className="card-body">
        <div className="badge-outline text-xs badge badge-sm">
          {trans(item.status)}
        </div>

        <h4 className="font-semibold text-lg leading-4">
          Solicitud AdelanttoCash® {item.id.toString().padStart(4, "S0")}
        </h4>

        <dl>
          <dt className="float-left mr-1 mb-1">Valor de la renta mensual:</dt>
          <dd className="mb-1 font-bold">
            {formatCurrency(item.lease_monthly_income)} MXN
          </dd>

          {item?.pre_offer_term_frame && (
            <>
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
            </>
          )}
        </dl>

        <div className="flex flex-col gap-2">
          {item.status !== "in_validation" && item.status !== "rejected" && (
            <button
              className="btn-block text-sm btn btn-primary btn-sm"
              onClick={() => router.push(redirectTo)}
            >
              Continuar
            </button>
          )}

          {item.status !== "uncomplted" && (
            <button
              type="button"
              className="btn-block btn-outline text-sm btn btn-sm"
              onClick={async () => await destroyApplication(item.id).unwrap()}
            >
              Eliminar solicitud
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
