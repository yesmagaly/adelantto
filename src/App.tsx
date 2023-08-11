import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import VerificationCode from "./pages/VerificationCode";
import VerificationEmail from "./pages/VerificationEmail";
import AdvanceImmediately from "./pages/AdvanceImmediately";
import CreateProfile from "./pages/CreateProfile";
import UploadDocuments from "./pages/UploadDocuments";
import ContractData from "./pages/ContractData";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Tailwind styles */
import "./theme/tailwind.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/verification-code">
          <VerificationCode />
        </Route>
        <Route exact path="/verification-email">
          <VerificationEmail />
        </Route>
        <Route exact path="/advance-immediately">
          <AdvanceImmediately />
        </Route>
        <Route exact path="/create-profile">
          <CreateProfile />
        </Route>
        <Route exact path="/upload-documents">
          <UploadDocuments />
        </Route>
        <Route exact path="/contract-data">
          <ContractData />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
