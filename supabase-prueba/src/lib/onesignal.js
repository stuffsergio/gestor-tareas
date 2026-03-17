// supabase-prueba/src/lib/onesignal.js
// Usa el SDK vanilla de OneSignal cargado en index.html via <script>,
// en lugar de react-onesignal. Evita todos los problemas de timing del wrapper.

const isProd = import.meta.env.PROD;

/**
 * Encola una función para ejecutarse cuando el SDK esté listo.
 * Funciona igual que window.OneSignalDeferred.push().
 */
function withOneSignal(fn) {
  return new Promise((resolve, reject) => {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal) => {
      try {
        resolve(await fn(OneSignal));
      } catch (err) {
        reject(err);
      }
    });
  });
}

/**
 * Inicializa OneSignal con tu App ID.
 * Llama esto UNA VEZ en main.jsx.
 */
export function initOneSignal() {
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async (OneSignal) => {
    await OneSignal.init({
      appId: "9a01b357-fd29-4927-b06e-0dffb0ff010e",
      safari_web_id: "web.onesignal.auto.2e1b0bc4-2845-4ea5-bb2f-59e722cf7b3c",
      notifyButton: { enable: false },
      allowLocalhostAsSecureOrigin: true,
    });
    console.log("[OneSignal] SDK inicializado ✅");
  });
}

/**
 * Solicita permiso y suscribe al usuario a push.
 * @param {string} supabaseUserId
 */
export async function subscribeToPush(supabaseUserId) {
  try {
    return await withOneSignal(async (OneSignal) => {
      await OneSignal.Slidedown.promptPush();

      const optedIn = !!(await OneSignal.User.PushSubscription.optedIn);

      if (optedIn && supabaseUserId && isProd) {
        await OneSignal.login(supabaseUserId);
        console.log("[OneSignal] Usuario vinculado ✅");
      }

      return optedIn;
    });
  } catch (err) {
    console.error("[OneSignal] subscribeToPush error:", err);
    return false;
  }
}

/**
 * Comprueba si el usuario está suscrito a push.
 */
export async function isPushSubscribed() {
  try {
    return await withOneSignal(async (OneSignal) => {
      return !!(await OneSignal.User.PushSubscription.optedIn);
    });
  } catch {
    return false;
  }
}

/**
 * Vincula el usuario de Supabase con OneSignal (solo en producción).
 */
export async function linkUserToOneSignal(supabaseUserId) {
  if (!supabaseUserId || !isProd) return;
  try {
    await withOneSignal(async (OneSignal) => {
      await OneSignal.login(supabaseUserId);
      console.log("[OneSignal] Usuario vinculado ✅");
    });
  } catch (err) {
    console.warn("[OneSignal] linkUser error:", err);
  }
}

/**
 * Desvincula el usuario de OneSignal (solo en producción).
 */
export async function unlinkUserFromOneSignal() {
  if (!isProd) return;
  try {
    await withOneSignal(async (OneSignal) => {
      await OneSignal.logout();
    });
  } catch (err) {
    console.warn("[OneSignal] unlinkUser error:", err);
  }
}
