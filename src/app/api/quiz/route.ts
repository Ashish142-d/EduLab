import { NextRequest } from "next/server";
import { callAI } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const { topic } = await req.json();
  if (!topic) {
    return new Response(JSON.stringify({ error: "Missing topic" }), { status: 400 });
  }

  const system =
    "You are an educational quiz generator. Given a topic, output STRICT JSON: " +
    "an array of 5 objects, each with 'question' (string), 'options' (array of 4 strings), " +
    "and 'answer' (the correct option string, exactly matching one of the options). " +
    "Return ONLY the JSON array, no markdown fences.";
  const user = `Topic: ${topic}`;

  try {
    const raw = await callAI(system, user);
    const json = raw.replace(/```json|```/g, "").trim();
    const questions = JSON.parse(json);
    return new Response(JSON.stringify({ questions }), { status: 200 });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Failed to generate quiz: " + (e as Error).message }),
      { status: 500 }
    );
  }
}
