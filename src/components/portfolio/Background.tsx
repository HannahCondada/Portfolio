export function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Perspective grid */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid-sm" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="oklch(0.72 0.29 350 / 0.06)" strokeWidth="0.5"/>
          </pattern>
          <pattern id="grid-lg" width="240" height="240" patternUnits="userSpaceOnUse">
            <path d="M 240 0 L 0 0 0 240" fill="none" stroke="oklch(0.72 0.29 350 / 0.1)" strokeWidth="1"/>
          </pattern>
          <radialGradient id="glow-pink" cx="18%" cy="38%" r="45%">
            <stop offset="0%" stopColor="oklch(0.72 0.29 350)" stopOpacity="0.13"/>
            <stop offset="100%" stopColor="oklch(0.72 0.29 350)" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="glow-yellow" cx="85%" cy="75%" r="35%">
            <stop offset="0%" stopColor="oklch(0.82 0.26 142)" stopOpacity="0.07"/>
            <stop offset="100%" stopColor="oklch(0.82 0.26 142)" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-sm)"/>
        <rect width="100%" height="100%" fill="url(#grid-lg)"/>
        <rect width="100%" height="100%" fill="url(#glow-pink)"/>
        <rect width="100%" height="100%" fill="url(#glow-yellow)"/>
        {/* Horizontal accent lines — % is valid for line coordinates */}
        <line x1="0" y1="33%" x2="30%" y2="33%" stroke="oklch(0.72 0.29 350 / 0.12)" strokeWidth="1"/>
        <line x1="70%" y1="67%" x2="100%" y2="67%" stroke="oklch(0.82 0.26 142 / 0.1)" strokeWidth="1"/>
        {/* Corner bracket top-left — absolute coords are valid in path d */}
        <path d="M0,0 L60,0 M0,0 L0,40" stroke="oklch(0.72 0.29 350 / 0.35)" strokeWidth="1.5" fill="none"/>
      </svg>
      {/* Corner bracket bottom-right — CSS positioned div avoids invalid SVG path % coords */}
      <div className="absolute bottom-0 right-0 w-16 h-10 border-b-2 border-r-2" style={{ borderColor: "oklch(0.82 0.26 142 / 0.3)" }} />
    </div>
  );
}