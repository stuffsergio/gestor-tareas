import { useNavigate } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";
import { NotificationBell } from "./components/NotificationBell";

export default function Home() {
  const navigate = useNavigate();

  async function handleLogout() {
    console.log("Saliendo...");
    await supabase.auth.signOut();
    navigate("/signin");
  }

  function handleRutas(ruta) {
    navigate(`/${ruta}`);
  }

  return (
    <>
      <div className="flex flex-col gap-10 py-10 px-10">
        <h1>HOME PAGE</h1>
        <div className="flex flex-row gap-10">
          <button
            onClick={() => handleRutas("tareas")}
            className="px-4 py-2 text-sm tracking-tight rounded-full bg-blue-700 text-white transition-all transform duration-200 hover:cursor-pointer"
          >
            Gestor de tareas
          </button>
          <button
            onClick={() => handleRutas("chat")}
            className="px-4 py-2 text-sm tracking-tight rounded-full bg-olive-600 text-white transition-all transform duration-200 hover:cursor-pointer"
          >
            Chat
          </button>
        </div>
        <NotificationBell />
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </>
  );
}
