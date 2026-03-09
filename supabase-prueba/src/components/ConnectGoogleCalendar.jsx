import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function ConnectGoogleCalendar() {
  const { session } = useAuth();
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    supabase
      .from("google_tokens")
      .select("user_id")
      .eq("user_id", session.user.id)
      .then(({ data }) => {
        setConnected(data?.length > 0);
        setLoading(false);
      });
  }, [session]);

  const handleConnect = async () => {
    // Verificamos si ya tiene Google como provider en Supabase
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const hasGoogleIdentity = user?.identities.some(
      // devuelve true si alguno de los providers (identities) del usuario es "google"
      (i) => i.provider === "google",
    );

    if (hasGoogleIdentity) {
      // si la tiene, refresca la sesión para obtener el token -> auth
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          scopes: "https://www.googleapis.com/auth/calendar.events",
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo: window.location.origin,
        },
      });
    } else {
      // si no la tiene, se vincula con google -> linkIdentity
      await supabase.auth.linkIdentity({
        provider: "google",
        options: {
          scopes: "https://www.googleapis.com/auth/calendar.events",
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo: window.location.origin,
        },
      });
    }
  };

  const handleDisconnect = async () => {
    await supabase
      .from("google_tokens")
      .delete()
      .eq("user_id", session.user.id);
    setConnected(false);
  };

  if (loading) return null;

  return (
    <div className="w-fit">
      {connected ? (
        <div className="flex flex-row justify-center items-center gap-10 px-3 py-2 border border-white rounded-md">
          <span className="text-sm">✅ Google Calendar conectado</span>
          <button
            onClick={handleDisconnect}
            className="px-3 py-1.5 bg-red-800 rounded-md text-sm text-white tracking-tight"
          >
            Desconectar
          </button>
        </div>
      ) : (
        <div>
          <button onClick={handleConnect}>📆 Conectar Google Calendar</button>
        </div>
      )}
    </div>
  );
}
