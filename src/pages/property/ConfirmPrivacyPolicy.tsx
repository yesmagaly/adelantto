import { useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import { applications } from "../../api";

import * as Modal from "../../components/modal";

const ConfirmPrivacyPolicy: React.FC = ({ match }) => {
  const router = useIonRouter();
  const [error, setError] = useState({ message: null });
  const applicationId = match.params.id;

  const {
    handleSubmit,
    register,
    formState: {},
  } = useForm();

  const onSubmit = async (data: {} | undefined) => {
    const response = await applications.confirmPrivacyPolicy(
      applicationId,
      data
    );

    if (response.status === 200) {
      router.push(`/applications/${applicationId}/identity-check`);
    } else {
      const error = await response.json();

      if (error.type === 'BUREAU_SCORE_TOO_LOW') {
        router.push(`/applications/${applicationId}/fail-buro-score`);
      } else {
        setError(error);
      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue flex flex-col justify-center mb-10">
          <div className="heading__pager text-right"> Paso 3 de 3</div>
          <h4 className="text-2xl">
            Autorización para solicitar reportes de crédito, informes buró y
            reportes de crédito especiales
          </h4>
        </div>

        <div className="content">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mx-6">
              <label htmlFor="code">Código de confirmación</label>
              <input
                type="numeric"
                maxLength={6}
                minLength={6}
                {...register("code", { required: true })}
                className="mb-4"
              />

              {error.message && (
                <p className="text-orange-500 font-medium">{error.message}</p>
              )}
            </div>


            <p className="text-balance mb-8">
              Al confirmar el código SMS, acepto las políticas de privacidad de
              la aplicación.
            </p>

            <div className="form-actions">
              <button className="button is-primary">Confirmar</button>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ConfirmPrivacyPolicy;
