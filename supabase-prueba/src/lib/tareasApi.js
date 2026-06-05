import { supabase } from "./supabaseClient";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const listarTareasUsuario = async () => {
  const { data, error } = await supabase.from("tareas").select("*");

  if (error) {
    throw new Error(error.message || "Error obteninedo tareas");
  }

  return data;
};
