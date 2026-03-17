import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { useAuth } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import { useNotifications } from "./hooks/useNotifications";

export default function Tareas() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { session } = useAuth();
  const { sendTaskReminder } = useNotifications();

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    const { data, error } = await supabase.from("tareas").select("*");

    if (error) {
      console.log("Error fetching tareas: " + error);
    } else {
      setTasks(data);
    }

    return data;
  }

  async function addTasks(e) {
    e.preventDefault();

    if (!title.trim()) {
      setMessage("Debes introducir el nombre primero");
      return;
    }

    setLoading(true);
    setMessage("Insertando tarea...");

    const {
      data: { session: currentSession },
    } = await supabase.auth.getSession();

    // Convierte "2026-03-10T18:00" a "2026-03-10T18:00:00+01:00"
    function toLocalISOString(dateTimeLocal) {
      const date = new Date(dateTimeLocal);
      const offset = -date.getTimezoneOffset();
      const sign = offset >= 0 ? "+" : "-";
      const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
      return (
        date.getFullYear() +
        "-" +
        pad(date.getMonth() + 1) +
        "-" +
        pad(date.getDate()) +
        "T" +
        pad(date.getHours()) +
        ":" +
        pad(date.getMinutes()) +
        ":00" +
        sign +
        pad(offset / 60) +
        ":" +
        pad(offset % 60)
      );
    }

    const { data: tarea, error } = await supabase
      .from("tareas")
      .insert([
        {
          title,
          priority,
          user_id: currentSession.user.id,
          event_date: eventDate ? toLocalISOString(eventDate) : null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("❌ Error guardando tarea:", error);
      setMessage("Error guardando la tarea, vuelve a intentarlo");
      setLoading(false);
      return;
    }

    setMessage("✅ Tarea guardada correctamente");
    setTitle("");
    setPriority("");
    setEventDate("");
    await getTasks();
    setLoading(false);

    // Enviar notificación push si hay fecha límite
    if (eventDate && tarea) {
      try {
        await sendTaskReminder({
          taskTitle: tarea.title,
          dueDate: new Date(tarea.event_date).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
          }),
          taskId: tarea.id,
        });
      } catch (err) {
        // No bloqueamos al usuario si falla la notificación
        console.warn("Push no enviado:", err.message);
      }
    }
  }

  async function deleteTask(task) {
    const { error } = await supabase.from("tareas").delete().eq("id", task.id);

    if (error) {
      console.error("❌ Error eliminando tarea:", error);
      setMessage("Error eliminando tarea");
    } else {
      await getTasks();
      setMessage("Tarea eliminada correctamente");
    }
  }

  return (
    <div>
      <NavBar id={1} />
      <div className="flex flex-col gap-14 px-10 py-10">
        <form
          onSubmit={addTasks}
          className="flex flex-col gap-4 justify-around"
        >
          <h3 className="text-sm fong-bold tracking-tight">GUARDAR TAREA</h3>
          <div className="w-full border border-[#1f1f1f] rounded-lg px-6 py-6 flex flex-row justify-between">
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Nombre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-sm bg-[#1f1f1f] text-[#ededed] text-sm px-2 py-1"
            />
            <select
              name="priority"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="rounded-sm bg-[#1f1f1f] text-[#ededed] text-sm px-2 py-1"
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
            <input
              type="datetime-local"
              name="eventDate"
              id="eventDate"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="rounded-sm bg-[#1f1f1f] text-[#ededed] text-sm px-2 py-1"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-sm bg-[#0072f5] px-3 py-1 tracking-tight"
            >
              {loading ? "..." : "Guardar"}
            </button>
          </div>
          {message && <p className="text-sm">{message}</p>}
        </form>

        <div className="flex flex-col justify-around items-start gap-4">
          <h3>LISTADO DE TAREAS</h3>
          <div className="flex flex-col w-full gap-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col gap-3 px-6 py-3.5 bg-[#1f1f1f] rounded-lg"
              >
                <div className="flex flex-row items-center justify-between">
                  <p>
                    {task.title} -{" "}
                    {task.priority === "Alta"
                      ? "🔴"
                      : task.priority === "Media"
                        ? "🟡"
                        : "🟢"}
                  </p>
                  {task.event_date && (
                    <p>
                      {new Date(task.event_date).toLocaleDateString("es-ES")}
                    </p>
                  )}
                </div>
                <div className="flex flex-row items-center justify-end">
                  <button
                    onClick={() => deleteTask(task)}
                    className="text-xs rounded-full bg-red-600 text-white px-2 py-1"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
