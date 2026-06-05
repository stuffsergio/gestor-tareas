import { useEffect, useState } from "react";
import { listarTareasUsuario } from "../lib/tareasApi";

export default function ListaTareas() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    async function cargarTareasUsuario() {
      const tareasUsuario = await listarTareasUsuario();
      console.log(tareasUsuario);
      setTareas(tareasUsuario);
    }
  }, [tareas]);

  return (
    <div>
      <h1>LISTA DE TAREAS</h1>
      {/* Tarjeta Card */}
      <div>
        {tareas.map((t) => (
          <div>{t.title}</div>
        ))}
      </div>
    </div>
  );
}
