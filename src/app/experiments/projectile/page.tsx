import ProjectileExperiment from "@/components/ProjectileExperiment";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function ProjectilePage() {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-light"
      >
        <ArrowLeft className="h-4 w-4" /> Dashboard
      </Link>
      <h2 className="mt-4 text-3xl font-bold">Projectile Motion</h2>
      <p className="mt-2 text-gray-400">
        Analyze kinematics under a constant gravity field.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr_320px]">
        {/* LEFT — Theory + AI */}
        <aside className="glass p-6">
          <h3 className="font-semibold text-gray-100">Theory</h3>
          <p className="mt-3 text-sm text-gray-400">
            A projectile follows a parabolic path set by its initial speed and
            launch angle. Horizontal motion is uniform; vertical motion is
            accelerated by gravity (g ≈ 9.81 m/s²).
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li>• Range R = v²·sin(2θ) / g</li>
            <li>• Max height H = (v·sinθ)² / (2g)</li>
            <li>• Time of flight T = 2v·sinθ / g</li>
          </ul>
          <Link
            href="/#ai"
            className="mt-6 inline-flex items-center gap-2 text-sm text-purple-light hover:underline"
          >
            <Sparkles className="h-4 w-4" /> Ask the AI tutor
          </Link>
        </aside>

        {/* CENTER — 3D simulation */}
        <div className="glass overflow-hidden p-2">
          <ProjectileExperiment />
        </div>

        {/* RIGHT — Live values + formula */}
        <aside className="glass p-6">
          <h3 className="font-semibold text-gray-100">Live Values</h3>
          <p className="mt-2 text-xs text-gray-500">
            Updates in real time inside the simulation.
          </p>
          <div className="mt-4 space-y-3">
            {[
              ["Range", "— m"],
              ["Max Height", "— m"],
              ["Time of Flight", "— s"],
              ["Impact Velocity", "— m/s"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between rounded-lg border border-purple/15 bg-purple/5 px-3 py-2 text-sm"
              >
                <span className="text-gray-400">{k}</span>
                <span className="font-mono text-purple-light">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-gold/30 bg-gold/5 p-4">
            <p className="text-xs font-semibold text-gold">Formula</p>
            <p className="mt-1 font-mono text-sm text-gray-200">
              R = v²·sin(2θ) / g
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
