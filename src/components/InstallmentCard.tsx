import { useIonRouter } from "@ionic/react";
import { T_installment } from "../types";
import { DateTime } from "luxon";
import { t } from "@adelantto/utils";

interface T_props extends T_installment {
  index: number;
  loanId: number;
}

function capitalizeFirstLetter(string: string) {
  return string
    .split(" ")
    .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
    .join(" ");
}

export default function InstallmentCard({
  loanId,
  id,
  index,
  status,
  due_date,
}: T_props) {
  const router = useIonRouter();

  return (
    <div className="flex justify-between items-center bg-gray-200 p-4 rounded-md">
      <div>
        <h6 className="font-semibold leading-6">
          Mes {index + 1}: {t(status)}
        </h6>
        <p className="text-sm">
          Fecha limite de pago:{" "}
          <span className="font-medium">
            {capitalizeFirstLetter(
              DateTime.fromISO(due_date).setLocale("es").toFormat("dd LLL yyyy")
            )}
          </span>
        </p>
      </div>

      <button
        className="bg-blue-900 disabled:opacity-75 px-3 py-1 rounded-sm font-regular text-white text-sm"
        onClick={() => router.push(`/loans/${loanId}/installments/${id}`)}
        disabled={status === "approved" || status === "in_validation"}
      >
        Ver
      </button>
    </div>
  );
}
