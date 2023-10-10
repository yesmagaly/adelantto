import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Icon from "../components/Icon/Icon";
import IconItem from "../components/IconItem";

const Outlay: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue heading--center mb-10">
          <h3 className="text-3xl mb-4">
            <strong>Desembolso</strong>
          </h3>
          <p>Conoce el desglose de tu servicio</p>
        </div>
        <div className="mb-10">
          <div className="mb-16">
            <IconItem icon="document text-3xl bg-black">
              <p className="underline">
                <strong>Términos </strong> de desembolso
              </p>
            </IconItem>
            <div className="border-full" />
            <IconItem icon="clock text-4xl">
              <p className="underline">
                <strong>Tiempos </strong> interbancarios
              </p>
            </IconItem>
            <div className="border-full" />
            <IconItem icon="sun text-5xl">
              <p className="underline">
                <strong>Claridad </strong> en comisiones
              </p>
            </IconItem>
            <div className="border-full" />
            <IconItem icon="bell text-3xl">
              <p className="underline leading-5">
                <strong>Envío de notificación </strong> con <br /> tracking
              </p>
            </IconItem>
          </div>

          <div className="content">
            <button
              className="button button is-primary mb-16"
              onClick={() => router.push("")}
            >
              Siguiente
            </button>
          </div>

          <div className="border-bottom border-primary-blue" />
        </div>

        <div className="px-5">
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
