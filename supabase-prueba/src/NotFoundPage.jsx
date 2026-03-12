import { Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { useState } from "react";
import {
  MoveLeft,
  MoveRight,
  Sparkles,
  House,
  ClipboardList,
} from "lucide-react";

export default function NotFoundPage() {
  const [visibleHome, setVisibleHome] = useState(false);
  const [visibleChat, setVisibleChat] = useState(false);

  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <NavBar />
      <div className="flex flex-col items-center justify-center w-full gap-10">
        <div className="error-container">
          <svg
            viewBox="0 0 400 200"
            xmlns="http://www.w3.org/2000/svg"
            className="svg-404"
          >
            <path className="line line1" d="M80 150V50L40 110H100" />

            <g className="searching-eye opacity-pulse">
              <circle className="eye-outer" cx="200" cy="100" r="45" />
              <circle className="eye-pupil" cx="200" cy="100" r="5" />
              <path className="eye-lid" d="M155 100 Q200 40 245 100" />
            </g>

            <path className="line line2" d="M320 150V50L280 110H340" />
          </svg>
        </div>

        <div className="">
          <h1 className="satoshi-bold text-2xl">
            No hay nada para ver por aquí... por ahora
          </h1>
        </div>

        <div className="w-full flex flex-row justify-center gap-0 border-y border-[#1f1f1f]">
          <Link
            to={"/"}
            onMouseEnter={() => setVisibleHome(true)}
            onMouseLeave={() => setVisibleHome(false)}
          >
            <div className="relative group w-[22dvw] h-20 bg-black text-white border-l border-[#1f1f1f] rounded-none px-5 py-4 flex flex-col items-start justify-center">
              <div className="flex flex-row gap-3 items-center justify-center">
                <MoveLeft
                  className={`w-5 h-auto transition-all duration-300 transform ease-in-out
                  ${visibleHome ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
                    `}
                />

                <span class="hidden md:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 font-mono -mt-px text-[10px] text-[#a1a1a1]/50 select-none z-10">
                  +
                </span>
                <span class="hidden md:block absolute -bottom-2 left-0 -translate-x-1/2 font-mono text-[10px] text-[#a1a1a1]/50 select-none z-10">
                  +
                </span>

                <button
                  className={`satoshi-bold rounded-full text-lg font-bold tracking-tight transition-all duration-500 transform
                  ${visibleHome ? "translate-x-0" : "-translate-x-[38%]"}
                `}
                >
                  HomePage
                </button>
                <House
                  className="group-hover:animate-[shake-soft_0.4s_ease-in-out] absolute top-5 right-5 w-5 h-auto text-[#fe9a00]"
                  strokeWidth={2.5}
                />
              </div>
              <p className="text-sm opacity-70">Decide your limits</p>
            </div>
          </Link>
          <div>
            <Link to={"/tareas"}>
              <div className="relative group w-[22dvw] h-20 bg-black text-white border-x border-[#1f1f1f] rounded-none px-5 py-4 flex flex-col items-start justify-center">
                <div className="flex flex-row gap-3 items-center justify-center">
                  <span class="hidden md:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 font-mono -mt-px -ml-px text-[10px] text-[#a1a1a1]/50 select-none z-10">
                    +
                  </span>
                  <span class="hidden md:block absolute -bottom-2 left-0 -translate-x-1/2 font-mono -ml-px text-[10px] text-[#a1a1a1]/50 select-none z-10">
                    +
                  </span>

                  <button
                    className={`satoshi-bold rounded-full text-lg font-bold tracking-tight transition-all duration-500 transform
                    `}
                  >
                    Task Manager
                  </button>
                  <ClipboardList
                    className="group-hover:animate-[shake-soft_0.4s_ease-in-out] absolute top-5 right-5 w-5 h-auto text-[#1557e6]"
                    strokeWidth={2.5}
                  />
                </div>
                <p className="text-sm opacity-70">Complete your dreams</p>
              </div>
            </Link>
          </div>
          <div>
            <Link
              to={"/chat"}
              onMouseEnter={() => setVisibleChat(true)}
              onMouseLeave={() => setVisibleChat(false)}
            >
              <div className="relative group w-[22dvw] h-20 bg-black text-white border-r border-[#1f1f1f] rounded-none px-5 py-4 flex flex-col items-start justify-center">
                <div className="flex flex-row gap-3 items-center justify-between">
                  <MoveRight
                    className={`w-5 h-auto transition-all duration-300 transform ease-in-out
                  ${visibleChat ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
                    `}
                  />

                  <span class="hidden md:block absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 font-mono -mt-px -ml-px text-[10px] text-[#a1a1a1]/50 select-none z-10">
                    +
                  </span>
                  <span class="hidden md:block absolute -bottom-2 left-0 -translate-x-1/2 font-mono -ml-px text-[10px] text-[#a1a1a1]/50 select-none z-10">
                    +
                  </span>

                  <span class="hidden md:block absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 font-mono -mt-px -ml-px text-[10px] text-[#a1a1a1]/50 select-none z-10">
                    +
                  </span>
                  <span class="hidden md:block absolute -bottom-2 right-0 translate-x-1/2 font-mono -ml-px text-[10px] text-[#a1a1a1]/50 select-none z-10">
                    +
                  </span>

                  <button
                    className={`satoshi-bold rounded-full text-lg font-bold tracking-tight transition-all duration-500 transform
                  ${visibleChat ? "translate-x-0" : "-translate-x-[90%]"}
                `}
                  >
                    Chat
                  </button>
                  <Sparkles
                    className="group-hover:animate-[shake-soft_0.4s_ease-in-out]  absolute top-5 right-5 w-5 h-auto text-[#ff1056]"
                    strokeWidth={2.5}
                  />
                </div>
                <p className="text-sm opacity-70">
                  AI Assistant for your tasks
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
