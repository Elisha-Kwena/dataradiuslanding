"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; hub: boolean };
type Packet = { a: Node; b: Node; t: number };

/**
 * Animated network background (canvas). Fills its nearest positioned parent.
 * Parent needs `relative`. Dark backgrounds only.
 */
export default function NetworkBackground({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !host || !context) return;

    const cv: HTMLCanvasElement = canvas;
    const hostEl: HTMLElement = host;
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LINK = 170; // max distance between linked nodes
    const REACH = 230; // cursor influence radius

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let running = true;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = hostEl.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = Math.max(34, Math.round((w * h) / 11000));
      nodes = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        hub: i % 9 === 0,
      }));
      packets = [];
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        if (!reduce) {
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;
          const mdx = mouse.x - a.x;
          const mdy = mouse.y - a.y;
          const md = Math.hypot(mdx, mdy);
          if (md < REACH && md > 1) {
            a.x += mdx * 0.0035;
            a.y += mdy * 0.0035;
          }
        }

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(96,165,250,${(1 - d / LINK) * 0.6})`; // blue-400
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            if (!reduce && packets.length < 16 && Math.random() < 0.0009) {
              packets.push({ a, b, t: 0 });
            }
          }
        }

        const cd = Math.hypot(mouse.x - a.x, mouse.y - a.y);
        if (cd < REACH) {
          ctx.strokeStyle = `rgba(191,219,254,${(1 - cd / REACH) * 0.9})`; // blue-200
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const a of nodes) {
        if (a.hub) {
          ctx.fillStyle = "#1E40AF"; // blue-800
          ctx.strokeStyle = "rgba(96,165,250,.95)";
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.arc(a.x, a.y, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.fillStyle = "rgba(147,197,253,.85)"; // blue-300
          ctx.beginPath();
          ctx.arc(a.x, a.y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        p.t += 0.014;
        if (p.t >= 1) {
          packets.splice(k, 1);
          continue;
        }
        const x = p.a.x + (p.b.x - p.a.x) * p.t;
        const y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.fillStyle = "rgba(30,64,175,.65)"; // blue-800 halo
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#93C5FD";
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (!running) return;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const r = hostEl.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    size();
    draw();
    if (!reduce) raf = requestAnimationFrame(loop);

    hostEl.addEventListener("mousemove", onMove);
    hostEl.addEventListener("mouseleave", onLeave);

    const resize = new ResizeObserver(() => {
      size();
      draw();
    });
    resize.observe(hostEl);

    // pause when scrolled out of view
    const visibility = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      if (running && !reduce) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    });
    visibility.observe(hostEl);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      hostEl.removeEventListener("mousemove", onMove);
      hostEl.removeEventListener("mouseleave", onLeave);
      resize.disconnect();
      visibility.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 inset-0 h-full w-full ${className}`}
    />
  );
}