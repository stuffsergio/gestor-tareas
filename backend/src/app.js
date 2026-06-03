import express from "express";
import cors from "cors";
import aiRoutes from "../routes/ai.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS bloqueado para: ${origin}`));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // ← añade esto, Better Auth usa cookies
  }),
);

app.use(express.json());
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.json({ status: "Backend funcionando 🚀" });
});

// process.on("uncaughtException", (err) => {
//   console.error("Uncaught Exception:", err);
// });

// process.on("unhandledRejection", (err) => {
//   console.error("Unhandled Rejection:", err);
// });

export const app;
