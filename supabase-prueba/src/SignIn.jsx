import { useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage("Error: ", error.message);
    } else {
      setMessage("Credenciales correctas, bienvenido al sistema");
      navigate("/home");
    }
  };

  return (
    <div>
      <h1>Sign In Page</h1>

      <form onSubmit={handleSignIn}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
