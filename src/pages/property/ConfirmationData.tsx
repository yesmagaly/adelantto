import { IonContent, IonPage, IonCheckbox } from "@ionic/react";

const ConfirmationData: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue flex flex-col justify-center mb-10">
          <div className="heading__pager text-right"> Paso 3 de 3</div>
          <h4 className="text-xl">
            <strong>
              Confirmación de datos <br />y solicitud de consulta <br />
            </strong>
            Reporte de Crédito
          </h4>
        </div>
        <div className="mb-7 px-9">
          <p className="mb-7">
            Autorizo expresamente a Adelantto, para que lleve a cabo
            investigaciones sobre el comportamiento crediticio de mi persona,
            con las Sociedades de Información Crediticia: Bla, bla, bla, S.A.
            y/o Trans Banco de México, S.A., durante los siguientes tres años o
            durante el tiempo que mantenga relación jurídica con Adelantto.
          </p>
          <p className="mb-7">
            Así mismo, declaro que conozco la naturaleza y alcance de la
            información que se solicitará, del uso que Adelantto hará de tal
            información y de que ésta podrá realizar consultas periódicas del
            historial crediticio de mi persona, durante los siguientes tres años
            o durante el tiempo que mantengamos relación jurídica.
          </p>
          <p>
            De igual manera corroboró que toda la información aquí expresada es
            verídica y esta a dispocisión y consulta para fines prácticos de
            Adelantto y sus servicios.
          </p>
        </div>
        <div className="font-bold text-center mb-7">
          <IonCheckbox labelPlacement="end">
            Acepto términos y condiciones del servicio
          </IonCheckbox>
        </div>
        <div className="text-center mb-7">
          <button className="bg-primary-green font-semibold py-2 px-11 rounded text-white">
            Siguiente
          </button>
        </div>

        <div className="border-bottom border-primary-blue" />
      </IonContent>
    </IonPage>
  );
};

export default ConfirmationData;
