import {
  IonContent,
  IonPage,
  useIonRouter,
  IonHeader,
  IonFooter,
} from "@ionic/react";
import { useForm } from "react-hook-form";

import frontIdImageUrl from "./assets/images/front-id.png";
import backIdImageUrl from "./assets/images/back-id.png";

import { checkZipCode } from "../../api";
import { applications } from "../../api";
import { MaterialIcon } from "@adelantto/core";
import FileInputItem from "../../components/FileInputItem";

function removeNumericFormat(value: string) {
  return parseFloat(value.replaceAll(/\,|\$|\s/g, ""));
}

function addMonths(date: any, months: number) {
  date.setMonth(date.getMonth() + months);

  return date;
}

function parseDate(str: string) {
  const [year, month, day] = str.split("-").map((i) => Number.parseInt(i));

  return new Date(+year, month - 1, +day);
}

// Validate minimum period of contract time
function validateMinContractTime(startDateStr: string, endDateStr: string) {
  const minMonths = 6;
  const oneDayTimestamp = 86400000;
  const endDate = parseDate(endDateStr);
  const minEndDate = addMonths(parseDate(startDateStr), minMonths);

  return minEndDate.getTime() - oneDayTimestamp <= endDate.getTime();
}

export function atLeastThreeMonths(end_date, months_number) {
  const date1 = new Date();
  const date2 = new Date(end_date);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const diffMonths = diffDays / 30.44;

  return diffMonths >= months_number;
}

type FormData = {
  lease_monthly_income: number;
  lease_maintenance_fee: number;
  lease_start_date: string;
  lease_end_date: string;
  lease_payment_method: string;
  lease_renting_time: number;
  property_zip_code: string;
};

export const IdentificationPage: React.FC = () => {
  const router = useIonRouter();

  const { handleSubmit, setError, control } = useForm<FormData>();

  const onSubmit = async ({
    lease_monthly_income,
    lease_maintenance_fee,
    ...data
  }: any) => {
    const zipCodeResponse = await checkZipCode(data.property_zip_code);

    if (zipCodeResponse.status === 200) {
      const data = await zipCodeResponse.json();

      if (data.state !== "Ciudad de México") {
        return setError("property_zip_code", {
          message:
            "El código postal no pertenece al estado de Ciudad de México.",
        });
      }
    } else {
      return setError("property_zip_code", {
        message: "No es un código postal válido.",
      });
    }

    const response = await applications.leaseContract({
      lease_monthly_income: removeNumericFormat(lease_monthly_income),
      lease_maintenance_fee: removeNumericFormat(lease_maintenance_fee),
      ...data,
    });

    const application = await response.json();

    if (response.status === 200) {
      router.push(`/applications/${application.id}/desired-loan`);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h5">
          <a href="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </a>
          Completa tu perfil
        </h1>
        <p className="mt-1 text-dark-gray text-sm">
          Ingresa tus datos básicos para identificarte correctamente. Esta
          información es necesaria para poder solicitar tu primer
          AdelanttoCash®.
        </p>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="flex justify-between items-center">
          <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h6">
            <a href="/" className="inline-flex items-center"></a>
            Identificación
          </h1>
          <span className="badge badge-primary badge-sm">Paso 1/ 2</span>
        </div>
        <progress
          className="mt-2 mb-4 w-full h-[5px] text-indigo-300 progress"
          value="50"
          max="100"
        ></progress>

        <form className="gap-4 grid" onSubmit={handleSubmit(onSubmit)}>
          <FileInputItem
            name="property_lease_agreement"
            control={control}
            rules={{ required: "Documento obligatorio" }}
            accept="application/pdf"
            label="Frontal INE o Pasaporte"
            description="Cara frontal donde sale la foto"
            helpText="Tipo de archivo permitido JPG (500MB max)"
            helpPicture={frontIdImageUrl}
          />

          <FileInputItem
            name="property_lease_agreement_2"
            control={control}
            rules={{ required: "Documento obligatorio" }}
            accept="application/pdf"
            label="Reverso INE o Pasaporte"
            description="Cara trasera donde está el código de barras"
            helpText="Tipo de archivo permitido JPG (500MB max)"
            helpPicture={backIdImageUrl}
          />
        </form>
      </IonContent>
      <IonFooter>
        <div className="gap-2 grid">
          <button className="btn btn-primary" disabled>
            Continuar
          </button>

          <button className="btn-outline btn btn-secondary">
            Terminar después
          </button>
        </div>
      </IonFooter>
    </IonPage>
  );
};
