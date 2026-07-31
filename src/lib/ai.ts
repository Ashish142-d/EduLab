// Provider-agnostic AI helper (OpenAI-compatible chat/completions).
// Works with Mistral, OpenAI, Groq, DeepSeek, OpenRouter — just swap env vars.

const KEY = process.env.AI_API_KEY;
const BASE = process.env.AI_API_BASE ?? "https://api.mistral.ai/v1";
const MODEL = process.env.AI_MODEL ?? "mistral-small-latest";

export async function callAI(system: string, user: string): Promise<string> {
  if (!KEY) throw new Error("AI_API_KEY is not set in .env");
  const res = await fetch(`${BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.7,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`AI request failed (${res.status}): ${detail.slice(0, 300)}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "No response.";
}
