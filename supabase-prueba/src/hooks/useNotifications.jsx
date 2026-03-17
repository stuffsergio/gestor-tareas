// supabase-prueba/src/hooks/useNotifications.js
import { useState, useEffect, useCallback } from "react";
import { subscribeToPush, isPushSubscribed } from "../lib/onesignal";
import { supabase } from "../lib/supabaseClient";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function useNotifications() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    isPushSubscribed()
      .then(setIsSubscribed)
      .finally(() => setIsLoading(false));
  }, []);

  /**
   * Pide permiso y suscribe al usuario.
   * Vincula automáticamente su userId de Supabase con OneSignal.
   */
  const subscribe = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      const ok = await subscribeToPush(userId);
      setIsSubscribed(ok);
      if (!ok) setError("El usuario no concedió permiso de notificaciones.");
      return ok;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Envía un recordatorio de tarea al backend.
   */
  const sendTaskReminder = useCallback(
    async ({ taskTitle, dueDate, taskId }) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.access_token) throw new Error("No hay sesión activa");

      const res = await fetch(
        `${BACKEND_URL}/api/notifications/task-reminder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ taskTitle, dueDate, taskId }),
        },
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Error enviando notificación");
      }

      return res.json();
    },
    [],
  );

  /**
   * Envía cualquier notificación push genérica.
   */
  const sendPush = useCallback(async ({ title, message, url }) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.access_token) throw new Error("No hay sesión activa");

    const res = await fetch(`${BACKEND_URL}/api/notifications/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ title, message, url }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Error enviando notificación");
    }

    return res.json();
  }, []);

  return {
    isSubscribed,
    isLoading,
    error,
    subscribe,
    sendTaskReminder,
    sendPush,
  };
}
