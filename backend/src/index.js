import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/ai.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/ai", aiRoutes);

app.listen(PORT, () => console.log("Servidor running at localhost:3000"));
