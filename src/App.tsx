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
import RentAdvance from "./pages/RentAdvance";
import Passport from "./pages/Passport";
import TermsAndConditions from "./pages/TermsAndConditions";
import Bug from "./pages/Bug";
import Welcome from "./pages/Welcome";
import Search from "./pages/Search";
import PreOffer from "./pages/PreOffer";
import BiometricValidation from "./pages/BiometricValidation";
import DataValidation from "./pages/DataValidation";
import ValidationError from "./pages/ValidationError";
import CorrectData from "./pages/CorrectData";
import Withdrawals from "./pages/Withdrawals";
import Signature from "./pages/Signature";
import Outlay from "./pages/Outlay";
import UploadPictures from "./pages/UploadPictures";
import ConfirmationData from "./pages/ConfirmationData";
import CorrectDeposit from "./pages/CorrectDeposit";
import FullAdvance from "./pages/FullAdvance";
import Summary from "./pages/Summary";
import Profile from "./pages/Profile";

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
        <Route exact path="/rent-advance">
          <RentAdvance />
        </Route>
        <Route exact path="/passport">
          <Passport />
        </Route>
        <Route exact path="/terms-and-conditions">
          <TermsAndConditions />
        </Route>
        <Route exact path="/bug">
          <Bug />
        </Route>
        <Route exact path="/welcome">
          <Welcome />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/pre-offer">
          <PreOffer />
        </Route>
        <Route exact path="/biometric-validation">
          <BiometricValidation />
        </Route>
        <Route exact path="/data-validation">
          <DataValidation />
        </Route>
        <Route exact path="/validation-error">
          <ValidationError />
        </Route>
        <Route exact path="/correct-data">
          <CorrectData />
        </Route>
        <Route exact path="/withdrawals">
          <Withdrawals />
        </Route>
        <Route exact path="/signature">
          <Signature />
        </Route>
        <Route exact path="/outlay">
          <Outlay />
        </Route>
        <Route exact path="/upload-pictures">
          <UploadPictures />
        </Route>
        <Route exact path="/confirmation-data">
          <ConfirmationData />
        </Route>
        <Route exact path="/correct-deposit">
          <CorrectDeposit />
        </Route>
        <Route exact path="/full-advance">
          <FullAdvance />
        </Route>
        <Route exact path="/summary">
          <Summary />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
