"use client";

import { useState } from "react";
import { Sparkles, Send } from "lucide-react";

export default function AITutor({
  endpoint = "/api/ai",
  placeholder = "Ask the tutor…",
  title = "EduLab AI",
  subtitle = "Always here to help",
}: {
  endpoint?: string;
  placeholder?: string;
  title?: string;
  subtitle?: string;
}) {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setReply("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, question: input }),
      });
      const data = await res.json();
      if (data.text) {
        setReply(data.text);
      } else {
        setReply(
          "AI is temporarily unavailable — please check the API key / quota in .env."
        );
      }
    } catch (e) {
      setReply("Request failed: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass mx-auto max-w-2xl p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-purple to-indigo text-white shadow-glow-purple">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-semibold text-gray-100">{title}</h3>
          <p className="text-xs text-purple-light">{subtitle}</p>
        </div>
      </div>

      <div className="mt-5 min-h-[120px] rounded-xl border border-purple/20 bg-purple/5 p-4 text-sm text-gray-200">
        {loading ? (
          <span className="flex items-center gap-1 text-purple-light">
            <span className="h-2 w-2 animate-bounce rounded-full bg-purple [animation-delay:-0.2s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-purple [animation-delay:-0.1s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-purple" />
            <span className="ml-2">thinking…</span>
          </span>
        ) : reply ? (
          <p className="whitespace-pre-wrap leading-relaxed">{reply}</p>
        ) : (
          <p className="text-gray-500">
            {placeholder.replace("…", "") || "Ask me anything about an experiment."}
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder={placeholder}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-purple/50"
        />
        <button
          onClick={ask}
          disabled={loading}
          className="btn-primary px-4 py-3 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
