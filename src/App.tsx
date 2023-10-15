import { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonLoading,
  IonSplitPane,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerificationCode from "./pages/auth/VerificationCode";
import VerificationEmail from "./pages/auth/VerificationEmail";
import AdvanceImmediately from "./pages/AdvanceImmediately";
import CreateProfile from "./pages/CreateProfile";

import UploadDocuments from "./pages/property/UploadDocuments";
import UploadPictures from "./pages/property/UploadPictures";
import ConfirmationData from "./pages/property/ConfirmationData";

import LeaseContract from "./pages/property/LeaseContract";
import DesiredLoan from "./pages/property/DesiredLoan";
import Passport from "./pages/identity/Passport";
import TermsAndConditions from "./pages/TermsAndConditions";
import Bug from "./pages/auth/Bug";
import UpdateTemporaryPassword from "./pages/auth/UpdateTemporaryPassword";
import Welcome from "./pages/Welcome";
import Search from "./pages/Search";
import PreOffer from "./pages/property/PreOffer";
import BiometricValidation from "./pages/identity/BiometricValidation";
import DataValidation from "./pages/DataValidation";
import ValidationError from "./pages/ValidationError";
import CorrectData from "./pages/CorrectData";
import Withdrawals from "./pages/Withdrawals";
import Signature from "./pages/Signature";
import Outlay from "./pages/Outlay";
import CorrectDeposit from "./pages/CorrectDeposit";
import FullAdvance from "./pages/FullAdvance";
import Summary from "./pages/Summary";
import Profile from "./pages/Profile";
import SuccesfulTransaction from "./pages/SuccesfulTransaction";
import Dashboard from "./pages/home/Dashboard";
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
import { useAuth } from "./pages/auth/authContext";

setupIonicReact();

const App: React.FC = () => {
  const { authInfo, initialize } = useAuth()!;

  useEffect(() => {
    !authInfo?.initialized && (async () => await initialize())();
  }, [authInfo, initialize]);


  if (!authInfo || !authInfo.initialized) {
    return <IonApp>Loading ...</IonApp>;
  } else {
    return (
      <IonApp>
        <>
          {authInfo?.loggedIn === true ? (
            <IonReactRouter>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/welcome" component={Welcome} />
              <Route exact path="/update-temporary-password"
                render={() => authInfo.user?.is_verified ? <Welcome /> : <UpdateTemporaryPassword />}
              />
              <Route
                exact
                path="/advance-immediately"
                component={AdvanceImmediately}
              />
              <Route exact path="/create-profile" component={CreateProfile} />

              <Route exact path="/applications/lease-contract" component={LeaseContract} />
              <Route exact path="/applications/:id/desired-loan" component={DesiredLoan} />
              <Route exact path="/applications/:id/pre-offer" component={PreOffer} />
              <Route exact path="/applications/:id/identity-check" component={Passport} />
              <Route exact path="/applications/:id/property-documents" component={UploadDocuments} />
              <Route exact path="/applications/:id/property-pictures" component={UploadPictures} />
              <Route exact path="/applications/:id/privacy-policy" component={ConfirmationData} />
              <Route exact path="/applications/:id/policy-notifications" component={DataValidation} />

              <Route exact path="/bug" component={Bug} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/biometric-validation" component={BiometricValidation} />
              <Route exact path="/validation-error" component={ValidationError} />
              <Route exact path="/correct-data" component={CorrectData} />
              <Route exact path="/withdrawals" component={Withdrawals} />
              <Route exact path="/signature" component={Signature} />
              <Route exact path="/outlay" component={Outlay} />
              <Route exact path="/correct-deposit" component={CorrectDeposit} />
              <Route exact path="/full-advance" component={FullAdvance} />
              <Route exact path="/summary" component={Summary} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/succesful-transaction" component={SuccesfulTransaction} />
              {/* <Route exact path="/"><Redirect to="/welcome" /></Route> */}
              <Route exact path="/"><Redirect to="/dashboard" /></Route>
            </IonReactRouter>
          ) : (
            <IonReactRouter>
              <Route exact path="/create-account" component={Register}  />
              <Route exact path="/login" component={Login}  />
              <Route exact path="/register" component={Register}  />
              <Route path="/verification-code/:phone" component={VerificationCode} />
              <Route path="/verification-email/:phone" component={VerificationEmail} />
              <Route exact path="/terms-and-conditions" component={TermsAndConditions} />
              <Route exact path="/"><Redirect to="/login" /></Route>
            </IonReactRouter>
          )}
        </>
      </IonApp>
    );
  }
};

export default App;
