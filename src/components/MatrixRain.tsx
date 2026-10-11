import { useEffect, useRef } from "react";

// Decorative digital rain used in the home hero. Honors `prefers-reduced-motion`.
// Source pattern adapted from the sitetrace hero.
const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0, height = 0, columns: { y: number; speed: number }[] = [];
    function resize() {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = new Array(Math.floor(width / 18)).fill(0).map(() => ({ y: Math.random() * -height, speed: 0.6 + Math.random() * 0.8 }));
    }
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    function draw() {
      if (!ctx) return;
      ctx.fillStyle = "oklch(0.115 0.005 160 / 0.16)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "oklch(0.72 0.18 295 / 70%)";
      ctx.font = "13px JetBrains Mono, monospace";
      for (let i = 0; i < columns.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * 18;
        ctx.fillText(char, x, columns[i].y);
        columns[i].y += 18 * columns[i].speed;
        if (columns[i].y > height + 100) {
          columns[i].y = -20;
        }
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  return <div className="matrix-background" aria-hidden>
    <canvas ref={canvasRef} className="matrix-rain" />
    <div className="matrix-shade" />
  </div>;
}
