import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

export default function NavBar({ id }) {
  const [active, setActive] = useState(id);
  const { session } = useAuth();

  const autenticado = session?.user?.role === "authenticated";

  // ESTADOS RESPONSIVE MOBILE
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <nav className="sticky top-0 flex flex-row items-center justify-between border-b border-[#1f1f1f] w-full md:h-[8dvh] h-[7dvh] md:px-0 pl-10 pr-5">
      <div className="md:flex-2 flex flex-col">
        <span className="md:px-20">
          <a href="/" className="text-xl">
            RemAInd
          </a>
        </span>
      </div>
      <div className="md:flex hidden flex-3 h-full flex-row justify-center items-center text-base border-l border-[#1f1f1f]">
        <Link
          to="/tareas"
          className={`flex-1 h-full flex flex-col items-center justify-center hover:cursor-pointer hover:bg-[#1f1f1f]/50 transition-all duration-180 border-b border-r ${active === 1 ? "border-b-white border-r-[#1f1f1f]" : "border-transparent"}`}
          onClick={() => setActive(1)}
        >
          Gestor de Tareas
        </Link>

        <Link
          to="/chat"
          className={`flex-1 h-full flex flex-col items-center justify-center hover:cursor-pointer hover:bg-[#1f1f1f]/50 transition-all duration-180 border-b border-x ${active === 2 ? "border-b-white border-x-[#1f1f1f]" : "border-transparent"}`}
          onClick={() => setActive(2)}
        >
          ChatAI
        </Link>

        <Link
          to="/pricing"
          className={`flex-1 h-full flex flex-col items-center justify-center hover:cursor-pointer hover:bg-[#1f1f1f]/50 transition-all duration-180 border-b border-x ${active === 3 ? "border-b-white border-x-[#1f1f1f]" : "border-transparent"}`}
          onClick={() => setActive(3)}
        >
          Pricing
        </Link>

        <Link
          to="/issues"
          className={`flex-1 h-full flex flex-col items-center justify-center hover:cursor-pointer hover:bg-[#1f1f1f]/50 transition-all duration-180 border-b border-l ${active === 4 ? "border-b-white border-l-[#1f1f1f]" : "border-transparent"}`}
          onClick={() => setActive(4)}
        >
          Report
        </Link>

        <div className="flex-1 h-full flex flex-col items-center justify-center hover:cursor-pointer">
          {autenticado ? (
            <Link
              className="satoshi-bold h-full w-full flex flex-col items-center justify-center text-black bg-[#fafaf9] hover:bg-[#fafaf9]/85"
              to="/dashboard"
            >
              <button>ENTRAR</button>
            </Link>
          ) : (
            <Link
              className="satoshi-bold h-full w-full flex flex-col items-center justify-center text-black bg-[#fafaf9] hover:bg-[#fafaf9]/85"
              to="/login"
            >
              <button>INICIAR SESIÓN</button>
            </Link>
          )}
        </div>
      </div>

      {/* MOBILE RESPONSIVE */}
      <div className="md:hidden flex">
        <span>
          <Menu onClick={() => setOpenMenu(true)} className="w-6 h-auto" />
        </span>
      </div>

      {openMenu && (
        <div className="absolute inset-0 md:hidden flex flex-col">
          <div className="absolute w-dvw h-dvh bg-black" />
          <div className="relative py-14 px-6">
            <ul className="flex flex-col gap-8 text-white">
              <Link to="/tareas" className="text-3xl">
                Tareas
              </Link>
              <Link to="/chat" className="text-3xl">
                ChatAI
              </Link>
              <Link to="/login" className="text-3xl">
                Entrar
              </Link>
              <button
                onClick={() => setOpenMenu(false)}
                className="absolute top-6 right-6"
              >
                <X className="w-6 h-auto" />
              </button>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
