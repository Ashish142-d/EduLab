"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPct((p) => (p >= 100 ? 100 : p + 1));
    }, 18);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-space">
      <div className="flex flex-col items-center">
        <div className="relative h-24 w-24">
          <div className="absolute inset-0 rounded-full border-2 border-purple/30" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-purple border-r-gold" />
          <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-glow-gold" />
        </div>
        <p className="mt-6 text-sm text-purple-light">Loading EduLab…</p>
        <p className="mt-1 font-mono text-gold">{pct}%</p>
        <p className="mt-3 max-w-xs text-center text-xs text-gray-500">
          “Science is a way of thinking much more than a body of knowledge.” —
          Carl Sagan
        </p>
      </div>
    </div>
  );
}
