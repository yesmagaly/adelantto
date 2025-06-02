import { useIonRouter } from "@ionic/react";
import { formatCurrency } from "@adelantto/utils";
import { useState } from "react";
import * as Modal from "../components/modal";
import { InstallmentType } from "../types";
import { DateTime } from "luxon";
import { t } from "@adelantto/utils";
import FileInputItem from "../components/FileInputItem";
import ErrorMessage from "../components/ErrorMessage";
import { useForm } from "react-hook-form";
import Tag from "./Tag";
import { uploadInstallmentFile } from "../api";

interface ComponentProps extends InstallmentType {
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
  amount,
  status,
  due_date,
}: ComponentProps) {
  const router = useIonRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h6 className="font-semibold leading-6">
            Mes {index + 1}: {t(status)}
          </h6>
          <p className="text-sm">
            Fecha limite de pago: {" "}
            <span className="font-medium">
              {capitalizeFirstLetter(
                DateTime.fromISO(due_date)
                  .setLocale("es")
                  .toFormat("dd LLL yyyy")
              )}
            </span>
          </p>
        </div>

        <button
          className="font-regular rounded-sm bg-blue-900 px-3 py-1 text-sm text-white disabled:opacity-75"
          onClick={() => router.push(`/loans/${loanId}/installments/${id}`)}
          disabled={status === "approved" || status === "in_validation"}
        >
          Ver
        </button>
      </div>
    </>
  );
}
