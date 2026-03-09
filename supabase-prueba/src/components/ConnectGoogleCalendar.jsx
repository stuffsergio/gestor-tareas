import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function ConnectGoogleCalendar() {
  const { session } = useAuth();
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) return;
    checkConnected();
  }, [session]);

  async function checkConnected() {
    const { data } = await supabase
      .from("google_tokens")
      .select("user_id")
      .eq("user_id", session.user.id);
    setConnected(data?.length > 0);
    setLoading(false);
  }

  const handleConnect = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const hasGoogleIdentity = user?.identities?.some(
      (i) => i.provider === "google",
    );

    if (hasGoogleIdentity && session?.provider_token) {
      // Ya tiene Google vinculado y hay token en sesión — guardarlo directamente
      const { error } = await supabase.from("google_tokens").upsert(
        {
          user_id: session.user.id,
          access_token: session.provider_token,
          refresh_token: session.provider_refresh_token ?? null,
        },
        { onConflict: "user_id" },
      );
      if (!error) {
        setConnected(true);
        console.log("✅ Token guardado desde sesión actual");
      }
    } else {
      // Necesita pasar por OAuth para obtener el token
      await supabase.auth.signInWithOAuth({
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
