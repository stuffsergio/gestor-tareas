import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Profile() {
  const { session, user, cerrarSesion } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userMetadata = user.user_metadata;

  const handleLogout = async () => {
    await cerrarSesion();
    navigate("/login");
  };

  return (
    <div className="absolute top-5 right-5 z-20">
      <button onClick={() => setIsOpen(true)}>
        <img
          src={userMetadata.avatar_url}
          alt="user avatar url"
          className="w-10 h-auto rounded-full"
        />
      </button>
      {/* OVERLAY */}
      {isOpen && (
        <div className="relative">
          <div
            onClick={() => setIsOpen(false)}
            className="bg-transparent fixed inset-0 z-20"
          />

          <div className="absolute flex flex-col gap-2 z-30 bg-white/10 border border-white/10 top-5 right-0">
            <div className="flex flex-col gap-0.5 p-3">
              <p className="text-base">{userMetadata.full_name}</p>
              <p className="text-sm opacity-70">{userMetadata.email}</p>
            </div>
            <div className="h-px w-full bg-white/10" />
            <div className="p-3">
              <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
