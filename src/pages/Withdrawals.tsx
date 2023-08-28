import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const Withdrawals: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="content">
          <h3>
            ¿Dónde quieres <br />
            <strong>tu dinero?</strong>
          </h3>
        </div>
        <div className="content">
          <form className="form mb-7">
            <input
              type="text"
              placeholder="Subir carátula de tu estado de cuenta"
            />
          </form>
          <a className="underline">Términos interbancarios</a>
          <p>
            A continuación encontrarás el contrato <br /> relacionado a tu
            solicitud.
          </p>
          <button
            className="button-primary mb-16"
            onClick={() => router.push("/verification-email")}
          >
            Siguiente
          </button>
          <div className="border-bottom" />
        </div>

        <div>
          <h2>
            <strong>
              Términos <br /> interbancarios
            </strong>
          </h2>
          <h5>
            <strong>
              1. Lorem ipsum dolor sit amet,
              <br /> consectetuer adipiscing elit, sed
            </strong>
          </h5>
          <p>
            diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
            erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
            tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
            velit esse molestie consequat, vel illum dolore eu feugiat nulla
            facilisis at vero eros et accumsan et iusto odio dignissim qui
            blandit praesent luptatum zzril delenit augue duis dolore te feugait
            nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing
            elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
            magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
            nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip
            ex ea commodo consequat.
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Withdrawals;
