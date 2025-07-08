import { useState } from "react";
import { IonContent, IonHeader, IonPage, useIonRouter } from "@ionic/react";
import { useForm } from "react-hook-form";
import { applications } from "../../api";
import { MaterialIcon } from "@adelantto/core";

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
      <IonHeader>
        <h1 className="inline-flex items-center gap-2 text-dark-blue-700 text-h5">
          <a href="/" className="inline-flex items-center">
            <MaterialIcon name="arrow_back" />
          </a>
          Autorización de Buro
        </h1>
        <p className="mt-1 text-dark-gray text-sm">
          Autorización para solicitar reportes de crédito, informes buró y
          reportes de crédito especiales
        </p>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="&_p:mb-4 mb-7 flex flex-col gap-4 px-1">
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
          <button className="btn btn-block btn-primary">Aceptar</button>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default PrivacyPolicy;
