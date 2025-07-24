import {
  IonContent,
  IonPage,
  useIonRouter,
  IonHeader,
  IonFooter,
} from "@ionic/react";

import { useForm } from "react-hook-form";
import { MaterialIcon } from "@adelantto/core";
import { IncodeSelfieInput } from "@adelantto/incode";
import { applications } from "../../api";
import { Link } from "react-router-dom";
import { useLazyGetUserQuery, useUpdateUserMutation } from "@adelantto/store";
import { handleServerErrors, t } from "@adelantto/utils";

type T_form = {
  selfie?: {
    format: string;
    base64String: string;
  };
};

export const BiometricValidationPage: React.FC = () => {
  const router = useIonRouter();
  const [mutation] = useUpdateUserMutation();
  const [getUserQuery] = useLazyGetUserQuery();

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<T_form>({
    defaultValues: async () => {
      try {
        return await getUserQuery().unwrap();
      } catch {
        return {};
      }
    },
  });

  const onSubmit = async (form: T_form) => {
    // const processData = await api.processFace({ session });
    // if (processData.confidence === 0) {
    //   return setError("selfie", {
    //     message:
    //       "La foto de su selfie no coincide con la imagen del documento de identidad.",
    //   });
    // }

    // await api.finishStatus({ session });

    // await applications.identityCheck(match.params.id, {
    //   identity_checked: true,
    //   interviewId: session.interviewId,
    // });

    try {
      await mutation(form).unwrap();
      router.push("/profile/income-and-taxes");
    } catch (error: any) {
      const errors = error?.data?.errors;

      if (errors) {
        handleServerErrors<T_form>(["selfie"], errors).forEach(
          ([field, errorOption]) => setError(field, errorOption)
        );
      } else {
        setError("root", {
          message: t("Something went wrong"),
          type: "server",
        });
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h5">
          <Link to="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </Link>
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
            Validación biométrica
          </h1>
          <span className="badge badge-primary badge-sm">Paso 2/ 3</span>
        </div>
        <progress
          className="mt-2 mb-4 w-full h-[5px] text-indigo-300 progress"
          value="66"
          max="100"
        ></progress>

        <form className="gap-4 grid" onSubmit={handleSubmit(onSubmit)}>
          <IncodeSelfieInput
            name="selfie"
            control={control}
            rules={{
              required: "Imagen requerida",
            }}
            accept="image/jpg"
            label="Selfie"
            description="Manten una expresión neutra, busca una luz equilibrada, retire
            gafas, gorra o sombrero."
          />
        </form>
      </IonContent>
      <IonFooter className="ion-padding">
        <div className="gap-2 grid">
          <button
            disabled={isSubmitting}
            className="btn btn-primary"
            onClick={() => handleSubmit(onSubmit)()}
          >
            Continuar
          </button>

          <Link className="btn-outline btn" to="/profile">
            Terminar después
          </Link>
        </div>
      </IonFooter>
    </IonPage>
  );
};
