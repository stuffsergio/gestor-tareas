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
  MousePointerClick,
  BotMessageSquare,
  ClockAlert,
  WashingMachine,
  CalendarCheck2,
  ShieldUser,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-none h-screen flex flex-col">
      <div className="relative">
        <NavBar id={1} />
      </div>
      <div className="flex flex-row h-full">
        <div className="relative group bg-cover bg-center flex-2 flex flex-col justify-center items-start border-r border-[#1f1f1f]">
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
          <div className="px-20 py-5 group-hover:animate-[shake-soft_0.4s_ease-in-out]">
            <Link to="/signup">
              <Button />
            </Link>
          </div>
        </div>
        <div className="flex-3 flex flex-col w-full justify-center">
          <div className="flex-1 h-[35dvh] flex flex-row gap-8 pt-8 pb-4 px-8">
            <div
              style={{
                backgroundImage: "url('/fondo3.svg')",
                width: "100%",
                height: "100%",
              }}
              className="relative group flex-1  bg-center bg-no-repeat flex flex-col justify-center items-center gap-6 border border-[#1f1f1f]"
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
            <div className="relative group flex-2 flex flex-col items-start border border-[#1f1f1f] p-6 z-10 bg-black">
              <div className="relative flex flex-col items-start justify-end w-full h-full gap-3">
                <div className="-z-10 relative flex flex-col justify-center w-full gap-3 px-14">
                  <div className="w-full flex flex-row items-center justify-between px-3 py-1 gap-3 border border-[#F4A259]">
                    <p>En solo 1 click</p>{" "}
                    <MousePointerClick className="w-4 h-auto group-hover:animate-[shake-soft_0.4s_ease-in-out]" />
                  </div>
                  <div className="w-full flex flex-row items-between justify-between px-3 py-1 gap-3 border border-[#386291]">
                    <p>No te olvides de poner la lavadora</p>
                    <WashingMachine className="w-4 h-auto group-hover:animate-[shake-soft_0.4s_ease-in-out]" />
                  </div>
                  <div className="w-full flex flex-row items-center justify-between px-3 py-1 gap-3 border border-[#9d5b4f]">
                    <p>Trabaja sin preocupaciones</p>
                    <ClockAlert className="w-4 h-auto group-hover:animate-[shake-soft_0.4s_ease-in-out]" />
                  </div>
                </div>
                <div className="z-10 absolute h-full w-full bg-linear-to-t from-black from-30% to-transparent to-100%"></div>
                <div className="z-20 flex flex-row justify-center items-center">
                  <TypeAnimation
                    sequence={[
                      "Frictionless",
                      1200,
                      "Fully Autonomous",
                      1500,
                      "Seamless",
                      1500,
                    ]}
                    style={{ fontSize: "24px" }}
                    repeat={Infinity}
                  />
                  <div className="absolute right-10 bg-white rounded-full p-2">
                    <BotMessageSquare className="w-5 h-auto text-black group-hover:animate-[shake-soft_0.4s_ease-in-out]" />
                  </div>
                </div>
              </div>

              <Cruces />
            </div>
          </div>
          <div className="flex-1 flex flex-row gap-8 pt-4 pb-8 px-8">
            <div className="relative group flex-2 border border-[#1f1f1f] flex flex-col justify-center gap-16 items-center p-4">
              <div className="w-full flex flex-row items-center justify-center gap-2 px-8">
                <div className="relative">
                  <div className="bg-white rounded-full p-2">
                    <ShieldUser className="w-6 h-auto text-black group-hover:animate-[shake-soft_0.4s_ease-in-out]" />
                  </div>
                  <p className="absolute left-1/2 -translate-x-1/2 translate-y-1 satoshi-bold text-sm">
                    User
                  </p>
                </div>
                <div className="h-px w-[60%] bg-[#1f1f1f]"></div>

                <div className="relative">
                  <div className="bg-white rounded-full p-2">
                    <FingerprintPattern className="w-6 h-auto text-black group-hover:animate-[shake-soft_0.4s_ease-in-out]" />
                  </div>
                  <p className="absolute left-1/2 -translate-x-1/2 translate-y-1 satoshi-bold text-sm">
                    AI
                  </p>
                </div>
                <div className="h-px w-[60%] bg-[#1f1f1f]"></div>

                <div className="relative">
                  <div className="bg-white rounded-full p-2">
                    <CalendarCheck2 className="w-6 h-auto text-black group-hover:animate-[shake-soft_0.4s_ease-in-out]" />
                  </div>
                  <p className="absolute left-1/2 -translate-x-1/2 translate-y-1 satoshi-bold text-sm">
                    Calendar
                  </p>
                </div>
              </div>
              <div className="z-10 absolute inset-0 h-full w-full bg-linear-to-t from-black from-48% to-transparent to-100%"></div>
              <div className="z-20 flex flex-row items-center justify-center gap-5 px-6">
                <div>
                  <img
                    src="/calendar.png"
                    alt="calendario"
                    className="w-12 h-auto group-hover:animate-[shake-soft_0.4s_ease-in-out]"
                  />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <h2 className="text-lg/snug tracking-tight satoshi-bold">
                    Integra tu calendario
                  </h2>
                  <p className="text-sm tracking-tight">
                    Mantén tus tareas pegadas a ti
                  </p>
                </div>
              </div>
              <Cruces />
            </div>

            <div className="relative flex-1 border border-[#1f1f1f]">
              <h1>No sé qué poner aquí</h1>
              <Cruces />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
