import { useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import Arrows from "./components/Arrows";
import { OjoAbierto, OjoTachado } from "./assets/Ojos";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showContraseña, setShowContraseña] = useState(false);

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

  const handleSignInGithub = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:5173/home",
      },
    });

    if (error) {
      setMessage("Error iniciando sesión con GitHub, prueba con otra opción");
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 py-10 px-10 flex flex-col gap-15 justify-center items-center">
      <div className="absolute top-0 left-10">
        <Arrows texto={"Salir"} />
      </div>
      <div className="border border-[#1f1f1f] px-6 py-6 lg:w-[30dvw] md:w-[35dvw] w-[50dvw]">
        <form
          onSubmit={handleSignIn}
          className="flex flex-col justify-center items-center gap-10"
        >
          <div className="flex flex-col gap-1.5 w-full">
            <h1 className="font-bold text-xl">Iniciar sesión</h1>
            <p className="text-sm opacity-70">
              Ingresa tu correo para iniciar sesión
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-5 w-full">
            <div className="flex flex-col gap-1.5 w-full text-sm">
              <label htmlFor="email">Correo</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#1f1f1f] bg-[#1f1f1f]/30 text-[#ededed] px-3 py-1.5 placeholder:text-[#a1a1a1] focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50"
              />
            </div>
            <div className="flex flex-col gap-1.5 w-full text-sm">
              <label htmlFor="password">Secreto</label>
              <div className="relative">
                <input
                  type={showContraseña ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-[#1f1f1f] bg-[#1f1f1f]/30 text-[#ededed] px-3 py-1.5 placeholder:text-[#a1a1a1] focus:outline-none focus:ring-4 focus:ring-white/20 focus:border-white/50"
                />
                <button
                  type="button"
                  onClick={() => setShowContraseña(!showContraseña)}
                  className="absolute top-1/2 right-5 -translate-y-1/2"
                >
                  {showContraseña ? <OjoAbierto /> : <OjoTachado />}
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="w-[30%] px-3 py-1.5 bg-[#0072f5]">
            {loading ? "..." : "Entrar"}
          </button>
        </form>
        <div>
          <button
            type="button"
            onClick={handleSignInGithub}
            className="w-full py-1.5 border border-[#1f1f1f]"
          >
            Entrar con Google
          </button>
        </div>
        <div>
          <a href="/signup" className="text-xs opacity-70 tracking-tight">
            Soy nuevo, crear una cuenta
          </a>
        </div>

        <p>{message}</p>
      </div>
    </div>
  );
}
