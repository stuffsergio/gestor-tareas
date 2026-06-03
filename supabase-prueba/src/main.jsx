import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { AnimatePresence } from "framer-motion";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AnimatePresence>
        <App />
      </AnimatePresence>
    </AuthProvider>
  </StrictMode>,
);
