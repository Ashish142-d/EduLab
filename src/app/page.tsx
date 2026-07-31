import Link from "next/link";
import { ArrowRight, Award, Atom, FlaskConical, Sparkles, Calculator } from "lucide-react";
import AITutor from "@/components/AITutor";

const floatCards = [
  { title: "Projectile Motion", tag: "Physics", color: "text-electric-bright", href: "/experiments/projectile", icon: FlaskConical },
  { title: "Chemical Bonding", tag: "Chemistry", color: "text-emerald-bright", href: "#", icon: Atom },
  { title: "Limits & Derivatives", tag: "Mathematics", color: "text-purple-light", href: "#", icon: Calculator },
  { title: "Cell Structure", tag: "Biology", color: "text-emerald", href: "#", icon: Atom },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* HERO */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center text-center">
        <div className="animate-fade-in-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple/30 bg-purple/10 px-4 py-1.5 text-xs font-medium text-purple-light">
            <Sparkles className="h-3.5 w-3.5" /> AI-Powered Virtual Science Lab
          </span>
          <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">
            Explore Science in a{" "}
            <span className="gradient-text animate-gradient-shift">Living Lab</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Interactive 3D simulations, real-time data, and an AI tutor for{" "}
            <span className="text-purple-light">CBSE Class 11</span> — Physics,
            Chemistry, Biology &amp; Mathematics.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/experiments/projectile" className="btn-primary">
              Launch Physics Lab <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/experiments" className="btn-ghost">
              Browse Experiments
            </Link>
          </div>
        </div>

        {/* floating cards */}
        <div className="mt-16 grid w-full max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {floatCards.map((c, i) => (
            <Link
              key={c.title}
              href={c.href}
              className="glass hover-lift animate-float p-5 text-left"
              style={{ animationDelay: `${i * 1.1}s` }}
            >
              <c.icon className={`h-6 w-6 ${c.color}`} />
              <span className={`mt-3 block text-xs font-semibold uppercase tracking-wide ${c.color}`}>
                {c.tag}
              </span>
              <h3 className="mt-1 font-semibold text-gray-100">{c.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid gap-6 py-16 md:grid-cols-3">
        {[
          {
            icon: FlaskConical,
            title: "Interactive Simulations",
            desc: "Adjust parameters and watch real-time physics, chemistry, and biology unfold in 3D.",
            c: "text-electric-bright",
          },
          {
            icon: Award,
            title: "Progress & XP",
            desc: "Earn XP, unlock badges, and track your learning streak across subjects.",
            c: "text-gold",
          },
          {
            icon: Atom,
            title: "AI Tutoring",
            desc: "Ask anything and get instant, student-friendly CBSE Class 11 explanations.",
            c: "text-purple-light",
          },
        ].map((f) => (
          <div key={f.title} className="glass hover-lift p-6">
            <f.icon className={`h-8 w-8 ${f.c}`} />
            <h3 className="mt-4 font-semibold text-gray-100">{f.title}</h3>
            <p className="mt-2 text-sm text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* AI TUTOR */}
      <section id="ai" className="scroll-mt-28 py-10">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold">Your AI Tutor</h2>
          <p className="mt-2 text-gray-400">
            Ask about any CBSE Class 11 experiment — instantly.
          </p>
        </div>
        <AITutor />
      </section>
    </div>
  );
}
