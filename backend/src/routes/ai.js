import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import LLM from "../LLM.js";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE,
);

router.post("/chat", requireAuth, async (req, res) => {
  const { message } = req.body;

  try {
    if (!message) return res.status(400).json({ error: "Falta el mensaje" });

    const { data: tareas, error } = await supabase
      .from("tareas")
      .select("title, priority")
      .eq("user_id", req.user.id);

    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Error obteniendo tareas" });
    }

    const listaTareas =
      tareas.length > 0
        ? tareas
            .map((t) => ` - ${t.title} (prioridad: ${t.priority})`)
            .join("\n")
        : "No hay tareas registradas aún";

    const systemPrompt = `
      Eres un asistente de gestión de tareas.
      El usuario ya tiene las siguientes tareas registradas:
      ${listaTareas}

      Si el usuario quiere añadir una tarea que ya existe, avísale.
      Responde siempre en español y de forma concisa.
      `.trim();

    const reply = await LLM(systemPrompt, message);

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ err: "Error llamando a OpenRouter" });
  }
});

export default router;
