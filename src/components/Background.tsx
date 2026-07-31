"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      a: Math.random(),
      s: Math.random() * 0.015 + 0.004,
    }));

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        st.a += st.s;
        const tw = 0.5 + 0.5 * Math.sin(st.a * Math.PI * 2);
        ctx.beginPath();
        ctx.arc(st.x * w, st.y * h, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${0.25 + tw * 0.6})`;
        ctx.fill();
      }
      // a few faint constellation lines
      ctx.strokeStyle = "rgba(139,92,246,0.06)";
      ctx.lineWidth = 1;
      for (let i = 0; i < stars.length - 1; i += 9) {
        const a = stars[i];
        const b = stars[i + 1];
        const dx = (a.x - b.x) * w;
        const dy = (a.y - b.y) * h;
        if (dx * dx + dy * dy < 26000) {
          ctx.beginPath();
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* aurora blobs */}
      <div className="absolute -top-40 -left-40 h-[40rem] w-[40rem] rounded-full bg-purple/30 blur-[120px] animate-aurora" />
      <div
        className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-cyan/20 blur-[120px] animate-aurora"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-[-10rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-electric/20 blur-[120px] animate-aurora"
        style={{ animationDelay: "-11s" }}
      />
      {/* grid */}
      <div className="absolute inset-0 grid-overlay opacity-60" />
      {/* starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-space via-navy-900/60 to-space" />
    </div>
  );
}
