import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    // Sesión inicial al cargar la app
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // Escucha cambios: login, logout, refresco de token
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
