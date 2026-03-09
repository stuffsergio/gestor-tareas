import { useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage("Error: ", error.message);
    } else {
      setMessage("Revisa tu bandeja de entrada para confirmar");
      navigate("/home");
    }
  };

  return (
    <div>
      <h1>Sign Up Page</h1>

      <form onSubmit={handleSignUp}>
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
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
