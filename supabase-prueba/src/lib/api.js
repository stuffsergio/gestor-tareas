import { supabase } from "./supabaseClient";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function askLLM(message) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const res = await fetch(`${API_URL}/api/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`, // ← JWT del usuario
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  return data.reply;
}
