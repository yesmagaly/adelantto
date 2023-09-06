import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Icon from "../components/Icon/Icon";

const Outlay: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue heading--center mb-10">
          <h3 className="text-[30px] mb-7">
            <strong>Desembolso</strong>
          </h3>
          <p>Conoce el desglose de tu servicio</p>
        </div>
        <div className="content">
          <div className="mb-16">
            <p className="underline text-[16px] mb-8 mr-8">
              <Icon name="document" className="mr-12 text-3xl bg-black" />
              <strong>términos</strong> de desembolso
            </p>
            <div className="border-full" />
            <p className="underline text-[16px] mb-8 mr-10">
              <Icon name="clock" className="mr-14 text-4xl bg-black" />
              <strong>Tiempos </strong> interbancarios
            </p>
            <div className="border-full" />
            <p className="underline text-[16px] mb-8 mr-12">
              <Icon name="sun" className="mr-12 text-5xl bg-black" />
              <strong>Claridad </strong> en comisiones
            </p>
            <div className="border-full" />
            <p className="underline text-[16px] mb-8 mr-6">
              <Icon name="bell" className="mr-12 text-3xl bg-black" />
              <strong>Envío de notificación </strong> con <br /> tracking
            </p>
            <div className="border-full" />
          </div>

          <div>
            <button
              className="button button-primary mb-16"
              onClick={() => router.push("")}
            >
              Siguiente
            </button>
          </div>

          <div className="border-bottom border-primary-blue" />
        </div>

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
