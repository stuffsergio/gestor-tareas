// src/lib/auth.js
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // ← añade esto

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
