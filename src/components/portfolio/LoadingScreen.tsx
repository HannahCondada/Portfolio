import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/hannah-portrait.png";

const LOG_LINES: { text: string; color: string; delay: number }[] = [
  { text: "> INITIATING SCAN PROTOCOL...",        color: "text-foreground/50", delay: 350  },
  { text: "> TARGET DETECTED",                     color: "text-[oklch(0.82_0.26_142)]",   delay: 950  },
  { text: "> ACCESSING BIO DATABASE...",           color: "text-foreground/50", delay: 1600 },
  { text: "> IDENTITY: HANNAH CONDADA",            color: "text-[oklch(0.72_0.29_350)]",   delay: 2150 },
  { text: "> OCCUPATION: APPLICATION DEVELOPER",   color: "text-foreground/50", delay: 2650 },
  { text: "> CLEARANCE LEVEL: CUM LAUDE \u2605",   color: "text-[oklch(0.62_0.28_295)]",   delay: 3100 },
  { text: "> PROFILE LOADED. ACCESS GRANTED.",     color: "text-[oklch(0.82_0.26_142)]",   delay: 3650 },
];

const TOTAL_MS = 4800;

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress]         = useState(0);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [fading, setFading]             = useState(false);
  const calledDone                      = useRef(false);
  // Keep a stable ref so the effect never needs to re-run when the parent re-renders
  const onDoneRef                       = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const pct = Math.min(100, ((now - startTime) / TOTAL_MS) * 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const lineTimers = LOG_LINES.map((l, i) =>
      window.setTimeout(() => setVisibleLines((prev) => [...prev, i]), l.delay)
    );

    const fadeTimer = window.setTimeout(() => setFading(true), TOTAL_MS + 200);
    const doneTimer = window.setTimeout(() => {
      if (!calledDone.current) {
        calledDone.current = true;
        onDoneRef.current();
      }
    }, TOTAL_MS + 1100);

    return () => {
      cancelAnimationFrame(raf);
      lineTimers.forEach(window.clearTimeout);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, []); // empty — onDone is accessed via ref, never stale

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[oklch(0.07_0.012_265)] flex flex-col items-center justify-center gap-4 overflow-hidden transition-opacity duration-[900ms] ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Scanlines overlay */}
      <div aria-hidden className="scanlines absolute inset-0 pointer-events-none z-0 opacity-40" />

      {/* Screen corner brackets */}
      <div aria-hidden className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-[oklch(0.72_0.29_350/0.7)] z-10" />
      <div aria-hidden className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-[oklch(0.82_0.26_142/0.6)] z-10" />
      <div aria-hidden className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-[oklch(0.82_0.26_142/0.6)] z-10" />
      <div aria-hidden className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-[oklch(0.72_0.29_350/0.7)] z-10" />

      {/* Header label */}
      <div className="relative z-10 font-mono-accent text-[10px] text-[oklch(0.72_0.29_350/0.65)] tracking-[0.35em] uppercase animate-pulse-glow">
        ◆ &nbsp; LOADING TARGET PROFILE &nbsp; ◆
      </div>

      {/* Portrait HUD frame */}
      <div className="relative z-10 w-40 h-44 flex-shrink-0">
        {/* Outer glow ring */}
        <div className="absolute -inset-2 border border-[oklch(0.72_0.29_350/0.2)]" />
        {/* Corner ticks */}
        <div className="absolute -top-1 -left-1 w-5 h-5 border-t-2 border-l-2 border-[oklch(0.72_0.29_350)]" />
        <div className="absolute -top-1 -right-1 w-5 h-5 border-t-2 border-r-2 border-[oklch(0.82_0.26_142)]" />
        <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-2 border-l-2 border-[oklch(0.82_0.26_142)]" />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-2 border-r-2 border-[oklch(0.72_0.29_350)]" />

        {/* Portrait image */}
        <div className="w-full h-full overflow-hidden relative">
          <img
            src={portrait}
            alt="Scanning target"
            className="w-full h-full object-cover object-top transition-all duration-[900ms]"
            style={{
              filter: fading
                ? "saturate(1.1) contrast(1.05) brightness(1)"
                : "saturate(0.55) contrast(1.15) brightness(0.88)",
              transform: fading ? "scale(1.08)" : "scale(1)",
            }}
          />
          {/* Moving scan line */}
          <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="scan-line" />
          </div>
          {/* Bottom vignette */}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-transparent to-[oklch(0.07_0.012_265/0.55)] pointer-events-none" />
        </div>

        {/* Blink badge top-left */}
        <div className="absolute top-2 left-2 font-mono-accent text-[9px] text-[oklch(0.72_0.29_350)] animate-pulse-glow flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.29_350)]" />
          REC
        </div>
      </div>

      {/* "SCANNING..." label under portrait */}
      <div className="relative z-10 font-mono-accent text-[10px] text-[oklch(0.72_0.29_350/0.7)] tracking-widest -mt-1">
        [ SCANNING... ]
      </div>

      {/* Terminal log */}
      <div className="relative z-10 font-mono-accent text-[11px] space-y-1.5 w-72 md:w-[380px]">
        {LOG_LINES.map((line, i) => (
          <div
            key={i}
            className={`transition-opacity duration-300 leading-snug ${
              visibleLines.includes(i) ? `opacity-100 ${line.color}` : "opacity-0"
            }`}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-72 md:w-[380px]">
        <div className="flex justify-between font-mono-accent text-[9px] text-foreground/30 mb-1.5">
          <span>PROFILE DATA</span>
          <span className="text-[oklch(0.72_0.29_350/0.8)]">{Math.round(progress)}%</span>
        </div>
        <div className="h-[3px] bg-[oklch(0.18_0.02_260)] overflow-hidden relative">
          <div
            className="h-full bg-[oklch(0.72_0.29_350)]"
            style={{ width: `${progress}%`, boxShadow: "0 0 8px oklch(0.72 0.29 350 / 0.7)" }}
          />
        </div>
        <div className="font-mono-accent text-[9px] text-foreground/20 mt-1 text-right">
          FULL ACCESS
        </div>
      </div>
    </div>
  );
}
