import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { useAuth } from "./context/AuthContext";
export default function Tareas() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calendarError, setCalendarError] = useState(false);
  const [message, setMessage] = useState("");
  const [messageCalendar, setMessageCalendar] = useState("");
  const { session } = useAuth();

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    // consultar en la db las tareas, filtrado por user_id
    const { data, error } = await supabase.from("tareas").select("*");

    if (error) {
      console.log("Error fetching tareas: " + error);
    } else {
      setTasks(data); // actualizamos tareas en la UI
      console.log(data);
    }

    return data;
  }

  async function addTasks(e) {
    e.preventDefault();
    console.log("1. Submit detectado");

    if (!title.trim()) {
      console.log("❌ Title vacío, saliendo");
      setMessage("Debes introducir el nombre primero");
      return;
    }

    setLoading(true);
    setMessage("Insertando tarea...");
    setCalendarError(null);
    console.log("2. Insertando tarea...", {
      title,
      priority,
      eventDate,
      user_id: session?.user?.id,
    });

    const {
      data: { session: currentSession },
    } = await supabase.auth.getSession();
    console.log(
      "2b. access_token:",
      currentSession?.access_token ? "✅ existe" : "❌ no existe",
    );

    const { data: tarea, error } = await supabase
      .from("tareas")
      .insert([
        {
          title,
          priority,
          user_id: currentSession.user.id,
          event_date: eventDate || null,
        },
      ])
      .select()
      .single();

    console.log("3. Resultado insert:", { tarea, error });

    if (error) {
      console.error("❌ Error guardando tarea:", error);
      setMessage("Error guardando la tarea, vuelve a intentarlo");
      setLoading(false);
      return;
    }

    console.log("4. Tarea guardada correctamente:", tarea);
    setMessage("✅ Tarea guardada correctamente");
    setTitle("");
    setPriority("");
    setEventDate("");
    await getTasks();
    setLoading(false);

    if (eventDate && tarea) {
      console.log("5. Llamando Edge Function con:", {
        record: tarea,
        user_id: session.user.id,
      });

      const { data: fnData, error: fnError } = await supabase.functions.invoke(
        "google-calendar",
        { body: { record: tarea, user_id: session.user.id } },
      );

      console.log("6. Respuesta Edge Function:", { fnData, fnError });

      if (fnError) {
        setCalendarError(
          "No se pudo añadir al calendario. ¿Has conectado Google Calendar?",
        );
        setMessageCalendar("Error guardando tarea");
      } else {
        console.log("✅ Evento creado en Google Calendar");
        setMessageCalendar("Se ha añadido a tu calendario");
        getTasks();
      }
    }
  }

  async function deleteTask(task) {
    // Intentar eliminar de Google Calendar, pero no bloquear si falla
    if (task.google_event_id) {
      const { error: fnError } = await supabase.functions.invoke(
        "google-calendar-delete",
        {
          body: {
            google_event_id: task.google_event_id,
            user_id: session.user.id,
          },
        },
      );
      if (fnError)
        console.warn("No se pudo eliminar de Google Calendar:", fnError);
    }

    // Siempre eliminar de Supabase independientemente del resultado anterior
    const { error } = await supabase.from("tareas").delete().eq("id", task.id);

    if (error) {
      console.error("❌ Error eliminando tarea:", error);
      setMessage("Error eliminando tarea");
    } else {
      console.log("✅ Tarea eliminada");
      await getTasks();
      setMessage("Tarea eliminada correctamente");
    }

    getTasks();
  }

  return (
    <div className="flex flex-col gap-14 px-10 py-10">
      <div>
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
              type="text"
              name="priority"
              id="priority"
              placeholder="Prioridad"
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
            {calendarError && <p>{calendarError}</p>}
            <button
              type="submit"
              disabled={loading}
              className="rounded-sm bg-[#0072f5] px-3 py-1 tracking-tight"
            >
              {loading ? "..." : "Guardar"}
            </button>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {message && <p>{message}</p>}
            {messageCalendar && <p>{"📆 - " + messageCalendar}</p>}
          </div>
        </form>
      </div>
      <div className="flex flex-col justify-around items-start gap-4">
        <h3>LISTADO DE TAREAS</h3>
        <div className="flex flex-col w-full gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col gap-3 px-6 py-3.5 bg-[#1f1f1f] rounded-lg"
            >
              <div className="flex flex-row items-center justify-between">
                <span className="">
                  <p className="">
                    {task.title} -{" "}
                    {task.priority === "Alta"
                      ? "🔴"
                      : task.priority === "Media"
                        ? "🟡"
                        : "🟢"}
                  </p>
                </span>
                <span className="">
                  {task.event_date && (
                    <p>
                      {new Date(task.event_date).toLocaleDateString("es-ES")}
                    </p>
                  )}
                </span>
              </div>
              <div className="flex flex-row items-center justify-between">
                <span>{task.google_event_id && <span>📆 - ✅</span>}</span>
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
  );
}
