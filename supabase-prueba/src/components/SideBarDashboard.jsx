import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { House, ClipboardList, Bot } from "lucide-react";
import { fadeAnimationSidebar } from "../utils/animations";

export default function SideBarDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="h-dvh border flex flex-col">
        <div className="p-5">
          <img
            src="/icons/icon-maskable-512.png"
            alt="icono web"
            className="w-6 h-auto"
          />
        </div>
        <div className="flex flex-col gap-8">
          <ul
            className="flex flex-col gap-10 px-4 py-6"
            onClick={() => setIsOpen(true)}
          >
            <li>
              <House className="w-6 h-auto" />
            </li>
            <li>
              <ClipboardList className="w-6 h-auto" />
            </li>
            <li>
              <Bot className="w-6 h-auto" />
            </li>
          </ul>
        </div>
      </div>
      {isOpen && (
        <div>
          {/* OVERLAY */}
          <div
            onClick={() => setIsOpen(false)}
            className="bg-transparent fixed inset-0 z-20"
          />
          <motion.div
            {...fadeAnimationSidebar}
            className="absolute z-40 flex flex-col bg-white/10"
          >
            <div className="p-5">
              <img
                src="/icons/icon-maskable-512.png"
                alt="icono web"
                className="w-6 h-auto opacity-0"
              />
            </div>
            <ul className="flex flex-col gap-10 px-4 py-6">
              <li>
                <Link>Profile</Link>
              </li>
              <li>
                <Link to="/tareas">Tareas</Link>
              </li>
              <li>
                <Link to="/chat">Chat</Link>
              </li>
            </ul>
          </motion.div>
        </div>
      )}
    </>
  );
}
