import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
  const [active, setActive] = useState(1);

  return (
    <nav className="sticky top-0 flex flex-row border-b border-[#1f1f1f] w-full min-h-13">
      <div className="flex-2 flex flex-col justify-center items-baseline">
        <span className="px-20">
          <p className="text-lg">RemAInd</p>
        </span>
      </div>
      <div className="flex-3 h-full flex flex-row justify-center items-center text-sm border-l border-[#1f1f1f]">
        <div
          className={`flex-1 h-full flex flex-col items-center justify-center hover:bg-[#1f1f1f]/50 transition-all duration-180 border-b border-r ${active === 1 ? "border-b-white border-r-[#1f1f1f]" : "border-transparent"}`}
          onClick={() => setActive(1)}
        >
          Gestor de Tareas
        </div>
        <div
          className={`flex-1 h-full flex flex-col items-center justify-center hover:bg-[#1f1f1f]/50 transition-all duration-180 border-b border-x ${active === 2 ? "border-b-white border-x-[#1f1f1f]" : "border-transparent"}`}
          onClick={() => setActive(2)}
        >
          ChatAI
        </div>
        <div
          className={`flex-1 h-full flex flex-col items-center justify-center hover:bg-[#1f1f1f]/50 transition-all duration-180 border-b border-x ${active === 3 ? "border-b-white border-x-[#1f1f1f]" : "border-transparent"}`}
          onClick={() => setActive(3)}
        >
          Pricing
        </div>
        <div
          className={`flex-1 h-full flex flex-col items-center justify-center hover:bg-[#1f1f1f]/50 transition-all duration-180 border-b border-l ${active === 4 ? "border-b-white border-l-[#1f1f1f]" : "border-transparent"}`}
          onClick={() => setActive(4)}
        >
          Report
        </div>
        <div className="flex-1 h-full flex flex-col items-center justify-center">
          <Link
            className="satoshi-bold h-full w-full flex flex-col items-center justify-center text-black bg-[#fafaf9] hover:bg-[#fafaf9]/85"
            to="/signin"
          >
            <button>INICIAR SESIÓN</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
