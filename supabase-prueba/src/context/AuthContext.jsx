import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext();

async function guardarGoogleToken(session) {
  if (session?.provider_token) {
    const { error } = await supabase.from("google_tokens").upsert(
      {
        user_id: session.user.id,
        access_token: session.provider_token,
        refresh_token: session.provider_refresh_token ?? null,
      },
      { onConflict: "user_id" },
    );

    if (error) {
      console.log("Error guardando el token: " + error);
    } else {
      console.log("✅ Google token guardado");
      // Si venimos de un auth redirect -> redirigir a /home
      if (
        window.location.pathname === "/" ||
        window.location.search.includes("code=")
      ) {
        window.location.href = "/home";
      }
    }
  }
}

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    // guardamos el token si viene de un redirect de google
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      guardarGoogleToken(data.session);
    });

    // Listen a cambios: login, logout, token_refresh
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      // guardamos el token de Google al hacer login
      if (event === "SIGNED_IN") {
        await guardarGoogleToken(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
