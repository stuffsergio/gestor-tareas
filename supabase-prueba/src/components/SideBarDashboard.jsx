import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { House, ClipboardList, Bot } from "lucide-react";

export default function SideBarDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-dvh border flex flex-row">
      <div>
        <div className="p-5">
          <img
            src="/icons/icon-maskable-512.png"
            alt="icono web"
            className="w-6 h-auto"
          />
        </div>
        <div className="flex flex-col gap-8">
          <ul
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="flex flex-col gap-10 px-4 py-6"
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
        <motion.div className="flex flex-col">
          <div className="p-5">
            <img
              src="/icons/icon-maskable-512.png"
              alt="icono web"
              className="w-6 h-auto opacity-0"
            />
          </div>
          <ul className="flex flex-col gap-10 px-4 py-6">
            <li>
              <Link to="/tareas">Tareas</Link>
            </li>
            <li>
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              <Link>Profile</Link>
            </li>
          </ul>
        </motion.div>
      )}
    </div>
  );
}
