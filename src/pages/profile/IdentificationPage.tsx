import {
  IonContent,
  IonPage,
  useIonRouter,
  IonHeader,
  IonFooter,
} from "@ionic/react";
import { useForm } from "react-hook-form";

import { MaterialIcon } from "@adelantto/core";
import { useUpdateUserMutation, useLazyGetUserQuery } from "@adelantto/store";

import frontIdImageUrl from "./assets/images/front-id.png";
import backIdImageUrl from "./assets/images/back-id.png";
import FileInputItem from "../../components/FileInputItem";

type T_form = {
  back_id?: File;
  front_id?: File;
};

export const IdentificationPage: React.FC = () => {
  const router = useIonRouter();
  const [mutation, { isLoading }] = useUpdateUserMutation();
  const [trigger] = useLazyGetUserQuery();
  const { handleSubmit, control } = useForm<T_form>({
    defaultValues: async () => {
      try {
        return await trigger().unwrap();
      } catch (error) {
        return {};
      }
    },
  });

  const onSubmit = async (form: T_form) => {
    try {
      await mutation(form).unwrap();
      router.push('/profile/income-and-taxes');
    } catch (error) {
      console.log(error);
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

        <form
          id="form"
          className="gap-4 grid"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FileInputItem
            name="front_document"
            control={control}
            rules={{ required: "Imagen requerida" }}
            accept="image/jpg"
            label="Frontal INE o Pasaporte"
            description="Cara frontal donde sale la foto"
            helpText="Tipo de archivo permitido JPG (500MB max)"
            helpPicture={frontIdImageUrl}
          />

          <FileInputItem
            name="back_document"
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
          <button className="btn btn-primary" type="submit" form="form" disabled={isLoading}>
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
