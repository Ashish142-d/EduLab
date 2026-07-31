"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import Link from "next/link";
import { Flame, Trophy, Sparkles, ArrowRight, Check, Bookmark, BookOpen } from "lucide-react";

function Notes() {
  const [notes, setNotes] = useState("");
  useEffect(() => {
    setNotes(localStorage.getItem("edulab-notes") ?? "");
  }, []);
  return (
    <div className="glass p-6">
      <h3 className="font-semibold text-gray-100">My Notes</h3>
      <textarea
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
          localStorage.setItem("edulab-notes", e.target.value);
        }}
        placeholder="Jot down key concepts, formulas, observations…"
        className="mt-3 h-28 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-gray-200 outline-none focus:border-purple/50"
      />
      <p className="mt-2 text-xs text-gray-500">Saved automatically on this device.</p>
    </div>
  );
}

function Bookmarks() {
  const [list, setList] = useState<{ id: string; title: string }[]>([]);
  useEffect(() => {
    try {
      setList(JSON.parse(localStorage.getItem("edulab-bookmarks") ?? "[]"));
    } catch {
      setList([]);
    }
  }, []);
  const remove = (id: string) => {
    const next = list.filter((b) => b.id !== id);
    setList(next);
    localStorage.setItem("edulab-bookmarks", JSON.stringify(next));
  };
  return (
    <div className="glass p-6">
      <h3 className="flex items-center gap-2 font-semibold text-gray-100">
        <Bookmark className="h-4 w-4 text-purple-light" /> Bookmarks
      </h3>
      <ul className="mt-3 space-y-2 text-sm">
        {list.length === 0 ? (
          <li className="text-gray-500">No bookmarks yet.</li>
        ) : (
          list.map((b) => (
            <li key={b.id} className="flex items-center justify-between rounded-lg border border-purple/15 bg-purple/5 px-3 py-2">
              <span className="text-gray-300">{b.title}</span>
              <button onClick={() => remove(b.id)} className="text-xs text-gray-500 hover:text-red-400">
                remove
              </button>
            </li>
          ))
        )}
      </ul>
      <button
        onClick={() => {
          const b = { id: "proj-motion", title: "Projectile Motion" };
          const next = [...list.filter((x) => x.id !== b.id), b];
          setList(next);
          localStorage.setItem("edulab-bookmarks", JSON.stringify(next));
        }}
        className="btn-ghost mt-3 px-3 py-2 text-sm"
      >
        + Bookmark Projectile Motion
      </button>
    </div>
  );
}

export default function Dashboard() {
  const [claimed, setClaimed] = useState(false);
  const claim = () => {
    setClaimed(true);
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ["#a855f7", "#f5c451", "#22d3ee"] });
  };

  const stats = [
    { label: "XP", value: "2,480", color: "text-purple-light" },
    { label: "Level", value: "12", color: "text-purple-light" },
    { label: "Streak", value: "7 days", color: "text-gold" },
    { label: "Experiments", value: "9", color: "text-cyan" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6">
      <h2 className="text-3xl font-bold">Student Dashboard</h2>
      <p className="mt-2 text-gray-400">Your learning at a glance.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass hover-lift p-5">
            <p className="text-xs uppercase tracking-wide text-gray-400">{s.label}</p>
            <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="glass p-6">
          <h3 className="font-semibold text-gray-100">Today&apos;s Progress</h3>
          <div className="mt-4 flex items-center gap-5">
            <div className="relative h-28 w-28">
              <svg className="h-28 w-28 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#g)" strokeWidth="3" strokeDasharray="72 28" strokeLinecap="round" />
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 grid place-items-center text-lg font-bold text-purple-light">72%</span>
            </div>
            <div>
              <p className="text-sm text-gray-400">You&apos;re on a 7-day streak!</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-gold">
                <Flame className="h-4 w-4" /> Keep it going
              </p>
            </div>
          </div>
        </div>

        <div className="glass p-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-light" />
            <h3 className="font-semibold text-gray-100">AI Recommendation</h3>
          </div>
          <p className="mt-3 text-sm text-gray-300">
            Based on your progress, try <span className="text-purple-light">Projectile Motion</span> next — it
            builds directly on what you just learned about forces.
          </p>
          <Link href="/experiments/projectile" className="btn-ghost mt-4 px-4 py-2 text-sm">
            Open experiment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="glass p-6">
          <h3 className="font-semibold text-gray-100">Continue Learning</h3>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-purple/15 bg-purple/5 p-4">
            <div>
              <p className="font-medium text-gray-100">Projectile Motion</p>
              <p className="text-xs text-gray-400">Physics • 60% complete</p>
            </div>
            {claimed ? (
              <span className="flex items-center gap-1 text-emerald">
                <Check className="h-4 w-4" /> Claimed
              </span>
            ) : (
              <button onClick={claim} className="btn-primary px-4 py-2 text-sm">
                Claim XP
              </button>
            )}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3">
            <BookOpen className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Recent: Acid–Base Titration, Cell Division</span>
          </div>
        </div>

        <div className="glass p-6">
          <h3 className="font-semibold text-gray-100">Achievements</h3>
          <div className="mt-4 flex flex-wrap gap-4">
            {[
              { name: "First Launch", icon: "Rocket", locked: false },
              { name: "Quiz Master", icon: "Trophy", locked: false, gold: true },
              { name: "100 Day Streak", icon: "Crown", locked: true, gold: true },
            ].map((a) => (
              <div
                key={a.name}
                className={`flex w-32 flex-col items-center gap-2 rounded-2xl border p-4 text-center ${
                  a.locked
                    ? "border-white/10 opacity-40"
                    : a.gold
                    ? "border-gold/40 bg-gold/5 shadow-glow-gold"
                    : "border-purple/30 bg-purple/5"
                }`}
              >
                <span className="text-2xl">{a.icon}</span>
                <span className="text-xs font-medium text-gray-200">{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Notes />
        <Bookmarks />
      </div>
    </div>
  );
}
