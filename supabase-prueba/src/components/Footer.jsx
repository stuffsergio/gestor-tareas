import { useState } from "react";

export default function Footer() {
  return (
    <div className="sticky bottom-0 min-h-[10dvh] w-full py-5 flex flex-row items-center justify-center border-t border-[#1f1f1f]">
      <div className="flex flex-row w-[20dvw] items-center justify-center gap-6 text-[#a1a1a1d7]">
        <div className="text-sm">@ 2026 RemAInd</div>
        <div className="opacity-20">|</div>
        <div className="flex flex-row gap-3">
          <div className="group">
            <a
              href="#"
              className="transition-all transform duration-180 group-hover:opacity-60"
            >
              <img
                src="../GitHub.svg"
                alt="github"
                className="w-5 h-auto"
              ></img>
            </a>
          </div>
          <div className="group">
            <a
              href="#"
              className="transition-all transform duration-180 group-hover:opacity-60"
            >
              <img
                src="../LinkedIn.svg"
                alt="linkedin"
                className="w-5 h-auto"
              />
            </a>
          </div>
          <div className="group">
            <a
              href="#"
              className="transition-all transform duration-180 group-hover:opacity-60"
            >
              <img src="../X.svg" alt="x" className="w-5 h-auto"></img>
            </a>
          </div>
        </div>
        <div className="absolute right-20 group">
          <a
            href="/privacy.html"
            className="text-xs transition-all transform duration-180 group-hover:opacity-60"
          >
            Política de privacidad
          </a>
        </div>
      </div>
    </div>
  );
}
