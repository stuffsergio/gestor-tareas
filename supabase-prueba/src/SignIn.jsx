import { useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Credenciales incorrectas", error.message);
      setLoading(false);
    } else {
      setMessage("Credenciales correctas, bienvenido al sistema");
      setLoading(false);
      navigate("/home");
    }
  };

  return (
    <div className="py-10 px-10 flex flex-col gap-15 justify-center items-center">
      <h1 className="font-bold text-2xl">Iniciar sesión</h1>

      <form
        onSubmit={handleSignIn}
        className="flex flex-col justify-center items-center gap-10 w-[30dvw] px-4"
      >
        <div className="flex flex-col justify-center items-center gap-5 w-full">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Tu mejor email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#1f1f1f] text-[#ededed] px-3 py-1.5 placeholder:text-[#a1a1a1]"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[#1f1f1f] text-[#ededed] px-3 py-1.5 placeholder:text-[#a1a1a1]"
          />
        </div>
        <button type="submit" className="w-full px-3 py-1.5 bg-[#0072f5]">
          {loading ? "..." : "Entrar"}
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}
