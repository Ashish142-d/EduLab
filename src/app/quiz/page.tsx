"use client";

import { useState } from "react";
import { Sparkles, Trophy, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

type Q = { question: string; options: string[]; answer: string };

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<Q[]>([]);
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const generate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setQuestions([]);
    setSelected({});
    setScore(null);
    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (data.questions) setQuestions(data.questions);
      else alert(data.error || "Failed to generate quiz");
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const submit = () => {
    let s = 0;
    questions.forEach((q, i) => {
      if (selected[i] === q.answer) s++;
    });
    setScore(s);
    if (s === questions.length && questions.length > 0) {
      confetti({ particleCount: 160, spread: 80, colors: ["#a855f7", "#f5c451", "#22d3ee"] });
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h2 className="text-3xl font-bold">AI Quiz Generator</h2>
      <p className="mt-2 text-gray-400">
        Generate a multiple-choice quiz on any science topic instantly.
      </p>

      <div className="glass mt-6 flex flex-col gap-3 p-5 sm:flex-row">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generate()}
          placeholder="e.g. Projectile Motion, Photosynthesis, Acids & Bases"
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-100 outline-none focus:border-purple/50"
        />
        <button onClick={generate} disabled={loading} className="btn-primary px-5 py-3 disabled:opacity-50">
          <Sparkles className="h-4 w-4" /> {loading ? "Generating…" : "Generate"}
        </button>
      </div>

      {score !== null && (
        <div className="glass mt-6 flex items-center gap-3 p-5 text-center">
          <Trophy className="h-6 w-6 text-gold" />
          <p className="text-lg font-semibold text-gray-100">
            You scored {score} / {questions.length}
          </p>
          <button onClick={() => { setSelected({}); setScore(null); }} className="btn-ghost ml-auto px-3 py-2 text-sm">
            <RotateCcw className="h-4 w-4" /> Retry
          </button>
        </div>
      )}

      <div className="mt-6 space-y-5">
        {questions.map((q, i) => (
          <div key={i} className="glass p-5">
            <p className="font-medium text-gray-100">
              {i + 1}. {q.question}
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, j) => {
                const isSel = selected[i] === opt;
                const isAns = q.answer === opt;
                const showCorrect = score !== null && isAns;
                return (
                  <button
                    key={j}
                    onClick={() => setSelected((s) => ({ ...s, [i]: opt }))}
                    disabled={score !== null}
                    className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                      isSel
                        ? "border-purple bg-purple/10 text-purple-light"
                        : "border-white/10 bg-white/5 text-gray-300"
                    } ${showCorrect ? "border-emerald bg-emerald/10 text-emerald-bright" : ""}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {questions.length > 0 && score === null && (
        <button onClick={submit} className="btn-primary mt-6">
          Submit Answers
        </button>
      )}
    </div>
  );
}
