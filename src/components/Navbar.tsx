"use client";

import Link from "next/link";
import { FlaskConical } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "Home", href: "/" },
  { label: "Experiments", href: "/experiments" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Quiz", href: "/quiz" },
  { label: "Doubt", href: "/doubt" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Teacher", href: "/teacher" },
  { label: "Certificates", href: "/certificates" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="glass flex w-full max-w-6xl items-center justify-between rounded-2xl px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-gold/30 to-purple/30 text-gold shadow-glow-gold">
            <FlaskConical className="h-5 w-5" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Edu<span className="text-gold">Lab</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-gray-300 transition hover:text-purple-light hover:underline decoration-purple/60 underline-offset-4"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
