// supabase-prueba/src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { linkUserToOneSignal, unlinkUserFromOneSignal } from "../lib/onesignal";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    // Sesión inicial al cargar la app
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      // linkUserToOneSignal es async y espera internamente a que el SDK esté listo
      if (data.session?.user?.id) {
        linkUserToOneSignal(data.session.user.id);
      }
    });

    // Escucha cambios: login, logout, refresco de token
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);

      if (event === "SIGNED_IN" && session?.user?.id) {
        linkUserToOneSignal(session.user.id);
      }

      if (event === "SIGNED_OUT") {
        unlinkUserFromOneSignal();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
