import { MoveLeft, MoveRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Arrows({ texto }) {
  const [visible, setVisible] = useState(false);

  return (
    <Link
      to={"/"}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="text-sm opacity-70 flex flex-row justify-center gap-3"
    >
      <MoveLeft
        className={`w-4 h-auto transition-all duration-300 transform ease-in-out
                  ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}
                    `}
      />
      <button
        className={`satoshi-bold rounded-full text-sm font-bold tracking-tight transition-all duration-500 transform
                  ${visible ? "translate-x-0" : "-translate-x-[38%]"}
                `}
      >
        {texto}
      </button>
    </Link>
  );
}
