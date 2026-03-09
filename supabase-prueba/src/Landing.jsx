import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>GESTOR DE TAREAS</h1>
      <p>Organiza tus ateras y sincronízalas con Google Calendar</p>
      <div>
        <Link to="/signin">Inicar Sesión</Link>
        <Link to="/signup">Registrarse</Link>
      </div>
    </div>
  );
}
