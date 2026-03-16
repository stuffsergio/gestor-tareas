import { Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-none h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-row h-full">
        <div className="relative bg-cover bg-center flex-2 flex flex-col justify-center items-start border-r border-[#1f1f1f]">
          <div className="flex flex-col justify-center items-start px-20 border">
            <h1 className="">GESTOR DE TAREAS</h1>
            <p className="text-2xl tracking-normal satoshi-bold">
              The most comprehensive schedule framework for your mind
            </p>
          </div>
          <img
            src="/prueba1-vertical (1).webp"
            alt="Fondo ruido"
            className="absolute inset-0 h-full w-full -z-20 object-cover opacity-60"
          />
          <div>
            <button>
              <Button direc="/signup" />
            </button>
          </div>
        </div>
        <div className="flex-3 w-full flex flex-col gap-20 py-10 justify-center items-center">
          <h1 className="font-bold text-2xl">GESTOR DE TAREAS</h1>
          <div className="flex flex-row gap-10 items-center justify-center">
            <Link
              to="/signin"
              className="bg-white px-3 py-1.5 rounded-full text-black text-sm"
            >
              Iniciar Sesión
            </Link>
            <Link to="/signup" className="text-sm">
              Registrarse
            </Link>
          </div>
          <footer>
            <a href="/privacy.html">Política de privacidad</a>
          </footer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
