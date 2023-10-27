import { IonContent, IonPage, useIonRouter } from "@ionic/react";

import arrowLeft from "../assets/icons/arrow-left.svg";
import logoBlack from "../assets/icons/logo-black.svg";
import logoGreen from "../assets/icons/logo-green.svg";

const TermsAndConditions: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const router = useIonRouter();

  const goBack = () => {
    const redirectTo = params.get("redirect") ?? "/login";
    router.push(redirectTo);
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="px-6 py-6">
          <div className="flex justify-between items-center mb-8">
            <button onClick={goBack}>
              <img src={arrowLeft} />
            </button>

            <div>
              <img className="relative" src={logoBlack} />
              <img className="absolute top-8" src={logoGreen} />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-5">
            Términos y condiciones
          </h2>

          <div className="prose-sm">
            <h2>1. Lorem ipsum dolor sit amet, consectetuer</h2>
            <p>
              diam nonummy nibh euismod tincidunt ut laoreet dolore magna
              aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
              exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
              commodo consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons
              ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
              ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
              minim veniam, quis nostrud exerci tation ullamcorper suscipit
              lobortis nisl ut aliquip ex ea commodo consequat. Lorem ipsum
              dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
              nibh euismod tincidunt ut laoreet dolore magna aliquam erat
              volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
              consequat. Duis autem vel eum iriure dolor in hendrerit in
              vulputate velit esse molestie consequat, vel illum dolore eu
              feugiat nulla facilisis at vero eros et accumsan et iusto odio
              dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, cons
              ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
              ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad
              minim veniam, quis nostrud exerci tation ullamcorper suscipit
              lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
            <h2>
              2. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat.
            </p>
            <h2>
              3. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
              erat volutpat.
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TermsAndConditions;
