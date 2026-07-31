import Link from "next/link";
import { Github, Twitter, Mail, FlaskConical } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5">
      <div className="glass mx-4 mb-8 mt-8 rounded-2xl px-8 py-10">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <FlaskConical className="h-5 w-5 text-gold" />
              Edu<span className="text-gold">Lab</span>
            </div>
            <p className="mt-3 text-sm text-gray-400">
              Interactive virtual science labs with real-time 3D simulations and AI tutoring.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li><Link href="/experiments" className="hover:text-purple-light">Experiments</Link></li>
              <li><Link href="/dashboard" className="hover:text-purple-light">Dashboard</Link></li>
              <li><Link href="/#ai" className="hover:text-purple-light">AI Tutor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@edulab.dev</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-200">Socials</h4>
            <div className="mt-3 flex gap-3 text-gray-400">
              <a href="#" className="hover:text-gold" aria-label="GitHub"><Github className="h-5 w-5" /></a>
              <a href="#" className="hover:text-cyan" aria-label="Twitter"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-purple-light" aria-label="Mail"><Mail className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          Made with <span className="text-gold">❤</span> for Science
        </p>
      </div>
    </footer>
  );
}
