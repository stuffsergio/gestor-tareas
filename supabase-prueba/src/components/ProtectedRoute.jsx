import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { session } = useAuth();

  if (session === undefined) return <p>Cargando...</p>;
  if (session === null) return <Navigate to="/signin" replace />;

  return children;
}
