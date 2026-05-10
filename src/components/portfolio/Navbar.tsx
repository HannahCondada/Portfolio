import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      {/* Centered floating card — glass translucent, sharp corners */}
      <nav className="mx-auto max-w-6xl px-4">
        <div
          className={`flex items-center justify-between px-5 py-3 border transition-all duration-300 ${
            scrolled
              ? "glass border-[oklch(0.72_0.29_350/0.3)] shadow-glow backdrop-blur-md"
              : "bg-[oklch(0.09_0.015_260/0.35)] backdrop-blur-sm border-[oklch(0.72_0.29_350/0.15)]"
          }`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <span className="font-mono-accent text-[10px] text-[oklch(0.72_0.29_350/0.6)] group-hover:text-[oklch(0.72_0.29_350)] transition-colors tracking-widest">
              SYS /
            </span>
            <span className="font-game text-sm font-bold tracking-widest text-[oklch(0.72_0.29_350)] uppercase">
              Hannah
            </span>
            <span className="font-game text-sm font-bold tracking-widest text-foreground/70 uppercase group-hover:text-foreground/90 transition-colors">
              Condada
            </span>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative font-mono-accent text-[11px] uppercase tracking-widest text-foreground/50 hover:text-[oklch(0.72_0.29_350)] transition-colors group"
                >
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[oklch(0.72_0.29_350)] group-hover:w-full transition-all duration-200" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 cp-card px-4 py-2 border border-[oklch(0.72_0.29_350/0.4)] font-mono-accent text-[11px] uppercase tracking-widest text-[oklch(0.72_0.29_350)] hover:border-[oklch(0.72_0.29_350/0.8)] hover:shadow-glow transition-all"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.29_350)] animate-pulse-glow" />
            Contact
          </a>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle menu"
            className="md:hidden h-9 w-9 grid place-items-center border border-[oklch(0.72_0.29_350/0.35)] text-foreground/60 hover:border-[oklch(0.72_0.29_350/0.7)] hover:text-[oklch(0.72_0.29_350)] transition-all"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span className={`block h-px w-4 bg-current transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-px w-4 bg-current transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-4 bg-current transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden border border-t-0 border-[oklch(0.72_0.29_350/0.25)] bg-[oklch(0.09_0.015_260/0.95)] backdrop-blur-md px-5 py-4">
            <ul className="flex flex-col gap-1">
              {links.map((l, i) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 py-2.5 border-b border-[oklch(0.72_0.29_350/0.08)] font-mono-accent text-xs uppercase tracking-widest text-foreground/55 hover:text-[oklch(0.72_0.29_350)] transition-colors"
                  >
                    <span className="text-[oklch(0.72_0.29_350/0.4)] text-[9px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
