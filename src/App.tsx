import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Provider, useSelector } from "react-redux";

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

import { store } from "@adelantto/store";

import Home from "./pages/Home";
import AdvanceImmediately from "./pages/home/AdvanceImmediately";
import Dashboard from "./pages/home/Dashboard";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerificationCode from "./pages/auth/VerificationCode";
import UpdateTemporaryPassword from "./pages/auth/UpdateTemporaryPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";

import Summary from "./pages/loan/Summary";
import { InstallmentDetail } from "./pages/loan/InstallmentDetail";
import { CongratulationsPage } from "./pages/loan/CongratulationsPage";

import { ProfilePage } from "./pages/profile/ProfilePage";
import { CreateProfilePage } from "./pages/profile/CreateProfile";
import { IdentificationPage } from "./pages/profile/IdentificationPage";
import { IncomeAndTaxesPage } from "./pages/profile/IncomeAndTaxesPage";
import { OopsPage } from "./pages/profile/OopsPage";
import { BiometricValidationPage } from "./pages/profile/BiometricValidationPage";
import { MyDataPage } from "./pages/profile/MyDataPage";

import UploadDocuments from "./pages/applications/UploadDocuments";
import LeaseContract from "./pages/applications/LeaseContract";
import { PreOfferPage } from "./pages/applications/PreOfferPage";
import PrivacyPolicy from "./pages/applications/PrivacyPolicy";
import ConfirmPrivacyPolicy from "./pages/applications/ConfirmPrivacyPolicy";
import FailBuroScore from "./pages/applications/FailBuroScore";
import { AwaitingValidation } from "./pages/applications/AwaitingValidation";
import { authSlice } from "@adelantto/store";

setupIonicReact();

const PrivateRoute: React.FC<{
  path: string;
  component?: React.FC<any>;
  children?: React.ReactNode;
  exact?: boolean;
}> = ({ children, component: Component, ...rest }) => {
  const isAuthenticated = useSelector(
    authSlice.selectors.selectIsAuthenticated
  );

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) {
          return Component ? <Component {...props} /> : children;
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
  const isAuthenticated = useSelector(
    authSlice.selectors.selectIsAuthenticated
  );

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return Component ? <Component {...props} /> : children;
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
  return (
    <IonApp>
      <Provider store={store}>
        <IonReactRouter>
          <PrivateRoute path="/home" component={Dashboard} />
          <PrivateRoute
            path="/update-temporary-password"
            component={UpdateTemporaryPassword}
          />
          <PrivateRoute
            path="/welcome"
            component={AdvanceImmediately}
          />

          <PrivateRoute path="/profile" component={ProfilePage} />

          <PrivateRoute
            path="/profile/my-data"
            component={MyDataPage}
          />

          <PrivateRoute
            path="/profile/create"
            component={CreateProfilePage}
          />
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
            component={PreOfferPage}
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
            path="/applications/:id/final-announcement"
            component={AwaitingValidation}
          />

          <PrivateRoute exact path="/loans/:id" component={Summary} />
          <PrivateRoute
            path="/loans/:id/success"
            component={CongratulationsPage}
          />

          <PrivateRoute
            path="/loans/:id/installments/:installment_id"
            component={InstallmentDetail}
          />

          <PublicRoute path="/" component={Home} exact />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/forgot-password" component={ForgotPassword} />
          <PublicRoute path="/create-account" component={Register} />
          <PublicRoute path="/register" component={Register} />
          <Route
            path="/verification-code/:id"
            component={VerificationCode}
          />

        </IonReactRouter>
      </Provider>
    </IonApp>
  );
};

export default App;
