import { useState } from "react";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import { applications } from "../../api";

import * as Modal from "../../components/modal";

const PrivacyPolicy: React.FC = ({ match }) => {
  const router = useIonRouter();
  const [isOpen, setOpen] = useState(false);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    const response = await applications.privacyPolicy(match.params.id, {
      step: "confirm_privacy_policy",
    });

    if (response.status === 200) {
      setOpen(true);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue mb-10 flex flex-col justify-center">
          <div className="heading__pager text-right"> Paso 3 de 3</div>
          <h4 className="text-2xl">
            Autorización para solicitar reportes de crédito, informes buró y
            reportes de crédito especiales
          </h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="&_p:mb-4 mb-7 flex flex-col gap-4 px-9">
            <p>
              Por este conducto autorizo expresamente a{" "}
              <strong>SOLUCIONES INTEGRALES TAFS, SAPI DE C.V.</strong> para que
              por conducto de sus funcionarios facultados lleve a cabo
              investigaciones sobre mi comportamiento crediticio a través de
              Trans Unión de México, S.A. Sociedad de Información Crediticia.
            </p>
            <p>
              Asimismo, declaro que conozco la naturaleza y alcance de las
              sociedades de información crediticia y de la información contenida
              en los informes buró, reportes de crédito y reporte de crédito
              especial, declaro que conozco la naturaleza y alcance de la
              información que se solicitará, del uso que{" "}
              <strong>SOLUCIONES INTEGRALES TAFS, SAPI DE C.V.</strong> hará de
              tal información y de que ésta podrá realizar consultas periódicas
              sobre mi historial, consintiendo que esta autorización se
              encuentre vigente por un período de 3 años contados a partir de su
              expedición y en todo caso durante el tiempo que se mantenga la
              relación jurídica.
            </p>
            <p>
              En caso de que la solicitante sea una Persona Moral, declaro bajo
              protesta de decir verdad ser Representante Legal de la empresa
              mencionada en esta autorización; manifestando que a la fecha de
              firma de la presente autorización los poderes no me han sido
              revocados, limitados, ni modificados en forma alguna.
            </p>
            <p>
              El presente documento, así como los informes buró, reportes de
              crédito y reporte de crédito especial quedarán en custodia de{" "}
              <strong>SOLUCIONES INTEGRALES TAFS, SAPI DE C.V.</strong> y los
              funcionarios autorizados, quienes utilizarán la información
              únicamente para los fines para los cuales fue recabada y se
              considerará como Confidencial.
            </p>
          </div>

          <div className="mb-7 text-center">
            <button className="button is-primary">Aceptar</button>
          </div>
        </form>

        <Modal.Root isOpen={isOpen}>
          <Modal.Body>
            <p>
              Se ha enviado un SMS con el código de confirmación a su número de
              teléfono. Por favor, revise su bandeja de entrada y complete el
              proceso de verificación.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="button"
              onClick={() =>
                router.push(
                  `/applications/${match.params.id}/confirm-privacy-policy`
                )
              }
            >
              Continuar
            </button>
          </Modal.Footer>
        </Modal.Root>
      </IonContent>
    </IonPage>
  );
};

export default PrivacyPolicy;
