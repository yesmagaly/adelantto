import {
  IonContent,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  useIonRouter,
} from "@ionic/react";

const Outlay: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <h3>
            <strong>Desembolso</strong>
          </h3>
          <p>Conoce el desglose de tu servicio</p>
        </div>
        <IonList>
          <IonItem>
            <IonLabel>
              <p>
                <strong>términos</strong> de desembolso
              </p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <p>
                <strong>Tiempos </strong> interbancarios
              </p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <p>
                <strong>Claridad </strong> en comisiones
              </p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <p>
                <strong>Envío de notificación </strong> con <br /> tracking
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
        <button
          className="button-primary mb-16"
          onClick={() => router.push("")}
        >
          Siguiente
        </button>
        <div className="border-bottom" />

        <div>
          <h3>
            <strong>
              Términos <br /> de desembolso
            </strong>
          </h3>
          <h6>
            <strong>
              1. Lorem ipsum dolor sit amet,
              <br /> consectetuer adipiscing elit, sed
            </strong>
          </h6>
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
        <div>
          <h3>
            <strong>
              Tiempos <br /> interbancarios
            </strong>
          </h3>
          <h6>
            <strong>
              1. Lorem ipsum dolor sit amet,
              <br /> consectetuer adipiscing elit, sed
            </strong>
          </h6>
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
        <div>
          <h3>
            <strong>
              Claridad en <br /> comisiones
            </strong>
          </h3>
          <h6>
            <strong>
              1. Lorem ipsum dolor sit amet,
              <br /> consectetuer adipiscing elit, sed
            </strong>
          </h6>
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
        <div>
          <h3>
            <strong>
              Envío de <br /> notificación <br /> con tracking
            </strong>
          </h3>
          <h6>
            <strong>
              1. Lorem ipsum dolor sit amet,
              <br /> consectetuer adipiscing elit, sed
            </strong>
          </h6>
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

export default Outlay;
