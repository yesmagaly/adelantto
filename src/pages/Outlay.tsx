import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import Icon from "../components/Icon/Icon";
import IconItem from "../components/IconItem";
import * as Page from "../components/page";

import * as Modal from "../components/modal";
import { useState } from "react";

const Outlay: React.FC = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showFrames, setShowFrames] = useState(false);
  const [showComissions, setShowComissions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const router = useIonRouter();
  return (
    <IonPage>
      <IonContent fullscreen>
        <Page.Root>
          <Page.Header>
            <div className="heading heading--blue heading--center">
              <h1 className="heading-3">
                <strong>Desembolso</strong>
              </h1>
              <p>Conoce el desglose de tu servicio</p>
            </div>
          </Page.Header>
          <Page.Body>
            <div className="mb-10">
              <div className="mb-16">
                <IconItem icon="document text-3xl bg-black">
                  <p onClick={() => setShowTerms(true)} className="underline">
                    <strong>Términos </strong> de desembolso
                  </p>
                </IconItem>
                <div className="border-full" />
                <IconItem icon="clock text-4xl">
                  <p onClick={() => setShowFrames(true)} className="underline">
                    <strong>Tiempos </strong> interbancarios
                  </p>
                </IconItem>
                <div className="border-full" />
                <IconItem icon="sun text-5xl">
                  <p
                    onClick={() => setShowComissions(true)}
                    className="underline"
                  >
                    <strong>Claridad </strong> en comisiones
                  </p>
                </IconItem>
                <div className="border-full" />
                <IconItem icon="bell text-3xl">
                  <p
                    onClick={() => setShowNotifications(true)}
                    className="underline leading-5"
                  >
                    <strong>Envío de notificación </strong> con <br /> tracking
                  </p>
                </IconItem>
              </div>

              <div className="content"></div>
            </div>
          </Page.Body>
          <Page.Footer>
            <button
              className="button is-primary mb-16"
              onClick={() => router.push("/correct-deposit")}
            >
              Siguiente
            </button>
            <div className="border-bottom border-primary-blue" />
          </Page.Footer>
        </Page.Root>

        <Modal.Root isOpen={showTerms}>
          <Modal.Header>
            <h3>
              <strong>
                Términos <br /> de desembolso
              </strong>
            </h3>
          </Modal.Header>
          <Modal.Body>
            <h6>
              <strong>
                1. Lorem ipsum dolor sit amet,
                <br /> consectetuer adipiscing elit, sed
              </strong>
            </h6>
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
              lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => setShowTerms(false)}>cerrar</button>
          </Modal.Footer>
        </Modal.Root>
        <div className="px-5"></div>

        <Modal.Root isOpen={showFrames}>
          <Modal.Header>
            {" "}
            <h3>
              <strong>
                Tiempos <br /> interbancarios
              </strong>
            </h3>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <h6>
              <strong>
                1. Lorem ipsum dolor sit amet,
                <br /> consectetuer adipiscing elit, sed
              </strong>
            </h6>
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
              lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => setShowFrames(false)}>cerrar</button>
          </Modal.Footer>
        </Modal.Root>
        <div></div>

        <Modal.Root isOpen={showComissions}>
          <Modal.Header>
            <h3>
              <strong>
                Claridad en <br /> comisiones
              </strong>
            </h3>
          </Modal.Header>
          <Modal.Body>
            <h6>
              <strong>
                1. Lorem ipsum dolor sit amet,
                <br /> consectetuer adipiscing elit, sed
              </strong>
            </h6>
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
              lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => setShowComissions(false)}>cerrar</button>
          </Modal.Footer>
        </Modal.Root>
        <div></div>

        <Modal.Root isOpen={showNotifications}>
          <Modal.Header>
            <h3>
              <strong>
                Envío de <br /> notificación <br /> con tracking
              </strong>
            </h3>
          </Modal.Header>
          <Modal.Body>
            <h6>
              <strong>
                1. Lorem ipsum dolor sit amet,
                <br /> consectetuer adipiscing elit, sed
              </strong>
            </h6>
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
              lobortis nisl ut aliquip ex ea commodo consequat.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => setShowNotifications(false)}>cerrar</button>
          </Modal.Footer>
        </Modal.Root>
        <div></div>
      </IonContent>
    </IonPage>
  );
};

export default Outlay;
