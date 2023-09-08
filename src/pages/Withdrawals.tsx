import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Lottie from "react-lottie-player";

import walletAnimation from "../assets/animations/wallet.json";
import lensAnimation from "../assets/animations/lens.json";

const Withdrawals: React.FC = () => {
  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="heading heading--blue text-center heading--compact ">
          <h3 className="text-[30px]">
            ¿Dónde quieres <br />
            <strong>tu dinero?</strong>
          </h3>
        </div>
        <div className="content">
          <Lottie
            animationData={walletAnimation}
            style={{ width: 251, height: 251 }}
            loop
            play
          />
          <form className="form mb-7">
            <input
              type="text"
              placeholder="Subir carátula de tu estado de cuenta"
            />
          </form>
          <div className="mb-16">
            <a className="underline leading-10">Términos interbancarios</a>
            <p>
              A continuación encontrarás el contrato <br /> relacionado a tu
              solicitud.
            </p>
          </div>

          <div className="mb-7">
            <button
              className="button button-primary mb-16"
              onClick={() => router.push("/verification-email")}
            >
              Siguiente
            </button>
          </div>

          <div className="border-bottom border-primary-blue" />
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

        <div className="content">
          <Lottie
            animationData={lensAnimation}
            style={{ width: 219, height: 219 }}
            loop
            play
          />
          <p className="text-[16px] mb-6 leading-5">
            En este punto estamos validando <br />
            el convenio con tu entidad bancaria,
            <br />
            para cualquier disposición de <br /> efectivo necesaria.
          </p>
          <button
            className="button button-secondary mb-8"
            onClick={() => router.push("")}
          >
            Siguiente
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Withdrawals;
