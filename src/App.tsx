import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonApp,
  setupIonicReact,
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

import LeaseContract from "./pages/property/LeaseContract";
import DesiredLoan from "./pages/property/DesiredLoan";
import Passport from "./pages/identity/Passport";
import TermsAndConditions from "./pages/TermsAndConditions";
import UpdateTemporaryPassword from "./pages/auth/UpdateTemporaryPassword";
import Welcome from "./pages/Welcome";
import PreOffer from "./pages/property/PreOffer";
import DataValidation from "./pages/DataValidation";
import ValidationError from "./pages/ValidationError";
import CorrectData from "./pages/CorrectData";
import Withdrawals from "./pages/Withdrawals";
import Signature from "./pages/Signature";
import Outlay from "./pages/Outlay";
import CorrectDeposit from "./pages/CorrectDeposit";
import Profile from "./pages/Profile";
import SuccesfulTransaction from "./pages/SuccesfulTransaction";
import Dashboard from "./pages/home/Dashboard";
import ForgotPassword from "./pages/auth/ForgotPassword";

import Summary from "./pages/loan/Summary";

import PrivacyPolicy from "./pages/property/PrivacyPolicy";
import ConfirmPrivacyPolicy from "./pages/property/ConfirmPrivacyPolicy";
import FailBuroScore from "./pages/property/FailBuroScore";

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

const PrivateRoute: React.FC<{
  path: string,
  component?: React.FC<any>
  children: React.ReactNode,
  exact?: boolean
}> = ({ children, component: Component, ...rest }) => {
  const { authInfo } = useAuth()!;

  return (
    <Route {...rest}
      render={(props) => {
        if (authInfo.loggedIn) {
          if (Component) {
            return <Component {...props} />
          }

          return children
        }

        return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      }}
    />
  );
}

const PublicRoute: React.FC<{
  path: string,
  component?: React.FC<any>
  children: React.ReactNode,
  exact?: boolean
}> = ({ children, component: Component, ...rest }) => {
  const { authInfo } = useAuth()!;

  return (
    <Route {...rest}
      render={(props) => {
        if (!authInfo.loggedIn) {
          if (Component) {
            return <Component {...props} />
          }

          return children
        }

        return <Redirect to={{ pathname: "/dashboard", state: { from: props.location } }} />
      }}
    />
  );
}

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
        <IonReactRouter>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/welcome" component={Welcome} />
          <PrivateRoute path="/update-temporary-password" component={UpdateTemporaryPassword} />
          <PrivateRoute path="/advance-immediately" component={AdvanceImmediately} />
          <PrivateRoute path="/create-profile" component={CreateProfile} />
          <PrivateRoute path="/applications/lease-contract" component={LeaseContract} />
          <PrivateRoute path="/applications/:id/desired-loan" component={DesiredLoan} />
          <PrivateRoute path="/applications/:id/pre-offer" component={PreOffer} />
          <PrivateRoute path="/applications/:id/privacy-policy" component={PrivacyPolicy} />
          <PrivateRoute path="/applications/:id/confirm-privacy-policy" component={ConfirmPrivacyPolicy} />
          <PrivateRoute path="/applications/:id/fail-buro-score" component={FailBuroScore} />
          <PrivateRoute path="/applications/:id/identity-check" component={Passport} />
          <PrivateRoute path="/applications/:id/property-documents" component={UploadDocuments} />
          <PrivateRoute path="/applications/:id/property-pictures" component={UploadPictures} />
          <PrivateRoute path="/applications/:id/final-announcement" component={DataValidation} />

          <PrivateRoute path="/loans/:id/success" component={CorrectData} />
          <PrivateRoute path="/loans/:id/account-statement" component={Withdrawals} />
          <PrivateRoute path="/loans/:id/disbursement" component={Outlay} />
          <PrivateRoute path="/loans/:id" component={Summary} />

          <PrivateRoute path="/validation-error" component={ValidationError} />
          <PrivateRoute path="/signature" component={Signature} />
          <PrivateRoute path="/correct-deposit" component={CorrectDeposit} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/succesful-transaction" component={SuccesfulTransaction} />

          <PublicRoute path="/start" component={Home} />
          <PublicRoute path="/create-account" component={Register} />
          <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/verification-code/:phone" component={VerificationCode} />
          <PublicRoute path="/verification-email/:phone" component={VerificationEmail} />
          <PublicRoute path="/terms-and-conditions" component={TermsAndConditions} />
          <PublicRoute path="/forgot-password" component={ForgotPassword} />
          <PublicRoute exact path="/"><Redirect to="/start" /></PublicRoute>
        </IonReactRouter>
      </IonApp>
    );
  }
};

export default App;
