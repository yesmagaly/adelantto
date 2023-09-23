import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Welcome from "./auth/UpdateTemporaryPassword";

// import UserDetailPage from './UserDetailPage';
// import UsersListPage from './UsersListPage';

const UserPage: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonRouterOutlet>
      {/* <Route exact path={match.url} component={UsersListPage} /> */}
      <Route
        path={`${match.url}/update-temporary-password`}
        component={Welcome}
      />
    </IonRouterOutlet>
  );
};

export default UserPage;
