import React from "react";
import { API_SERVER_URL } from "../../config";

type UserDataInterface = {
  initialized: boolean;
  loggedIn: boolean;
  user: any
};

type MyContextInterface = {
  authInfo: UserDataInterface;
  initialize: () => Promise<boolean>;
  logOut: () => Promise<boolean>;
  logIn: () => Promise<boolean>;
};

// create the context
export const AuthContext = React.createContext<MyContextInterface | undefined>(
  undefined
);

// create the context provider, we are using use state to ensure that
// we get reactive values from the context...
type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC = (props: any) => {
  // the reactive values
  const [authInfo, setAuthInfo] = React.useState<UserDataInterface>();

  const logOut = () => {
    return new Promise((resolve) => {
      window.localStorage.removeItem("AUTH");
      setAuthInfo({ initialized: true, loggedIn: false, user: null });
      setTimeout(() => {
        return resolve(true);
      }, 1000);
    });
  };

  const logIn = async (email: string, password: string) => {
    // Send phone request.
    const response = await fetch(`${API_SERVER_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (response.status === 200) {
      let v = {
        initialized: true,
        loggedIn: true,
        user: {
          token: json.token,
          is_verified: json.is_verified,
          id: new Date().getTime() + ""
        },
      };

      setAuthInfo(v);
      window.localStorage.setItem("AUTH", JSON.stringify(v.user));
    } else {
      throw new Error(json.message);
    }

    return json;
  };

  const initialize = () => {
    let response = window.localStorage.getItem("AUTH") || null;

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
