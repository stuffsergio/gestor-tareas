import { supabase } from "./supabaseClient";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const listarTareasUsuario = async () => {
  const { data, error } = await supabase
    .from("tareas")
    .select("*")
    .order("id", { ascending: true });
  console.log(data);

  if (error) {
    throw new Error(error.message || "Error obteninedo tareas");
  }

  return data;
};

export const crearTarea = async ({ title, priority, eventDate }) => {
  const { data, error } = await supabase
    .from("tareas")
    .insert({ title, priority, eventDate })
    .select();

  if (error) {
    console.log(error);
    throw new Error(error.message || "Error insertando tarea");
  }

  console.log(data);

  return data;
};
