import { useEffect, useRef } from "react";

const PINK   = { r: 220, g: 40,  b: 130 };
const GREEN  = { r: 100, g: 220, b: 80  };
const PURPLE = { r: 140, g: 60,  b: 220 };

type RGB = typeof PINK;
function rgba({ r, g, b }: RGB, a: number) { return `rgba(${r},${g},${b},${a})`; }

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  baseVx: number; baseVy: number;
  r: number; color: RGB; alpha: number;
  pulsePhase: number; pulseSpeed: number;
}
interface Stream {
  x: number; y: number; speed: number;
  length: number; chars: string[]; color: RGB;
}
interface Ring {
  x: number; y: number; radius: number;
  maxRadius: number; color: RGB; alpha: number;
}

const CHARS = "01アイウエオカキクケコ▲▼◆◇░▒▓";
const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];
const pickColor = (): RGB => {
  const n = Math.random();
  return n < 0.5 ? PINK : n < 0.85 ? GREEN : PURPLE;
};

const REPEL_DIST = 110;

export function HeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -999, y: -999, inside: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let W = 0, H = 0;
    let angleT = 0;

    const particles: Particle[] = [];
    const streams:   Stream[]   = [];
    const rings:     Ring[]     = [];

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas!.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas!.width  = W * dpr;
      canvas!.height = H * dpr;
      ctx!.scale(dpr, dpr);
    }

    function spawnParticles() {
      const count = Math.floor((W * H) / 13000);
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        const vx = (Math.random() - 0.5) * 0.3;
        const vy = (Math.random() - 0.5) * 0.3;
        particles.push({
          x: Math.random() * W, y: Math.random() * H,
          vx, vy, baseVx: vx, baseVy: vy,
          r: Math.random() * 1.5 + 0.5, color: pickColor(),
          alpha: Math.random() * 0.5 + 0.2,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.015 + 0.005,
        });
      }
    }

    function spawnStreams() {
      const cols = Math.floor(W / 28);
      streams.length = 0;
      for (let i = 0; i < cols; i++) {
        if (Math.random() > 0.32) continue;
        streams.push({
          x: i * 28 + Math.random() * 14,
          y: Math.random() * -H,
          speed: Math.random() * 1.2 + 0.4,
          length: Math.floor(Math.random() * 10 + 5),
          chars: Array.from({ length: 20 }, randChar),
          color: Math.random() < 0.7 ? GREEN : PINK,
        });
      }
    }

    resize(); spawnParticles(); spawnStreams();

    const ro = new ResizeObserver(() => { resize(); spawnParticles(); spawnStreams(); });
    ro.observe(canvas);

    // ── mouse tracking via window (canvas is pointer-events-none) ──
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y, inside: x >= 0 && x <= W && y >= 0 && y <= H };
    }
    function onMouseLeave() { mouseRef.current = { x: -999, y: -999, inside: false }; }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    // ── ring spawner ──
    let ringTimer = 0;
    function maybeSpawnRing(ts: number) {
      if (ts - ringTimer > 1800 + Math.random() * 2400) {
        ringTimer = ts;
        const p = particles[Math.floor(Math.random() * particles.length)];
        rings.push({ x: p?.x ?? W / 2, y: p?.y ?? H / 2, radius: 0,
          maxRadius: Math.random() * 80 + 40, color: p?.color ?? PINK, alpha: 0.5 });
      }
    }

    // ── HUD targeting reticle ──
    function drawReticle(x: number, y: number, t: number) {
      const GAP = 9, ARM = 16, BR = 22;

      ctx!.save();
      ctx!.translate(x, y);

      // Slowly rotating outer corner brackets
      ctx!.rotate(t * 0.5);
      ctx!.strokeStyle = rgba(PINK, 0.45);
      ctx!.lineWidth = 1;
      for (let c = 0; c < 4; c++) {
        const sx = c < 2 ? -1 : 1;
        const sy = c % 2 === 0 ? -1 : 1;
        ctx!.beginPath();
        ctx!.moveTo(sx * BR, sy * (BR - 9));
        ctx!.lineTo(sx * BR, sy * BR);
        ctx!.lineTo(sx * (BR - 9), sy * BR);
        ctx!.stroke();
      }
      ctx!.rotate(-t * 0.5);

      // Fixed crosshair arms
      ctx!.strokeStyle = rgba(PINK, 0.8);
      ctx!.lineWidth = 1;
      ctx!.beginPath(); ctx!.moveTo(0, -GAP); ctx!.lineTo(0, -(GAP + ARM)); ctx!.stroke();
      ctx!.beginPath(); ctx!.moveTo(0,  GAP); ctx!.lineTo(0,  (GAP + ARM)); ctx!.stroke();
      ctx!.beginPath(); ctx!.moveTo(-GAP, 0); ctx!.lineTo(-(GAP + ARM), 0); ctx!.stroke();
      ctx!.beginPath(); ctx!.moveTo( GAP, 0); ctx!.lineTo( (GAP + ARM), 0); ctx!.stroke();

      // Center dot
      ctx!.fillStyle = rgba(PINK, 0.95);
      ctx!.beginPath(); ctx!.arc(0, 0, 1.8, 0, Math.PI * 2); ctx!.fill();

      // Counter-rotating inner dash ring
      const dashR = BR * 0.72;
      ctx!.save();
      ctx!.rotate(-t * 1.1);
      ctx!.strokeStyle = rgba(GREEN, 0.38);
      ctx!.lineWidth = 1;
      ctx!.setLineDash([4, 6]);
      ctx!.beginPath(); ctx!.arc(0, 0, dashR, 0, Math.PI * 2); ctx!.stroke();
      ctx!.setLineDash([]);
      ctx!.restore();

      // Pulsing outer ring
      const pulse = Math.sin(t * 3.2) * 0.22 + 0.78;
      ctx!.strokeStyle = rgba(GREEN, 0.28 * pulse);
      ctx!.lineWidth = 1;
      ctx!.beginPath(); ctx!.arc(0, 0, BR * 1.6 * pulse, 0, Math.PI * 2); ctx!.stroke();

      ctx!.restore();
    }

    function draw(ts: number) {
      ctx!.clearRect(0, 0, W, H);
      angleT += 0.016;
      const mouse = mouseRef.current;

      // ── data streams ──
      ctx!.font = "11px 'JetBrains Mono', monospace";
      for (const s of streams) {
        s.y += s.speed;
        if (s.y - s.length * 14 > H) { s.y = Math.random() * -60; s.chars = Array.from({ length: 20 }, randChar); }
        if (Math.random() < 0.04) s.chars[Math.floor(Math.random() * s.chars.length)] = randChar();
        for (let j = 0; j < s.length; j++) {
          const cy = s.y - j * 14;
          if (cy < -14 || cy > H + 14) continue;
          ctx!.fillStyle = rgba(s.color, j === 0 ? 0.55 : (1 - j / s.length) * 0.18);
          ctx!.fillText(s.chars[j % s.chars.length], s.x, cy);
        }
      }

      // ── constellation lines ──
      const LINK = 115;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx!.strokeStyle = rgba(particles[i].color, (1 - d / LINK) * 0.12);
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      // ── particles + cursor repulsion ──
      for (const p of particles) {
        if (mouse.inside) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < REPEL_DIST && d > 0) {
            const force = (1 - d / REPEL_DIST) * 0.65;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
            const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (spd > 2.2) { p.vx = (p.vx / spd) * 2.2; p.vy = (p.vy / spd) * 2.2; }
          }
        }
        // Ease back to base drift
        p.vx += (p.baseVx - p.vx) * 0.025;
        p.vy += (p.baseVy - p.vy) * 0.025;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

        p.pulsePhase += p.pulseSpeed;
        const pulse = Math.sin(p.pulsePhase) * 0.5 + 0.5;
        const drawR = p.r * (0.8 + pulse * 0.5);
        const drawA = p.alpha * (0.6 + pulse * 0.4);

        const grd = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, drawR * 4);
        grd.addColorStop(0, rgba(p.color, drawA * 0.9));
        grd.addColorStop(1, rgba(p.color, 0));
        ctx!.fillStyle = grd;
        ctx!.beginPath(); ctx!.arc(p.x, p.y, drawR * 4, 0, Math.PI * 2); ctx!.fill();

        ctx!.fillStyle = rgba(p.color, drawA);
        ctx!.beginPath(); ctx!.arc(p.x, p.y, drawR, 0, Math.PI * 2); ctx!.fill();
      }

      // ── pulse rings ──
      maybeSpawnRing(ts);
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        ring.radius += 0.8; ring.alpha *= 0.988;
        if (ring.alpha < 0.01 || ring.radius > ring.maxRadius) { rings.splice(i, 1); continue; }
        ctx!.strokeStyle = rgba(ring.color, ring.alpha);
        ctx!.lineWidth = 1;
        ctx!.beginPath(); ctx!.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2); ctx!.stroke();
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 w-full h-full"
      style={{ opacity: 0.55, zIndex: 0 }}
    />
  );
}

