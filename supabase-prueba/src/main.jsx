import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./context/AuthContext.jsx";
import "./index.css";
import App from "./App.jsx";
import { initOneSignal } from "./lib/onesignal";

initOneSignal();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
