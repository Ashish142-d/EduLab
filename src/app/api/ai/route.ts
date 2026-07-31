import { NextRequest } from "next/server";
import { callAI } from "@/lib/ai";

const TUTOR =
  "You are EduLab's AI tutor for a virtual science lab. The student follows the " +
  "CBSE Class 11 curriculum (Physics, Chemistry, Biology, and Mathematics) based on " +
  "Anup Kumar Rajput / NCERT publications. Help students understand experiments with " +
  "clear, concise, accurate explanations aimed at an 11th-grade student. Use simple " +
  "language and, when helpful, step-by-step reasoning with Indian exam-style examples.";

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
