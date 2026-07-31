import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0a0e27", 900: "#070b1e", 800: "#0d1330", 700: "#131a3f" },
        space: { DEFAULT: "#05060a", 900: "#080a12", 800: "#0c0f1a" },
        electric: { DEFAULT: "#3b82f6", bright: "#60a5fa", deep: "#1d4ed8" },
        cyan: { DEFAULT: "#22d3ee", bright: "#67e8f9" },
        emerald: { DEFAULT: "#10b981", bright: "#34d399" },
        purple: { DEFAULT: "#8b5cf6", amethyst: "#a855f7", deep: "#6d28d9", light: "#c4b5fd" },
        gold: { DEFAULT: "#f5c451", bright: "#fbbf24" },
        indigo: { DEFAULT: "#6366f1" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(59,130,246,0.35)",
        "glow-purple": "0 0 26px rgba(139,92,246,0.45)",
        "glow-cyan": "0 0 26px rgba(34,211,238,0.40)",
        "glow-emerald": "0 0 26px rgba(16,185,129,0.40)",
        "glow-gold": "0 0 26px rgba(245,196,81,0.45)",
        "glow-soft": "0 8px 40px rgba(0,0,0,0.45)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)",
      },
      keyframes: {
        aurora: {
          "0%,100%": { transform: "translate(0,0) scale(1)", opacity: "0.45" },
          "50%": { transform: "translate(6%, -5%) scale(1.18)", opacity: "0.75" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "glow-pulse": {
          "0%,100%": { boxShadow: "0 0 16px rgba(139,92,246,0.30)" },
          "50%": { boxShadow: "0 0 34px rgba(139,92,246,0.60)" },
        },
        spin: { to: { transform: "rotate(360deg)" } },
        "gradient-shift": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        aurora: "aurora 16s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        spin: "spin 1s linear infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
