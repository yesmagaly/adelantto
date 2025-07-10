import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Provider } from "react-redux";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerificationCode from "./pages/auth/VerificationCode";
import AdvanceImmediately from "./pages/home/AdvanceImmediately";

import UploadDocuments from "./pages/property/UploadDocuments";

import LeaseContract from "./pages/property/LeaseContract";
import DesiredLoan from "./pages/property/DesiredLoan";
import Passport from "./pages/identity/Passport";
import UpdateTemporaryPassword from "./pages/auth/UpdateTemporaryPassword";
import Welcome from "./pages/Welcome";
import DataValidation from "./pages/DataValidation";
import ValidationError from "./pages/ValidationError";
import CorrectData from "./pages/CorrectData";
import Withdrawals from "./pages/Withdrawals";
import CorrectDeposit from "./pages/CorrectDeposit";
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
// import "@ionic/react/css/normalize.css";
// import "@ionic/react/css/structure.css";
// import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
// import "@ionic/react/css/float-elements.css";
// import "@ionic/react/css/text-alignment.css";
// import "@ionic/react/css/text-transformation.css";
// import "@ionic/react/css/flex-utils.css";
// import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Tailwind styles */
import "./theme/tailwind.css";

import { useAuth } from "./pages/auth/authContext";
import { InstallmentDetail } from "./pages/loan/InstallmentDetail";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { CreateProfilePage } from "./pages/profile/CreateProfile";
import { IdentificationPage } from "./pages/profile/IdentificationPage";
import { IncomeAndTaxesPage } from "./pages/profile/IncomeAndTaxesPage";
import { PropertyValidationPage } from "./pages/profile/PropertyValidationPage";
import { CongratulationsPage } from "./pages/profile/CongratulationsPage";
import { OopsPage } from "./pages/profile/OopsPage";
import { BiometricValidationPage } from "./pages/profile/BiometricValidationPage";

import { store } from "@adelantto/store";

setupIonicReact();

const PrivateRoute: React.FC<{
  path: string;
  component?: React.FC<any>;
  children?: React.ReactNode;
  exact?: boolean;
}> = ({ children, component: Component, ...rest }) => {
  const { authInfo } = useAuth()!;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authInfo.loggedIn) {
          if (Component) {
            return <Component {...props} />;
          }

          return children;
        }

        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

const PublicRoute: React.FC<{
  path: string;
  component?: React.FC<any>;
  children?: React.ReactNode;
  exact?: boolean;
}> = ({ children, component: Component, ...rest }) => {
  const { authInfo } = useAuth()!;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!authInfo.loggedIn) {
          if (Component) {
            return <Component {...props} />;
          }

          return children;
        }

        return (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

const App: React.FC = () => {
  const { authInfo, initialize } = useAuth()!;

  useEffect(() => {
    !authInfo?.initialized && (async () => await initialize())();
  }, [authInfo, initialize]);

  if (!authInfo || !authInfo.initialized) {
    return (
      <IonApp>
        <div className="flex justify-center items-center w-full h-screen">
          <span className="font-medium text-sm">Cargando ...</span>
        </div>
      </IonApp>
    );
  } else {
    return (
      <IonApp>
        <Provider store={store}>
          <IonReactRouter>
            <PrivateRoute path="/home" component={Dashboard} />
            <PrivateRoute path="/welcome" component={Welcome} />
            <PrivateRoute
              path="/update-temporary-password"
              component={UpdateTemporaryPassword}
            />
            <PrivateRoute
              path="/advance-immediately"
              component={AdvanceImmediately}
            />
            <PrivateRoute path="/profile" component={ProfilePage} />
            <PrivateRoute
              path="/profile/identification"
              component={IdentificationPage}
            />
            <PrivateRoute
              path="/profile/biometric-validation"
              component={BiometricValidationPage}
            />
            <PrivateRoute
              path="/profile/income-and-taxes"
              component={IncomeAndTaxesPage}
            />
            <PrivateRoute
              path="/profile/property-validation"
              component={PropertyValidationPage}
            />

            <PrivateRoute
              path="/profile/congratulations"
              component={CongratulationsPage}
            />

            <PrivateRoute path="/profile/oops" component={OopsPage} />

            <PrivateRoute
              path="/applications/lease-contract"
              component={LeaseContract}
            />
            <PrivateRoute
              path="/applications/:id/desired-loan"
              component={DesiredLoan}
            />
            <PrivateRoute
              path="/applications/:id/property-documents"
              component={UploadDocuments}
            />
            <PrivateRoute
              path="/applications/:id/privacy-policy"
              component={PrivacyPolicy}
            />
            <PrivateRoute
              path="/applications/:id/confirm-privacy-policy"
              component={ConfirmPrivacyPolicy}
            />
            <PrivateRoute
              path="/applications/:id/fail-buro-score"
              component={FailBuroScore}
            />
            <PrivateRoute
              path="/applications/:id/identity-check"
              component={Passport}
            />

            <PrivateRoute
              path="/applications/:id/final-announcement"
              component={DataValidation}
            />
            <PrivateRoute exact path="/loans/:id" component={Summary} />
            <PrivateRoute path="/loans/:id/success" component={CorrectData} />
            <PrivateRoute
              path="/loans/:id/account-statement"
              component={Withdrawals}
            />
            <PrivateRoute
              path="/loans/:id/installments/:installment_id"
              component={InstallmentDetail}
            />

            <PrivateRoute
              path="/validation-error"
              component={ValidationError}
            />
            <PrivateRoute path="/correct-deposit" component={CorrectDeposit} />
            <PrivateRoute
              path="/succesful-transaction"
              component={SuccesfulTransaction}
            />

            <PublicRoute path="/" component={Home} exact />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/forgot-password" component={ForgotPassword} />
            <PublicRoute path="/create-account" component={Register} />
            <PublicRoute path="/register" component={Register} />
            <PublicRoute
              path="/verification-code/:id"
              component={VerificationCode}
            />
            <PublicRoute
              path="/create-profile/:id"
              component={CreateProfilePage}
            />
          </IonReactRouter>
        </Provider>
      </IonApp>
    );
  }
};

export default App;
