import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE,
);

export const getAllTareas = async () => {
  const { data: tareas, error } = await supabase.from("tareas").select("*");

  return tareas;
};

export const getListaTareas = async () => {
  const { data: tareas, error } = await supabase
    .from("tareas")
    .select("title, priority");

  console.log("DATA LISTA TAREAS");
  console.log(tareas);

  return tareas;
};

export const getListaTareasByUserId = async (user_id) => {
  const { data: tareas, error } = await supabase
    .from("tareas")
    .select("title, priority")
    .eq("user_id", user_id);

  console.log("DATA LISTA TAREAS - ", user_id);
  console.log(tareas);

  return tareas;
};
