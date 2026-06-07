import { useState } from "react";
import { crearTarea } from "../lib/tareasApi";

export default function CrearTarea() {
  const fecha = Date.now();
  const fechaActual = new Date(fecha);
  const fechaFormateada = fechaActual.toLocaleDateString();
  const initialForm = {
    title: "",
    priority: "Media",
    eventDate: fechaFormateada,
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
      {/* OVERLAY 
      <div className="fixed inset-0 bg-white/10" />
      */}

      <div className="p-8">
        <h1>CREAR TAREAS</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 border p-5"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-lg satoshi-bold">
              Título
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="text-base py-1.5 px-3 border border-[#1f1f1f] focus:outline-none focus:ring-4 focus:ring-gray-300/30 focus:border-white transition-all transform duration-200"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="priority" className="text-lg satoshi-bold">
              Prioridad
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="text-base py-1.5 px-3 border border-[#1f1f1f] focus:outline-none focus:ring-4 focus:ring-gray-300/30 focus:border-white transition-all transform duration-200"
            >
              <option value="Baja" className="bg-black text-white">
                Baja
              </option>
              <option value="Media" className="bg-black text-white">
                Media
              </option>
              <option value="Alta" className="bg-black text-white">
                Alta
              </option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="eventDate" className="text-lg satoshi-bold">
              Fecha
            </label>
            <input
              type="datetime"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              className="text-base py-1.5 px-3 border border-[#1f1f1f] focus:outline-none focus:ring-4 focus:ring-gray-300/30 focus:border-white transition-all transform duration-200"
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
