import {
  IonContent,
  IonPage,
  useIonRouter,
  IonHeader,
  IonFooter,
} from "@ionic/react";
import { useForm } from "react-hook-form";

import { checkZipCode } from "../../api";
import { applications } from "../../api";
import { MaterialIcon } from "@adelantto/core";
import FileInputItem from "../../components/FileInputItem";
import { Link } from "react-router-dom";

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

export const PropertyValidationPage: React.FC = () => {
  const router = useIonRouter();

  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting },
    control,
  } = useForm<FormData>();

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
          <Link to="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </Link>
          Solicita tu AdelanttoCash®
        </h1>
        <p className="mt-1 text-dark-gray text-sm">
          Con tu información y documentos listos, indícanos el monto de adelanto
          que te interesa y comienza formalmente tu solicitud.
        </p>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="flex justify-between items-center">
          <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h6">
            <Link to="/" className="inline-flex items-center"></Link>
            Validación de propiedad
          </h1>
          <span className="badge badge-primary badge-sm">Paso 2/ 2</span>
        </div>
        <progress
          className="mt-2 mb-4 w-full h-[5px] text-indigo-300 progress"
          value="50"
          max="100"
        ></progress>

        <form className="gap-4 grid" onSubmit={handleSubmit(onSubmit)}>
          <div className="control">
            <label htmlFor="real-folio" className="control-label">
              Folio Real
            </label>
            <input
              className="w-full input"
              type="number"
              placeholder="123456"
              id="real-folio"
              required
              {...register("real-folio")}
            />
          </div>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline stroke-current w-5 h-5 shrink-0"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <p className="ml-1 control-label">
              El número de matrícula inmobiliaria aparece en el certificado de
              tradición y libertad del predio, así como en la escritura o
              documento de propiedad del mismo.
            </p>
          </div>
          <div className="control">
            <label htmlFor="property-zip-code" className="control-label">
              Código postal del inmueble
            </label>
            <input
              className="w-full input"
              type="number"
              placeholder="123456"
              id="property-zip-code"
              required
              {...register("property-zip-code")}
            />
          </div>
          <FileInputItem
            name="property_lease_agreement"
            control={control}
            rules={{ required: "Documento obligatorio" }}
            accept="application/pdf"
            label="Contrato de arrendamiento"
            description="Firmado por ambas partes"
            helpText="Tipo de archivo permitido PDF (500MB max)"
          />

          <FileInputItem
            name="property_lease_agreement_2"
            control={control}
            rules={{ required: "Documento obligatorio" }}
            accept="application/pdf"
            label="Recibo del último predial"
          />
        </form>
      </IonContent>
      <IonFooter className="ion-padding">
        <div className="gap-2 grid">
          <button className="btn btn-primary" disabled={isSubmitting}>
            Continuar
          </button>

          <button className="btn-outline btn btn-secondary" disabled={isSubmitting}>
            Guardar como borrador
          </button>
        </div>
      </IonFooter>
    </IonPage>
  );
};
