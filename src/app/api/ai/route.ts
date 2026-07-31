import { NextRequest } from "next/server";
import { callAI } from "@/lib/ai";

const TUTOR =
  "You are EduLab's AI tutor for a virtual science lab. Help students understand " +
  "physics, chemistry, and biology experiments with clear, concise, accurate " +
  "explanations aimed at a student. Use simple language and, when helpful, step-by-step reasoning.";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  if (!message) {
    return new Response(JSON.stringify({ error: "Missing message" }), { status: 400 });
  }
  try {
    const text = await callAI(TUTOR, message);
    return new Response(JSON.stringify({ text }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
  }
}
