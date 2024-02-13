import React from "react";
import { API_SERVER_URL } from "../../config";
import { authentication } from "../../api";

type UserDataInterface = {
  initialized: boolean;
  loggedIn: boolean;
  user: any;
};

type MyContextInterface = {
  authInfo: UserDataInterface;
  initialize: () => Promise<boolean>;
  logOut: () => Promise<boolean>;
  logIn: (email: string, password: string) => Promise<any>;
};

export const AuthContext = React.createContext<MyContextInterface | undefined>(
  undefined
);

interface ComponentProps {
  children: React.ReactNode
};

export const AuthProvider = (props: ComponentProps) => {
  // the reactive values
  const [authInfo, setAuthInfo] = React.useState<UserDataInterface>();

  const logOut = async () => {
    window.sessionStorage.removeItem("AUTH");
    setAuthInfo({ initialized: true, loggedIn: false, user: null });
    await authentication.logout();
  };

  const logIn = async (email: string, password: string) => {
    // Send phone request.
    const response = await authentication.login({ email, password });
    const json = await response.json();

    if (response.status === 200) {
      let v = {
        initialized: true,
        loggedIn: true,
        user: {
          token: json.token,
          is_verified: json.is_verified,
          id: new Date().getTime() + "",
        },
      };

      setAuthInfo(v);
      window.sessionStorage.setItem("AUTH", JSON.stringify(v.user));
    } else {
      throw new Error(json.message);
    }

    return json;
  };

  const initialize = () => {
    let response = window.sessionStorage.getItem("AUTH") || null;

    if (response !== null) {
      setAuthInfo({
        initialized: true,
        loggedIn: true,
        user: JSON.parse(response),
      });
    } else {
      setAuthInfo({
        initialized: true,
        loggedIn: false,
        user: null,
      });
    }
  };

  let v = {
    authInfo,
    logOut: logOut,
    logIn: logIn,
    initialize,
  };

  return <AuthContext.Provider value={v} {...props} />;
};

export const useAuth = () => React.useContext(AuthContext);
