import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("Allowed origins:", allowedOrigins);

console.log("ENV vars:", {
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY ? "✅ existe" : "❌ falta",
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS bloqueado para: ${origin}`));
      }
    },
  }),
);

app.use(express.json());

app.use("/api/ai", aiRoutes);

app.listen(PORT, () => console.log(`Servidor running at ${PORT}`));
