import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import { applications } from "../../api";

const ConfirmationData: React.FC = ({ match }) => {
  const router = useIonRouter();

  const {
    handleSubmit,
    register,
    formState: { },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await applications.privacyPolicy(match.params.id, {
      ...data,
      step: 'accept_privacy_policy'
    });

    if (response.status === 200) {
      router.push(`/applications/${match.params.id}/policy-notifications`);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue flex flex-col justify-center mb-10">
          <div className="heading__pager text-right"> Paso 3 de 3</div>
          <h4 className="text-xl">
            Autorización para solicitar reportes de crédito, informes buró y reportes de crédito especiales
          </h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-7 px-9">
            <p className="mb-4">
              Por este conducto autorizo expresamente a <strong>SOLUCIONES INTEGRALES TAFS, SAPI
              DE C.V.</strong> para que por conducto de sus funcionarios facultados lleve a cabo investigaciones
              sobre mi comportamiento crediticio a través de Trans Unión de México, S.A. Sociedad de
              Información Crediticia.
            </p>
            <p className="mb-4">
              Asimismo, declaro que conozco la naturaleza y alcance de las sociedades de información
              crediticia y de la información contenida en los informes buró, reportes de crédito y reporte
              de crédito especial, declaro que conozco la naturaleza y alcance de la información que se
              solicitará, del uso que <strong>SOLUCIONES INTEGRALES TAFS, SAPI DE C.V.</strong> hará de tal
              información y de que ésta podrá realizar consultas periódicas sobre mi historial,
              consintiendo que esta autorización se encuentre vigente por un período de 3 años contados
              a partir de su expedición y en todo caso durante el tiempo que se mantenga la relación
              jurídica.
            </p>
            <p className="mb-4">
              En caso de que la solicitante sea una Persona Moral, declaro bajo protesta de decir verdad
              ser Representante Legal de la empresa mencionada en esta autorización; manifestando que
              a la fecha de firma de la presente autorización los poderes no me han sido revocados,
              limitados, ni modificados en forma alguna.
            </p>
            <p>
              El presente documento, así como los informes buró, reportes de crédito y reporte de crédito
              especial quedarán en custodia de <strong>SOLUCIONES INTEGRALES TAFS, SAPI DE C.V.</strong> y
              los funcionarios autorizados, quienes utilizarán la información únicamente para los fines
              para los cuales fue recabada y se considerará como Confidencial.
            </p>
          </div>
          <div className="flex items-center gap-2 mb-10 px-9">
            <input
              type="radio"
              id="terms_conditions"
              value="1"
              required
              {...register('accept_privacy_policy')}
            />
            <label htmlFor="terms_conditions" className="text-sm font-semibold">
              Acepto términos y condiciones del servicio
            </label>
          </div>
          <div className="text-center mb-7">
            <button className="button is-primary">Siguiente</button>
          </div>
        </form>

        <div className="border-bottom border-primary-blue" />
      </IonContent>
    </IonPage>
  );
};

export default ConfirmationData;
