import React from "react";
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
  setUserInfo: (key: string, value: any) => null;
  logIn: (email: string, password: string) => Promise<any>;
};

export const AuthContext = React.createContext<MyContextInterface | undefined>(
  undefined
);

interface ComponentProps {
  children: React.ReactNode
};

export const AuthProvider = (props: ComponentProps) => {
  const [authInfo, setAuthInfo] = React.useState<UserDataInterface>();

  const logOut = async () => {
    window.sessionStorage.removeItem("AUTH");
    setAuthInfo({ initialized: true, loggedIn: false, user: null });
    await authentication.logout();
  };

  const logIn = async (email: string, password: string) => {
    const response = await authentication.login({ email, password });
    const data = await response.json();

    if (response.status === 200) {
      let v = {
        initialized: true,
        loggedIn: true,
        user: data,
      };

      setAuthInfo(v);
      window.sessionStorage.setItem("AUTH", JSON.stringify(v.user));
    } else {
      throw new Error(data.message);
    }

    return data;
  };

  const setUserInfo = (key: string, value: any) => {
    const encodedUser = window.sessionStorage.getItem("AUTH") || null;

    if (encodedUser) {
      const user = JSON.parse(encodedUser);
      user[key] = value;
      window.sessionStorage.setItem("AUTH", JSON.stringify(user));
    }
  }

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
    logOut,
    logIn,
    setUserInfo,
    initialize,
  };

  return <AuthContext.Provider value={v} {...props} />;
};

export const useAuth = () => React.useContext(AuthContext);
