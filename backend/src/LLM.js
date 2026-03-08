export default async function LLM(systemPrompt, message) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    },
    body: JSON.stringify({
      model: "stepfun/step-3.5-flash:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    }),
  });

  const data = await res.json();
  console.log("DATA COMPLETA - res.json()");
  console.log(data);
  console.log("DATA DEL REASONING LLM");
  console.log(data.choices[0].message);
  return data.choices[0].message.content;
}
