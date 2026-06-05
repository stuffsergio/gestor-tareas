import { useNavigate } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import SideBarDashboard from "./components/SideBarDashboard";
import Profile from "./components/Profile";
import ListaTareas from "./components/ListaTareas";

export default function Dashboard() {
  const { session, user } = useAuth();
  const navigate = useNavigate();

  function handleRutas(ruta) {
    navigate(`/${ruta}`);
  }

  async function obtenerUsuario() {
    console.log(session);
    console.log("☝ SESSION - USER 👇");
    console.log(user);
  }

  return (
    <div className="relative min-h-screen flex flex-row">
      <SideBarDashboard />
      <div className="flex flex-col gap-10 py-10 px-10">
        <h1>DASHBOARD PAGE</h1>
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

          <button
            onClick={obtenerUsuario}
            className="px-4 py-2 text-sm tracking-tight rounded-full bg-teal-600 text-white transition-all transform duration-200 hover:cursor-pointer"
          >
            Obtener INFO usuario
          </button>
        </div>
        <div>
          <ListaTareas />
        </div>
      </div>
      <Profile />
    </div>
  );
}
