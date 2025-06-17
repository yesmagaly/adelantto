import {
  IonContent,
  IonPage,
  useIonRouter,
  IonHeader,
  IonFooter,
} from "@ionic/react";

import { useForm } from "react-hook-form";
import { MaterialIcon } from "@adelantto/core";
import FileInputItem from "../../components/FileInputItem";

type T_form = {
  bank_statements: string;
  rfc: string;
};

export const IncomeAndTaxesPage: React.FC = () => {
  const router = useIonRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<T_form>();

  const onSubmit = async (form: T_form) => {
    console.log(form);
  };

  console.log(errors);

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
            Ingresos e impuestos
          </h1>
          <span className="badge badge-primary badge-sm">Paso 2/ 2</span>
        </div>
        <progress
          className="mt-2 mb-4 w-full h-[5px] text-indigo-300 progress"
          value="100"
          max="100"
        ></progress>

        <form className="gap-4 grid" onSubmit={handleSubmit(onSubmit)}>
          <FileInputItem
            name="bank_statements"
            control={control}
            rules={{ required: "Documento obligatorio" }}
            accept="application/pdf"
            label="Comprobante de ingresos"
            description="Últimos 3 meses (Nómina o bancarios)"
            helpText="Tipo de archivo permitido PDF (500MB max)"
          />

          <FileInputItem
            name="rfc"
            control={control}
            rules={{ required: "Documento obligatorio" }}
            accept="application/pdf"
            label="RFC"
            description="Constancia de situación fiscal con antigüedad no mayor a 3 meses"
            helpText="Tipo de archivo permitido PDF (500MB max)"
          />
        </form>
      </IonContent>
      <IonFooter className="ion-padding">
        <div className="gap-2 grid">
          <button
            className="btn btn-primary"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Continuar
          </button>

          <a className="btn-outline btn" href="/profile">
            Terminar después
          </a>
        </div>
      </IonFooter>
    </IonPage>
  );
};
