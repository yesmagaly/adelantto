import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import Lottie from "react-lottie-player";

import searchHomeAnimation from "../assets/animations/search-home.json";
import * as Page from '../components/page'
import { applications } from "../api";

const DataValidation: React.FC = ({ match }) => {
  const router = useIonRouter();
  const {
    handleSubmit,
    register,
    formState: { },
  } = useForm();


  const onSubmit = async (data) => {
    const response = await applications.policyNotifications(match.params.id, {
      ...data,
      step: 'accept_policy_notifications'
    });

    if (response.status === 200) {
      router.push(`/dashboard`);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Page.Root>
            <Page.Header className="px-6 text-center">
              <Lottie
                animationData={searchHomeAnimation}
                style={{ width: 220, height: 220, display: 'inline-block' }}
                loop
                play
              />
              <h3 className="font-bold text-3xl mb-4">¡Ya casi!</h3>

            </Page.Header>
            <Page.Body className="px-16">
              <p className="text-center text-base leading-tight mb-8">
                Por último validaremos los datos de tu propiedad.
                Te enviaremos un correo electrónico en las próximas <strong>
                  72 horas con el resultado de la validación.</strong>
              </p>
              <div>
                <div className="flex items-center mb-6">
                  <input {...register('accept_buro_policy')} defaultValue="1" type="checkbox" id="buro_policy" className="w-5 h-5 shrink-0" />
                  <label htmlFor="buro_policy" className="main ml-4">
                    Acepto que “S.A. de C.V.” consulte mi buró de crédito
                  </label>
                </div>
                <div className="flex items-center mb-6">
                  <input {...register('accept_sms_notifications')} defaultValue="1" type="checkbox" id="sms_notification" className="w-5 h-5 shrink-0" />
                  <label htmlFor="sms_notification" className="ml-4">
                    SMS
                  </label>
                </div>
              </div>
            </Page.Body>
            <Page.Footer className="text-center">
              <h4 className="font-bold text-xl mb-10">¡Hasta pronto!</h4>

              <button className="button is-primary">
                Finalizar
              </button>
            </Page.Footer>
          </Page.Root>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default DataValidation;
