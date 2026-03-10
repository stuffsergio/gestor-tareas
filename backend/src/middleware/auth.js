import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);

export async function requireAuth(req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }

  const authHeader = req.headers.authorization;
  // console.log("Auth header:", authHeader);

  if (!authHeader) return res.status(401).json({ error: "No autorizado" });

  const token = authHeader.replace("Bearer ", "");
  // console.log("Token:", token?.slice(0, 20) + "...");

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  // console.log("User:", user, "Error:", error);

  if (error || !user) return res.status(401).json({ error: "Token inválido" });

  req.user = user;
  next();
}
