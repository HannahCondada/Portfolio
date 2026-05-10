import { useEffect, useRef } from "react";

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, [tabindex="0"]';

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Use transform (compositor thread) instead of left/top (layout thread)
    // for near-zero perceived lag.
    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 40}px, ${e.clientY - 40}px)`;
      el.style.opacity = "1";
    };
    const onLeave = () => { el.style.opacity = "0"; };
    const onOver  = (e: MouseEvent) => {
      el.classList.toggle("cursor-locked", !!(e.target as Element).closest(INTERACTIVE));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9998]"
      style={{ opacity: 0, willChange: "transform" }}
    >
      {/*
        80×80 SVG, viewBox -40 -40 80 80.
        Child <g> transform-origin: 40px 40px (SVG pixel coords = center).
        .cursor-svg scale transition for the lock-in spring effect.
      */}
      <svg
        className="cursor-svg"
        width="80"
        height="80"
        viewBox="-40 -40 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rotating outer corner brackets — pink */}
        <g
          className="cursor-rotate-cw"
          stroke="rgba(220,40,130,0.7)"
          strokeWidth="2"
          strokeLinecap="square"
        >
          <path d="M-22,-13 L-22,-22 L-13,-22" />
          <path d="M22,-13 L22,-22 L13,-22" />
          <path d="M-22,13 L-22,22 L-13,22" />
          <path d="M22,13 L22,22 L13,22" />
        </g>

        {/* Crosshair arms — neon green */}
        <g stroke="rgba(80,230,80,1)" strokeWidth="2" strokeLinecap="round">
          <line x1="0"  y1="-9"  x2="0"   y2="-26" />
          <line x1="0"  y1="9"   x2="0"   y2="26"  />
          <line x1="-9" y1="0"   x2="-26" y2="0"   />
          <line x1="9"  y1="0"   x2="26"  y2="0"   />
        </g>

        {/* Counter-rotating dashed inner ring */}
        <circle
          className="cursor-rotate-ccw"
          cx="0" cy="0" r="16"
          stroke="rgba(80,230,80,0.45)"
          strokeWidth="1.4"
          strokeDasharray="4 6"
        />

        {/* Pulsing outer ring */}
        <circle
          className="cursor-pulse-ring"
          cx="0" cy="0" r="34"
          stroke="rgba(80,230,80,0.22)"
          strokeWidth="1"
        />

        {/* Lock-in ping ring — hidden until .cursor-locked */}
        <circle
          className="cursor-lock-ring"
          cx="0" cy="0" r="20"
          stroke="rgba(80,230,80,0.9)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Center dot — neon green */}
        <circle cx="0" cy="0" r="2.5" fill="rgba(80,230,80,1)" />
      </svg>
    </div>
  );
}
