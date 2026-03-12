import { Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default function Landing() {
  return (
    <div className="bg-black h-screen flex flex-col justify-between">
      <NavBar />
      <div className="flex flex-col gap-20 px-10 py-10 justify-center items-center z-0">
        <h1 className="font-bold text-2xl">GESTOR DE TAREAS</h1>
        <p className="font-bold">Comprehensive framework for your mind</p>
        <div className="flex flex-row gap-10 items-center justify-center">
          <Link
            to="/signin"
            className="bg-white px-3 py-1.5 rounded-full text-black text-sm"
          >
            Inicar Sesión
          </Link>
          <Link to="/signup" className="text-sm">
            Registrarse
          </Link>
        </div>
        <footer>
          <a href="/privacy.html">Política de privacidad</a>
        </footer>
      </div>
      <Footer />
    </div>
  );
}
