"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export type ExpItem = {
  id: string;
  title: string;
  description: string;
  subject: string;
  cls: string;
};

export default function ExperimentsExplorer({ items }: { items: ExpItem[] }) {
  const [q, setQ] = useState("");

  const filtered = items.filter((e) =>
    (e.title + " " + e.subject).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search experiments…"
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-gray-100 outline-none focus:border-purple/50"
        />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="text-gray-500">No experiments match “{q}”.</p>
        ) : (
          filtered.map((e) => (
            <Link
              key={e.id}
              href="/experiments/projectile"
              className={`glass hover-lift block p-6 ${e.cls}`}
            >
              <span className={`text-xs font-semibold uppercase tracking-wide ${e.cls.split(" ")[0]}`}>
                {e.subject}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-gray-100">{e.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{e.description}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
