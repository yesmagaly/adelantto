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

import { MaterialIcon } from "@adelantto/core";
import FileInputItem from "../../components/FileInputItem";

export function atLeastThreeMonths(end_date, months_number) {
  const date1 = new Date();
  const date2 = new Date(end_date);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const diffMonths = diffDays / 30.44;

  return diffMonths >= months_number;
}

type T_form = {
  front_id: string;
  back_id: string;
};

export const IdentificationPage: React.FC = () => {
  const router = useIonRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<T_form>();

  const onSubmit = async (form: T_form) => {
    console.log(form);

    /* router.push(`/applications/${application.id}/desired-loan`); */
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
            name="front_id"
            control={control}
            rules={{ required: "Documento obligatorio" }}
            accept="application/pdf"
            label="Frontal INE o Pasaporte"
            description="Cara frontal donde sale la foto"
            helpText="Tipo de archivo permitido JPG (500MB max)"
            helpPicture={frontIdImageUrl}
          />

          <FileInputItem
            name="back_id"
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
