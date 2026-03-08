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
  const { session } = useAuth();
  useEffect(() => {
    getTasks();
  }, []);
  async function getTasks() {
    /* consultar en la db las tareas, filtrado por user_id */ const {
      data,
      error,
    } = await supabase.from("tareas").select("*");
    if (error) {
      console.log("Error fetching tareas: " + error);
    } else {
      setTasks(data);
      /* actualiza los datos en la UI */ console.log(data);
    }
    return data;
  }
  async function addTasks(e) {
    e.preventDefault();
    console.log("1. Submit detectado");
    if (!title.trim()) {
      console.log("❌ Title vacío, saliendo");
      return;
    }
    setLoading(true);
    setCalendarError(null);
    console.log("2. Insertando tarea...", {
      title,
      priority,
      eventDate,
      user_id: session?.user?.id,
    });
    /* Sustituye el insert por esto */ const {
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
      setLoading(false);
      return;
    }
    console.log("4. Tarea guardada correctamente:", tarea);
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
      } else {
        console.log("✅ Evento creado en Google Calendar");
        getTasks();
      }
    }
  }
  return (
    <div className="flex flex-col gap-20">
      <div>
        <form onSubmit={addTasks}>
          <h3 className="text-sm fong-bold tracking-tight">GUARDAR TAREA</h3>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="priority"
            id="priority"
            placeholder="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
          <input
            type="datetime-local"
            name="eventDate"
            id="eventDate"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          {calendarError && <p>{calendarError}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "..." : "Guardar"}
          </button>
        </form>
      </div>
      <div>
        <h3>LISTADO DE TAREAS</h3>
        <div>
          {tasks.map((task) => (
            <div key={task.id}>
              <p>{task.title}</p> <span> - </span> <p>{task.priority}</p>
              {task.event_date && (
                <p>{new Date(task.event_date).toLocaleDateString("es-ES")}</p>
              )}
              {task.google_event_id && <span>📆 - ✅</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
