import { useNotifications } from "../hooks/useNotifications";

export function NotificationBell({ className = "", onSubscribed }) {
  const { isSubscribed, isLoading, error, subscribe } = useNotifications();

  const handleClick = async () => {
    if (isSubscribed || isLoading) return;
    const ok = await subscribe();
    if (ok && onSubscribed) onSubscribed();
  };

  return (
    <div className={`notification-bell ${className}`}>
      <button
        onClick={handleClick}
        disabled={isSubscribed || isLoading}
        title={
          isSubscribed ? "Notificaciones activas" : "Activar notificaciones"
        }
        className={`inline-flex items-center gap-2 px-3.5 py-2 border ${isSubscribed ? "border-[#86efac] text-[#15803d] cursor-default" : "border-[#e5e7eb] text-inherit cursor-pointer"} rounded-lg text-[14px] font-bold ${isLoading ? "opacity-60" : "opacity-100"} transition-all duration-150 ease`}
        aria-label={
          isSubscribed
            ? "Notificaciones activadas"
            : "Activar notificaciones push"
        }
      >
        <BellIcon active={isSubscribed} spinning={isLoading} />
        <span>
          {isLoading
            ? "Cargando..."
            : isSubscribed
              ? "Notificaciones activas"
              : "Activar Notificaciones"}
        </span>
      </button>

      {error && (
        <p className="m-2 text-[12px] text-[#dc2626]" role="alert">
          ⚠ {error}
        </p>
      )}

      {!isSubscribed && !isLoading && isIOSBrowser() && (
        <p className="max-w-70 m-2 text-[12px] text-[#6b7280]">
          📱 En iPhone: añade esta web a tu pantalla de inicio para recibir
          notificaciones
        </p>
      )}
    </div>
  );
}

// ─── Icono campana ─────────────────────────────────────────────────────────────
function BellIcon({ active, spinning }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={spinning ? { animation: "spin 1s linear infinite" } : {}}
      aria-hidden="true"
    >
      {spinning ? (
        <path d="M12 2a10 10 0 1 0 10 10" />
      ) : (
        <>
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          {active && (
            <circle cx="18" cy="5" r="3.5" fill="#22c55e" stroke="none" />
          )}
        </>
      )}
    </svg>
  );
}

// ─── Detección de iOS en navegador (sin Add to Home Screen) ───────────────────
function isIOSBrowser() {
  return (
    typeof navigator !== "undefined" &&
    /iphone|ipad|ipod/i.test(navigator.userAgent) &&
    !window.navigator.standalone
  );
}
