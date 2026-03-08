import { askLLM } from "./lib/api";
import { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [res, setRes] = useState("");
  async function preguntar(message) {
    if (message.length === 0) {
      setRes("Debes introducir texto");
      return;
    }
    const response = await askLLM(message);

    setRes(response);
  }

  return (
    <>
      <div className="flex flex-col gap-30">
        <div className="flex flex-row gap-10">
          <input
            type="text"
            name="message"
            id="message"
            className="border border-white rounded-md px-3 py-1.5 text-sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={() => preguntar(message)}>Enviar</button>
        </div>
        <div>{res && <p>{res}</p>}</div>
      </div>
    </>
  );
}
