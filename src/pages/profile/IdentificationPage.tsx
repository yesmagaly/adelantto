import {
  IonContent,
  IonPage,
  useIonRouter,
  IonHeader,
  IonFooter,
} from "@ionic/react";
import { useForm } from "react-hook-form";

import { MaterialIcon } from "@adelantto/core";
import {
  INCODE_FRONT_ID_ERRORS,
  IncodeFileInput,
  useIncode,
  api,
} from "@adelantto/incode";

import frontIdImageUrl from "./assets/images/front-id.png";
import backIdImageUrl from "./assets/images/back-id.png";
import { getBase64String } from "@adelantto/utils";

type T_form = {
  back_id: File;
  front_id: File;
};

export const IdentificationPage: React.FC = () => {
  const router = useIonRouter();
  const { session, error } = useIncode();
  const { handleSubmit, control, setError } = useForm<T_form>();

  const onSubmit = async (form: T_form) => {
    if (session) {
      const frontData = await api.addFrontId({
        session,
        body: { base64Image: await getBase64String(form.front_id) },
      });

      if (frontData.failReason) {
        return setError("front_id", {
          message: INCODE_FRONT_ID_ERRORS[frontData.failReason],
        });
      }

      if (!frontData.skipBackIdCapture) {
        const backData = await api.addBackId({
          session,
          body: { base64Image: await getBase64String(form.back_id) },
        });

        if (backData.failReason) {
          return setError("back_id", {
            message: INCODE_FRONT_ID_ERRORS[backData.failReason],
          });
        }
      }

      const processData = await api.processId({ session });

      if (processData.success) {
        router.push(`/profile/biometric-validation`);
      }
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
            Identificación
          </h1>
          <span className="badge badge-primary badge-sm">Paso 1/ 3</span>
        </div>
        <progress
          className="mt-2 mb-4 w-full h-[5px] text-indigo-300 progress"
          value="33"
          max="100"
        ></progress>

        <form className="gap-4 grid" onSubmit={handleSubmit(onSubmit)}>
          <IncodeFileInput
            name="front_id"
            control={control}
            rules={{ required: "Imagen requerida" }}
            accept="image/jpg"
            label="Frontal INE o Pasaporte"
            description="Cara frontal donde sale la foto"
            helpText="Tipo de archivo permitido JPG (500MB max)"
            helpPicture={frontIdImageUrl}
          />

          <IncodeFileInput
            name="back_id"
            control={control}
            rules={{ required: "Imagen requerida" }}
            accept="image/jpg"
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
