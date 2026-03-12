import { useState } from "react";

export default function Footer() {
  return (
    <div className="sticky bottom-0 h-[10dvh] w-full py-5 flex flex-row items- justify-center">
      <div className="flex flex-row w-[20dvw] items-center justify-center gap-6 text-[#a1a1a1d7]">
        <div className="text-sm">@ 2026 RemAInd</div>
        <div className="opacity-20">|</div>
        <div className="flex flex-row gap-3">
          <div className="group">
            <a href="#" className="group group-hover:opacity-100">
              <img
                src="../GitHub.svg"
                alt="github"
                className="w-5 h-auto"
              ></img>
            </a>
          </div>
          <div className="group">
            <a href="#" className="group-hover:opacity-100">
              <img
                src="../LinkedIn.svg"
                alt="linkedin"
                className="w-5 h-auto"
              />
            </a>
          </div>
          <div className="group">
            <a href="#" className="group-hover:opacity-100">
              <img src="../X.svg" alt="x" className="w-5 h-auto"></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
