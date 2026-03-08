import { supabase } from "./supabaseClient";

export async function askLLM(message) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const res = await fetch("http://localhost:3000/api/ai/chat", {
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
