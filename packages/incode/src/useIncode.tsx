import { useEffect, useState } from "react";
import { initSession, T_session } from "./client";

export const useIncode = () => {
  const [session, setSession] = useState<T_session>();
  const [error, setError] = useState();

  useEffect(() => {
    const syncSession = async function () {
      const incodeSession = localStorage.getItem("incode_session");

      if (incodeSession) {
        setSession(JSON.parse(incodeSession));
      } else {
        try {
          const session = await initSession();
          localStorage.setItem("incode_session", JSON.stringify(session));
          setSession(session);
        } catch (error: any) {
          setError(error);
        }
      }
    };

    syncSession();
  }, []);

  return {
    session,
    error,
  };
};
