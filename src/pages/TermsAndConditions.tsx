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

const TermsAndConditions: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div>
          <strong>
            Términos
            <br /> y condiciones
          </strong>
        </div>
        <h5>1. Lorem ipsum dolor sit amet, consectetuer adipicing elit,sed</h5>
        <p>
          diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
          erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
          tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
          consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate
          velit esse molestie consequat, vel illum dolore eu feugiat nulla
          facilisis at vero eros et accumsan et iusto odio dignissim qui blandit
          praesent luptatum zzril delenit augue duis dolore te feugait nulla
          facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit,
          sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
          aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
          exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
          commodo consequat. Lorem ipsum dolor sit amet, consectetuer adipiscing
          elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
          aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
          exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
          commodo consequat. Duis autem vel eum iriure dolor in hendrerit in
          vulputate velit esse molestie consequat, vel illum dolore eu feugiat
          nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
          blandit praesent luptatum zzril delenit augue duis dolore te feugait
          nulla facilisi. Lorem ipsum dolor sit amet, cons ectetuer adipiscing
          elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
          aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud
          exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
          commodo consequat.
        </p>
        <h5>
          2. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
        </h5>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat.
        </p>
      </IonContent>
    </IonPage>
  );
};

export default TermsAndConditions;
