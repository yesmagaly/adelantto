import {
  IonContent,
  IonHeader,
  IonPage,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import "./Home.css";

import arrowLeft from "../assets/icons/arrow-left.svg";
import logoBlack from "../assets/icons/logo-black.svg";
import logoGreen from "../assets/icons/logo-green.svg";

const TermsAndConditions: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="px-6 pt-12">
          <div className="flex justify-between mb-6">
            <div>
              <img src={arrowLeft} />
            </div>
            <div>
              <img className="relative" src={logoBlack} />
              <img className="absolute top-8" src={logoGreen} />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-5">
            <span>Términos</span>
            <br /> y condiciones
          </h2>
          <div>
            <h5 className="font-bold leading-4 mb-3 text-sm">
              1. Lorem ipsum dolor sit amet, consectetuer adipicing elit,sed
            </h5>
            <p className="text-xs leading-[13px] mb-4">
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
            <h5 className="font-bold leading-4 mb-3 text-sm">
              2. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
            </h5>
            <p className="leading-[13px] text-xs">
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
