import { IonContent, IonPage, IonButton } from "@ionic/react";

const PreOffer: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue heading--center heading--compact">
          <h2 className="text-[30px]">
            Pre<strong>-Oferta Adelantto</strong>
          </h2>
        </div>
        <div className="content">
          <form className="form">
            <div className="bg-white py-3 shadow-xl mb-5">
              <div className="mb-7 leading-5">
                <p>
                  <strong>
                    Seleccionaste 6 meses,
                    <br />
                  </strong>
                  a continuación te presentamos <br /> el resumen de nuestra
                  oferta.
                </p>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="$ 30,000.00 MXN 
                El total de los meses de tu renta"
                />
                <input
                  type="text"
                  placeholder="$ 28,000.00 MXN
                El monto que recibirás"
                />
                <input
                  type="text"
                  placeholder="$ 2,000.00 MXN
                Costo de nuestro servicio y seguro"
                />
              </div>
            </div>
            <div className="bg-white py-5 shadow-xl w-full">
              <p className="text-center font-bold mb-4">
                ¿Te interesa ver el resumen <br /> para otros meses?
              </p>
              <div>
                <input type="text" placeholder="6" size="4" />
              </div>

              <button className="button button-secondary mb-7">
                Iniciar proceso de Validación <br />
                de documentos
              </button>

              <p className="text-xs leading-4">
                Al aceptar estas aprovando el uso de tus datos <br />
                para validaciones de identificación.{" "}
                <a className="underline">Ver detalle</a>
              </p>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PreOffer;
