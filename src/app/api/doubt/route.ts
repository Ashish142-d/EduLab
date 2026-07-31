import { NextRequest } from "next/server";
import { callAI } from "@/lib/ai";

const DOUBT =
  "You are EduLab's Doubt Solver for CBSE Class 11 students (Physics, Chemistry, " +
  "Biology, Mathematics — Anup Kumar Rajput / NCERT based). A student has a specific " +
  "doubt about a concept or experiment. Resolve it clearly, correct any misconception, " +
  "and give a short example. Be encouraging and concise.";

export async function POST(req: NextRequest) {
  const { question } = await req.json();
  if (!question) {
    return new Response(JSON.stringify({ error: "Missing question" }), { status: 400 });
  }
  try {
    const text = await callAI(DOUBT, question);
    return new Response(JSON.stringify({ text }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
  }
}
