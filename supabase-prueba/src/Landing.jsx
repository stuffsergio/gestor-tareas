import { Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";
import Cruces from "./components/Cruces";
import {
  AudioLines,
  NotepadTextDashed,
  FingerprintPattern,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-none h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-row h-full">
        <div className="relative bg-cover bg-center flex-2 flex flex-col justify-center items-start border-r border-[#1f1f1f]">
          <div className="flex flex-col justify-center items-start gap-2 px-20">
            <div className="flex flex-row items-center gap-2">
              <span>
                <NotepadTextDashed className="w-4 h-auto" />
              </span>
              <h1 className="text-base/tight">Tu Gestor de Tareas</h1>
            </div>
            <p className="text-2xl/tight tracking-normal satoshi-bold">
              The most comprehensive schedule framework for your mind
            </p>
          </div>
          <img
            src="/prueba1-vertical (1).webp"
            alt="Fondo ruido"
            className="absolute inset-0 h-full w-full -z-20 object-cover opacity-40"
          />
          <div className="px-20 py-5">
            <Link to="/signin">
              <Button />
            </Link>
          </div>
        </div>
        <div className="flex-3 flex flex-col w-full justify-center">
          <div className="flex-1 h-[35dvh] flex flex-row gap-8 pt-8 pb-4 px-8">
            <div
              style={{ backgroundImage: "url('/fondo2.svg')" }}
              className="relative group flex-1 bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center gap-6 border border-[#1f1f1f]"
            >
              <div className="absolute bg-black/20 inset-0 z-10" />
              <Link
                to="/signup"
                className="border p-8 rounded-full pulse-shadow z-20"
              >
                <AudioLines className="w-12 h-auto group-hover:animate-[shake-soft_0.4s_ease-in-out]" />
              </Link>
              <span className="text-white text-sm z-20">
                Prueba el asistente ahora
              </span>

              <Cruces />
            </div>
            <div className="relative flex-2 flex flex-col jusfify-center items-center border border-[#1f1f1f] p-5">
              <div className="flex flex-col items-start justify-baseline gap-4">
                <TypeAnimation
                  sequence={["Frictionless", 700, "Autonomous", 700, "Seamless", 700]}
                  style={{ fontSize: "14px" }}
                  repeat={Infinity}
                />

                <h1>Recibe notificaciones cuando tú quieras</h1>
              </div>

              <Cruces />
            </div>
          </div>
          <div className="flex-1 flex flex-row gap-8 pt-4 pb-8 px-8">
            <div className="relative flex-2 border border-[#1f1f1f] flex flex-row boder-[#1f1f1f]">
              <Link
                to="/signin"
                className="bg-white px-3 py-1.5 rounded-full text-black text-sm"
              >
                Iniciar Sesión
              </Link>
              <Link to="/signup" className="text-sm">
                Registrarse
              </Link>

              <Cruces />
            </div>
            <div className="relative flex-1 border border-[#1f1f1f]">
              <h1>Otra parte del grid (flex)</h1>

              <Cruces />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
