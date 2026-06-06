import { useState } from "react";
import { crearTarea } from "../lib/tareasApi";

export default function CrearTarea() {
  const initialForm = {
    title: "",
    priority: "Media",
    eventDate: new Date.now(),
  };
  const [form, setForm] = useState(initialForm);

  const handleReset = () => {
    setForm(initialForm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await crearTarea({
      title: form.title,
      priority: form.priority,
      eventDate: form.eventDate,
    });
    console.log(response);
  };

  return (
    <>
      {/* OVERLAY */}
      <div className="fixed inset-0 bg-white/10" />

      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[50dvw] h-[50dvh] p-6">
        <h1>FORMULARIO PARA CREAR TAREAS</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Título</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="priority">Prioridad</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
          <div>
            <label htmlFor="eventDate">Fecha</label>
            <input
              type="datetime"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <button type="submit">Crear</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
