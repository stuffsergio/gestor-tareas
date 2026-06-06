import { useEffect, useState } from "react";
import { listarTareasUsuario } from "../lib/tareasApi";

export default function ListaTareas() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    async function cargarTareasUsuario() {
      const tareasUsuario = await listarTareasUsuario();
      setTareas(tareasUsuario);
    }

    cargarTareasUsuario();
  }, []);

  return (
    <div>
      <h1>LISTA DE TAREAS</h1>
      {/* Tarjeta Card */}
      <div className="flex flex-col gap-2">
        {tareas.map((t, index) => (
          <div key={t.id} className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-3 p-4 border border-[#1f1f1f]">
              <div className="flex flex-row items-center gap-2.5">
                <p className="text-sm">{index + 1}</p>
                <h4 className="text-base">{t.title}</h4>
              </div>
              <div>
                <span
                  className={`text-sm
                    ${t.priority === "Alta" ? "text-amber-300" : t.priority === "Media" ? "text-blue-400" : "text-green-400"}
                  `}
                >
                  {t.priority}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
