import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowRight,
  X,
  Code2,
  Palette,
  Database,
  Wrench,
  Search,
  ClipboardList,
  PenTool,
  Cpu,
  ExternalLink,
  Quote,
  GraduationCap,
  MapPin,
  Zap,
  Trophy,
  Star,
  Shield,
  Swords,
  ChevronRight,
} from "lucide-react";
import { Navbar } from "@/components/portfolio/Navbar";
import { Reveal } from "@/components/portfolio/Reveal";
import { Background } from "@/components/portfolio/Background";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { HeroBg } from "@/components/portfolio/HeroBg";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import portrait from "@/assets/hannah-portrait.png";
import p1 from "@/assets/showup.png";
import p2 from "@/assets/newquery.png";
import p3 from "@/assets/neudev.png";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

function Portfolio() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <HeroBg />
      <CustomCursor />
      <div id="home" className="min-h-screen overflow-x-clip">
      <Background />
      <Navbar />
      <Hero started={!loading} />
      <StatusTicker />
      <About />
      <Skills />
      <Projects />
      <Process />
      <Experience />
      <Education />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </div>
    </>
  );
}

/* ------------------------------- HERO SECTION */
const RESUME_FILE_ID = "1bbko_hMrva46lDMKos9VhcIaLChQ6NVc";
const RESUME_PREVIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/preview`;
const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`;

function ResumeModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "oklch(0.06 0.015 260 / 0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="cp-card relative w-full max-w-3xl border border-[oklch(0.72_0.29_350/0.35)] shadow-glow bg-[oklch(0.09_0.015_260)] flex flex-col"
        style={{ height: "min(82vh, 740px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[oklch(0.72_0.29_350/0.22)] bg-[oklch(0.72_0.29_350/0.07)] shrink-0">
          <div className="flex items-center gap-2 font-mono-accent text-[10px] tracking-widest text-[oklch(0.72_0.29_350/0.85)]">
            <span className="animate-pulse-glow text-[oklch(0.72_0.29_350)]">◆</span>
            RESUME.PDF &nbsp;// &nbsp;HANNAH CONDADA
          </div>
          <div className="flex items-center gap-2">
            <a
              href={RESUME_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cp-card inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-primary font-mono-accent text-[10px] text-[oklch(0.09_0.015_260)] font-semibold tracking-widest hover:shadow-glow transition-all uppercase"
            >
              <Download className="h-3 w-3" /> Download
            </a>
            <button
              type="button"
              onClick={onClose}
              className="h-7 w-7 border border-[oklch(0.72_0.29_350/0.3)] text-foreground/40 hover:text-[oklch(0.72_0.29_350)] hover:border-[oklch(0.72_0.29_350/0.7)] transition-all grid place-items-center"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        {/* PDF embed */}
        <iframe
          src={RESUME_PREVIEW_URL}
          title="Hannah Condada Resume"
          className="w-full flex-1 border-0"
          allow="autoplay"
        />
      </div>
    </div>
  );
}

function TypewriterText({ text, className = "", started = true }: { text: string; className?: string; started?: boolean }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [text, started]);
  return <span className={className}>{displayed}<span className="cursor-blink" /></span>;
}

function Hero({ started = false }: { started?: boolean }) {
  const [ready, setReady] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  useEffect(() => {
    if (!started) return;
    let r2: number;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setReady(true));
    });
    return () => { cancelAnimationFrame(r1); cancelAnimationFrame(r2); };
  }, [started]);

  // Helper: per-element staggered fade-up via inline transition
  const fadeUp = (delay: number, extra?: React.CSSProperties): React.CSSProperties => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
    ...extra,
  });

  return (
    <>
      <section className="relative pt-24 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-20 left-1/4 w-96 h-96 rounded-full bg-[oklch(0.72_0.29_350/0.07)] blur-[80px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-[oklch(0.82_0.26_142/0.06)] blur-[70px]" />

      {/* ── ID Card ── */}
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="cp-card glass border border-[oklch(0.72_0.29_350/0.32)] shadow-glow overflow-visible">
          {/* Scanlines on card */}
          <div aria-hidden className="scanlines absolute inset-0 pointer-events-none z-0 opacity-15" />

          {/* Card header strip */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-5 py-2.5 border-b border-[oklch(0.72_0.29_350/0.22)] bg-[oklch(0.72_0.29_350/0.07)]">
            <div className="flex items-center gap-2 font-mono-accent text-[10px] tracking-widest text-[oklch(0.72_0.29_350/0.85)]">
              <span className="animate-pulse-glow text-[oklch(0.72_0.29_350)]">◆</span>
              CLASSIFIED &nbsp;//&nbsp; IDENTITY CARD
            </div>
            <span className="font-mono-accent text-[10px] tracking-widest text-foreground/25 hidden sm:block">
              ID: HC-2026-0001
            </span>
            <div className="flex items-center gap-2 font-mono-accent text-[10px] text-[oklch(0.82_0.26_142)] tracking-widest">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.82_0.26_142)] animate-pulse-glow" />
              STATUS: ACTIVE
            </div>
          </div>

          {/* Card body */}
          <div className="relative z-10 px-6 md:px-10 py-10 grid md:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
            {/* LEFT: copy — content pushed toward the right edge of this column */}
            <div className="space-y-6 flex flex-col items-end">
              {/* Status bar */}
              <div className="inline-flex items-center gap-3 px-3 py-1.5 border border-[oklch(0.72_0.29_350/0.35)] bg-[oklch(0.13_0.018_255/0.8)] font-mono-accent text-[11px] text-[oklch(0.72_0.29_350)] shadow-glow" style={fadeUp(0)}>
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.29_350)] animate-pulse-glow" />
                <span>SYSTEM ONLINE</span>
                <span className="text-foreground/30 mx-1">·</span>
                <span className="text-[oklch(0.82_0.26_142)]">v0.0.98.2026</span>
              </div>

              {/* Name + glitch */}
              <div className="text-right" style={fadeUp(80)}>
                <p className="font-mono-accent text-xs text-foreground/40 mb-2 tracking-widest">PLAYER_001 &gt; PROFILE_LOADED</p>
                <h1
                  className="glitch font-game text-[2.6rem] md:text-[4rem] leading-[1.08] tracking-[0.12em] uppercase font-bold"
                  data-text="HANNAH CONDADA"
                >
                  HANNAH{" "}<span className="text-[oklch(0.72_0.29_350)]">CONDADA</span>
                </h1>
              </div>

              {/* Subtitle with typewriter */}
              <div className="border-r-2 border-[oklch(0.82_0.26_142/0.6)] pr-3 text-right" style={fadeUp(180)}>
                <p className="text-base md:text-lg text-foreground/80">
                  <TypewriterText text="Application Developer crafting user-focused digital experiences." started={started} />
                </p>
                <p className="mt-2 font-mono-accent text-xs text-foreground/45">
                  CS Graduate · Cum Laude · Full-Stack · UI/UX
                </p>
              </div>

              {/* Stat bars */}
              <div className="space-y-2 w-full max-w-sm" style={fadeUp(280)}>
                {[
                  { label: "Frontend", pct: 92, color: "bg-gradient-primary" },
                  { label: "Backend",  pct: 78, color: "bg-gradient-yellow" },
                  { label: "UI / UX",  pct: 85, color: "bg-gradient-primary" },
                ].map((s, i) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <span className="font-mono-accent text-[10px] text-foreground/50 w-16 shrink-0">{s.label}</span>
                    <div className="xp-bar flex-1">
                      <div
                        className={`xp-bar-fill ${s.color}`}
                        style={{ "--bar-w": `${s.pct}%`, "--bar-delay": `${0.3 + i * 0.15}s` } as React.CSSProperties}
                      />
                    </div>
                    <span className="font-mono-accent text-[10px] text-[oklch(0.82_0.26_142)] w-8 text-right">{s.pct}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-1 justify-end" style={fadeUp(380)}>
                <a
                  href="#projects"
                  className="cp-card group inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary font-mono-accent text-xs text-[oklch(0.09_0.015_260)] font-semibold tracking-widest shadow-glow hover:shadow-glow transition-all uppercase"
                >
                  <Zap className="h-3.5 w-3.5" /> View Projects <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
                <button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className="cp-card cp-card-yellow inline-flex items-center gap-2 px-6 py-3 border border-[oklch(0.82_0.26_142/0.4)] font-mono-accent text-xs text-[oklch(0.82_0.26_142)] tracking-widest hover:shadow-glow-yellow hover:border-[oklch(0.82_0.26_142/0.7)] transition-all uppercase"
                >
                  <Download className="h-3.5 w-3.5" /> Resume
                </button>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 font-mono-accent text-xs text-foreground/45 hover:text-foreground/80 transition-colors uppercase tracking-widest"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* RIGHT: portrait — leans left toward center */}
            <div className="relative flex justify-center md:justify-start">
              <div
                className="relative w-[270px] md:w-[320px]"
                style={fadeUp(120, { transform: ready ? "scale(1) translateY(0)" : "scale(0.93) translateY(16px)" })}
              >
                <div className="absolute -inset-3 border border-[oklch(0.72_0.29_350/0.18)]" />
                <div className="absolute -inset-1.5 border border-[oklch(0.72_0.29_350/0.08)]" />
                <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[oklch(0.72_0.29_350/0.8)]" />
                <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[oklch(0.82_0.26_142/0.7)]" />
                <div className="overflow-hidden aspect-[3/4] scanlines">
                  <img
                    src={portrait}
                    alt="Hannah Condada"
                    width={896}
                    height={1024}
                    className="w-full h-full object-cover object-top"
                    style={{ filter: "contrast(1.05) saturate(1.1)" }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-[oklch(0.09_0.015_260/0.82)] px-3 py-2 font-mono-accent text-[10px] text-[oklch(0.72_0.29_350)] border-t border-[oklch(0.72_0.29_350/0.3)]">
                  <div className="flex justify-between">
                    <span>HANNAH.EXE</span>
                    <span className="text-[oklch(0.82_0.26_142)]">LVL 23</span>
                  </div>
                  <div className="flex justify-between text-foreground/40 mt-0.5">
                    <span>Application Developer</span>
                    <span>CUM LAUDE ★</span>
                  </div>
                </div>
                {/* Badges: hang outside the portrait corners */}
                <div className="z-20 animate-float" style={{ position: "absolute", bottom: "52px", left: "-12px" }}>
                  <HudBadge color="pink"   label="FE + BE + DB" icon={<Code2 className="h-3.5 w-3.5" />} />
                </div>
                <div className="z-20 animate-float-rev" style={{ position: "absolute", top: "-14px", right: "-14px" }}>
                  <HudBadge color="yellow" label="UI / UX"    icon={<Palette className="h-3.5 w-3.5" />} />
                </div>
              </div>
            </div>
          </div>

          {/* Card footer strip */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-5 py-2 border-t border-[oklch(0.72_0.29_350/0.18)] bg-[oklch(0.09_0.015_260/0.45)] font-mono-accent text-[9px] tracking-widest text-foreground/30">
            <span>ISSUED: 2026.05.09</span>
            <span className="text-[oklch(0.72_0.29_350/0.45)]">◆ HC-2026-APP-DEV ◆</span>
            <span>CLEARANCE: CUM LAUDE ★★★</span>
          </div>
        </div>
      </div>
    </section>
      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
    </>
  );
}

function HudBadge({ icon, label, color }: { icon: React.ReactNode; label: string; color: "pink" | "yellow" }) {
  const cls = color === "pink"
    ? "border-[oklch(0.72_0.29_350/0.55)] shadow-glow text-[oklch(0.72_0.29_350)]"
    : "border-[oklch(0.82_0.26_142/0.55)] shadow-glow-yellow text-[oklch(0.82_0.26_142)]";
  return (
    <div className={`cp-card glass border ${cls} px-3 py-1.5 flex items-center gap-2 font-mono-accent text-[10px] tracking-wider`}>
      {icon} {label}
    </div>
  );
}

/* ------------------------------- TICKER */
function StatusTicker() {
  const TECH = [
    "React", "TypeScript", "Node.js", "Tailwind", "Figma",
    "Git", "REST APIs", "Databases", "Firebase", "Next.js", "Stripe", "UI Design",
  ];
  const ATTRS = [
    "// FULL_STACK", "// CUM_LAUDE", "// UI_FOCUSED", "// PROBLEM_SOLVER",
    "// CLEAN_CODE", "// DETAIL_ORIENTED", "// FAST_LEARNER", "// TEAM_PLAYER",
  ];
  return (
    <div
      className="relative border-y border-[oklch(0.72_0.29_350/0.22)] bg-[oklch(0.09_0.012_260/0.92)] overflow-hidden"
      style={{ height: 52 }}
    >
      <div aria-hidden className="scanlines absolute inset-0 pointer-events-none opacity-15 z-10" />

      {/* Left badge */}
      <div className="cp-card absolute left-0 top-0 bottom-0 z-20 flex items-center px-4 border-r border-[oklch(0.72_0.29_350/0.25)] bg-[oklch(0.11_0.015_260)]">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="animate-pulse-glow text-[oklch(0.72_0.29_350)] text-[8px]">◆</span>
            <span className="font-mono-accent text-[9px] text-[oklch(0.72_0.29_350/0.75)] tracking-widest">TECH_STACK</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="h-1 w-1 rounded-full bg-[oklch(0.82_0.26_142)] animate-pulse-glow" />
            <span className="font-mono-accent text-[9px] text-[oklch(0.82_0.26_142/0.6)] tracking-widest">ATTRIBUTES</span>
          </div>
        </div>
      </div>

      {/* Right badge */}
      <div className="absolute right-0 top-0 bottom-0 z-20 flex items-center px-4 border-l border-[oklch(0.72_0.29_350/0.25)] bg-[oklch(0.11_0.015_260)]">
        <div className="text-right">
          <div className="font-mono-accent text-[9px] text-[oklch(0.72_0.29_350/0.5)] tracking-widest">HC-2026</div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="h-1 w-1 rounded-full bg-[oklch(0.82_0.26_142)] animate-pulse-glow" />
            <span className="font-mono-accent text-[9px] text-[oklch(0.82_0.26_142/0.75)] tracking-widest">ONLINE</span>
          </div>
        </div>
      </div>

      {/* Scroll tracks */}
      <div className="absolute inset-0 flex flex-col justify-center gap-0.5" style={{ left: 148, right: 104 }}>
        {/* Row 1 — scrolls left */}
        <div style={{ overflow: "hidden", height: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", width: "max-content", whiteSpace: "nowrap", willChange: "transform", animation: "ticker 34s linear infinite" }}>
            {[...TECH, ...TECH].map((t, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "oklch(0.72 0.29 350 / 0.4)", fontSize: 7 }}>◆</span>
                <span className="font-mono-accent" style={{ color: "oklch(0.72 0.29 350 / 0.85)", fontSize: 10 }}>{t}</span>
              </span>
            ))}
          </div>
        </div>
        {/* Row 2 — scrolls right */}
        <div style={{ overflow: "hidden", height: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", width: "max-content", whiteSpace: "nowrap", willChange: "transform", animation: "ticker-rev 26s linear infinite" }}>
            {[...ATTRS, ...ATTRS].map((a, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "oklch(0.82 0.26 142 / 0.35)", fontSize: 7 }}>◆</span>
                <span className="font-mono-accent" style={{ color: "oklch(0.82 0.26 142 / 0.65)", fontSize: 10 }}>{a}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Left fade mask */}
      <div aria-hidden className="absolute top-0 bottom-0 z-10 pointer-events-none" style={{ left: 148, width: 40, background: "linear-gradient(to right, oklch(0.09 0.012 260), transparent)" }} />
      {/* Right fade mask */}
      <div aria-hidden className="absolute top-0 bottom-0 z-10 pointer-events-none" style={{ right: 104, width: 40, background: "linear-gradient(to left, oklch(0.09 0.012 260), transparent)" }} />
    </div>
  );
}

/* ABOUT */
function About() {
  return (
    <Section id="about" eyebrow="// profile.exe" title={<>PROFILE <span className="text-[oklch(0.72_0.29_350)]">DATA</span></>}>
      <div className="grid md:grid-cols-3 gap-5">
        <Reveal className="md:col-span-2">
          <CpCard className="p-7 md:p-9">
            <div className="flex items-center gap-2 mb-5 font-mono-accent text-[10px] text-foreground/35 uppercase tracking-widest">
              <span className="text-[oklch(0.72_0.29_350)]">●</span> BIO_DATA.TXT
            </div>
            <p className="text-base leading-relaxed text-foreground/75">
              Hannah is an Application Developer with a strong technical foundation and a growing passion for UI/UX. She builds intuitive, scalable, and visually refined products by combining clean engineering with a user-centered design mindset.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-foreground/55">
              She architects maintainable codebases and obsesses over micro-interactions, guided by a strong attention to detail, a problem-solving mindset, and the belief that beautiful software should be just as beautifully built.
            </p>
          </CpCard>
        </Reveal>
        <Reveal delay={120}>
          <div className="grid grid-cols-2 gap-3 h-full">
            {[
              { k: "Cum Laude", v: "CS Degree",   icon: Trophy, color: "yellow" as const },
              { k: "Yr. 2025",        v: "Graduated",  icon: Swords, color: "pink"   as const },
              { k: "3",       v: "Projects",    icon: Shield, color: "pink"   as const },
              { k: "Digital Art",         v: "Hobby",     icon: Star,   color: "yellow" as const },
            ].map((s) => {
              const Ic = s.icon;
              const borderCls = s.color === "yellow"
                ? "border-[oklch(0.82_0.26_142/0.3)] hover:border-[oklch(0.82_0.26_142/0.65)] hover:shadow-glow-yellow"
                : "border-[oklch(0.72_0.29_350/0.25)] hover:border-[oklch(0.72_0.29_350/0.6)] hover:shadow-glow";
              const iconCls  = s.color === "yellow" ? "text-[oklch(0.82_0.26_142)]"   : "text-[oklch(0.72_0.29_350)]";
              const valCls   = s.color === "yellow" ? "text-[oklch(0.82_0.26_142)]"   : "text-[oklch(0.72_0.29_350)]";
              return (
                <div key={s.v} className={`cp-card ${s.color === "yellow" ? "cp-card-yellow" : ""} glass border ${borderCls} p-4 flex flex-col justify-between transition-all`}>
                  <Ic className={`h-4 w-4 ${iconCls} mb-2`} />
                  <div className={`font-display text-2xl ${valCls}`}>{s.k}</div>
                  <div className="font-mono-accent text-[10px] text-foreground/40 mt-1 uppercase tracking-wider">{s.v}</div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------- SKILLS */
const skillGroups = [
  { icon: Code2,    title: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Tailwind"],           color: "pink"   as const },
  { icon: Database, title: "Backend",  items: ["Node.js", "REST APIs", "Databases"],                                       color: "yellow" as const },
  { icon: Wrench,   title: "Tools",    items: ["Git", "GitHub", "VS Code"],                                                color: "pink"   as const },
  { icon: Palette,  title: "Design",   items: ["UI Design", "UX Thinking", "Figma", "Wireframing"],                        color: "yellow" as const },
];

function Skills() {
  return (
    <Section id="skills" eyebrow="// skill_tree.dat" title={<>SKILL <span className="text-[oklch(0.72_0.29_350)]">TREE</span></>}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 80}>
            <CpCard color={g.color} className="p-5 h-full hover:-translate-y-1 transition-transform">
              <div className={`h-10 w-10 border grid place-items-center mb-4 ${g.color === "pink" ? "border-[oklch(0.72_0.29_350/0.4)] text-[oklch(0.72_0.29_350)]" : "border-[oklch(0.82_0.26_142/0.4)] text-[oklch(0.82_0.26_142)]"}`}>
                <g.icon className="h-5 w-5" />
              </div>
              <div className="font-mono-accent text-[10px] text-foreground/30 mb-1 uppercase tracking-wider">MODULE</div>
              <h3 className="font-display text-xl mb-3">{g.title}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <li key={it} className={`font-mono-accent text-[10px] px-2 py-0.5 border bg-[oklch(0.1_0.01_260/0.5)] ${g.color === "pink" ? "border-[oklch(0.72_0.29_350/0.3)] text-[oklch(0.72_0.29_350/0.8)]" : "border-[oklch(0.82_0.26_142/0.3)] text-[oklch(0.82_0.26_142/0.8)]"}`}>
                    {it}
                  </li>
                ))}
              </ul>
            </CpCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------- PROJECTS */
const projects = [
  {
    id: "003",
    title: "Show Up Web App",
    img: p1,
    problem: "A habit and accountability app built to help users show up consistently and become the person their future self will thank them for.",
    stack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "PWA", "Firebase CF", "Firebase Auth", "NoSQL", ""],
    role: "Full-stack Developer",
    github: "", // e.g. "https://github.com/hannahcondada/show-up"
    live: "",   // e.g. "https://showup.app"
  },
  {
    id: "002",
    title: "NEUQuery",
    img: p2,
    problem: "A chatbot designed specifically for New Era University",
    stack: ["JavaScript", "HTML", "CSS", "Python"],
    role: "Developer and UI Designer",
    github: "", // e.g. "https://github.com/hannahcondada/neuquery"
    live: "",   // e.g. "https://neuquery.app"
  },
  {
    id: "001",
    title: "NEUDev",
    img: p3,
    problem: "An AI-powered Coding Assessment Platform built to streamline grading of codes, assisting professors in providing faster and more comprehensive feedback to students.",
    stack: ["JavaScript", "CSS", "PHP", "Blade"],
    role: "Frontend Engineer, UI/UX Designer",
    github: "", // e.g. "https://github.com/hannahcondada/neudev"
    live: "",   // e.g. "https://neudev.app"
  },
];

function Projects() {
  return (
    <Section id="projects" eyebrow="// quest_log.json" title={<>PROJECT <span className="text-[oklch(0.72_0.29_350)]">LOG</span></>}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <CpCard className="overflow-hidden h-full flex flex-col group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute top-2 left-2 z-10 font-mono-accent text-[10px] px-2 py-0.5 bg-[oklch(0.09_0.015_260/0.85)] border border-[oklch(0.72_0.29_350/0.4)] text-[oklch(0.72_0.29_350)]">
                  QUEST_{p.id}
                </div>
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="w-full h-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90 scanlines"
                  style={{ filter: "saturate(0.85)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.09_0.015_260)] via-transparent to-transparent" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display text-xl">{p.title}</h3>
                <p className="mt-1.5 text-sm text-foreground/60 flex-1 leading-relaxed">{p.problem}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="font-mono-accent text-[10px] px-2 py-0.5 border border-[oklch(0.82_0.26_142/0.25)] text-[oklch(0.82_0.26_142/0.75)] bg-[oklch(0.1_0.01_260/0.5)]">{s}</span>
                  ))}
                </div>
                <div className="mt-2 font-mono-accent text-[10px] text-foreground/35">ROLE · {p.role}</div>
                <div className="mt-4 flex gap-2">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="cp-card inline-flex items-center gap-1.5 font-mono-accent text-[11px] px-4 py-2 bg-gradient-primary text-[oklch(0.09_0.015_260)] font-semibold hover:shadow-glow transition-all uppercase tracking-wide">
                      <Github className="h-3.5 w-3.5" /> Code
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" className="cp-card cp-card-yellow inline-flex items-center gap-1.5 font-mono-accent text-[11px] px-4 py-2 border border-[oklch(0.82_0.26_142/0.35)] text-[oklch(0.82_0.26_142)] hover:shadow-glow-yellow hover:border-[oklch(0.82_0.26_142/0.65)] transition-all uppercase tracking-wide">
                      <ExternalLink className="h-3.5 w-3.5" /> Live
                    </a>
                  )}
                  {!p.github && !p.live && (
                    <span className="font-mono-accent text-[10px] text-foreground/25 uppercase tracking-widest">// COMING SOON</span>
                  )}
                </div>
              </div>
            </CpCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------- PROCESS */
const steps = [
  { icon: Search,        title: "Discover", text: "Listen, ask, research.",             phase: "PHASE_01" },
  { icon: ClipboardList, title: "Plan",     text: "Scope, structure, success metrics.", phase: "PHASE_02" },
  { icon: PenTool,       title: "Design",   text: "Wireframes, flows, refined UI.",     phase: "PHASE_03" },
  { icon: Cpu,           title: "Develop",  text: "Clean, scalable, accessible code.",  phase: "PHASE_04" },
  { icon: Zap,           title: "Optimize", text: "Measure, iterate, polish.",          phase: "PHASE_05" },
];

function Process() {
  return (
    <Section id="process" eyebrow="// protocol.sys" title={<>DEV <span className="text-[oklch(0.72_0.29_350)]">PROTOCOL</span></>}>
      <div className="relative">
        <div aria-hidden className="hidden lg:block absolute top-10 left-10 right-10 h-px bg-gradient-to-r from-[oklch(0.72_0.29_350/0)] via-[oklch(0.72_0.29_350/0.4)] to-[oklch(0.82_0.26_142/0)]" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="relative text-center group">
                <div className={`mx-auto h-20 w-20 border grid place-items-center relative z-10 transition-all bg-[oklch(0.13_0.018_255/0.9)] ${i % 2 === 0 ? "border-[oklch(0.72_0.29_350/0.4)] group-hover:border-[oklch(0.72_0.29_350/0.8)] group-hover:shadow-glow" : "border-[oklch(0.82_0.26_142/0.4)] group-hover:border-[oklch(0.82_0.26_142/0.8)] group-hover:shadow-glow-yellow"}`}>
                  <s.icon className={`h-6 w-6 ${i % 2 === 0 ? "text-[oklch(0.72_0.29_350)]" : "text-[oklch(0.82_0.26_142)]"}`} />
                </div>
                <div className="mt-3 font-mono-accent text-[9px] text-foreground/35 uppercase tracking-widest">{s.phase}</div>
                <h3 className="font-display text-lg mt-0.5">{s.title}</h3>
                <p className="mt-1 text-xs text-foreground/50">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* EXPERIENCE */
const exp = [
  { role: "Application Developer",      org: "Caret Solutions, Inc.", period: "January 2026 — Present", text: "Develops and maintains scalable applications, transforming business requirements into efficient, user-focused digital solutions.",                      rank: "S-RANK", color: "pink"   as const },
  { role: "Web Developer / GFX",   org: "Highly Succeed, Inc.",             period: "September 2024 - November 2024",    text: "Built polished web experiences and created compelling visual assets by combining technical development with creative design.",                  rank: "A-RANK", color: "yellow" as const },
];

function Experience() {
  return (
    <Section id="experience" eyebrow="// mission_history.log" title={<>MISSION <span className="text-[oklch(0.72_0.29_350)]">HISTORY</span></>}>
      <div className="relative max-w-3xl mx-auto">
        <div aria-hidden className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[oklch(0.72_0.29_350/0.5)] via-[oklch(0.82_0.26_142/0.4)] to-transparent" />
        <ul className="space-y-8">
          {exp.map((e, i) => (
            <Reveal key={e.role} delay={i * 100}>
              <li className={`relative md:grid md:grid-cols-2 md:gap-10 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className={`pl-12 md:pl-0 ${i % 2 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                  <CpCard color={e.color} className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono-accent text-[10px] text-foreground/40">{e.period}</span>
                      <span className={`font-mono-accent text-[10px] px-2 py-0.5 border ${e.color === "pink" ? "border-[oklch(0.72_0.29_350/0.4)] text-[oklch(0.72_0.29_350)]" : "border-[oklch(0.82_0.26_142/0.4)] text-[oklch(0.82_0.26_142)]"}`}>{e.rank}</span>
                    </div>
                    <h3 className="font-display text-xl">{e.role}</h3>
                    <div className="font-mono-accent text-[11px] text-foreground/45 mt-0.5">{e.org}</div>
                    <p className="mt-2.5 text-sm text-foreground/65">{e.text}</p>
                  </CpCard>
                </div>
                <div aria-hidden className="hidden md:block" />
                <span className={`absolute left-4 md:left-1/2 top-5 -translate-x-1/2 h-3.5 w-3.5 rotate-45 ring-4 ring-background ${e.color === "pink" ? "bg-[oklch(0.72_0.29_350)] shadow-glow" : "bg-[oklch(0.82_0.26_142)] shadow-glow-yellow"}`} />
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* EDUCATION */
function Education() {
  return (
    <Section id="education" eyebrow="// academic_record.dat" title={<>ACADEMIC <span className="text-[oklch(0.72_0.29_350)]">RECORD</span></>}>
      <Reveal>
        <CpCard color="yellow" className="p-7 md:p-9 flex flex-col md:flex-row md:items-start gap-6">
          <div className="h-14 w-14 border-2 border-[oklch(0.82_0.26_142/0.5)] grid place-items-center shadow-glow-yellow flex-shrink-0 text-[oklch(0.82_0.26_142)]">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="font-mono-accent text-[10px] text-foreground/35 uppercase tracking-widest mb-1">Degree Unlocked ★★★</div>
            <h3 className="font-display text-2xl">Bachelor of Science in Computer Science</h3>
            <p className="text-foreground/55 mt-1 text-sm">Graduated <span className="font-semibold text-[oklch(0.82_0.26_142)]">Cum Laude</span></p>
            <p className="mt-3 text-sm text-foreground/65 max-w-2xl leading-relaxed">
              Strong foundation in algorithms, software architecture, and human-centered computing — paired with
              continuous learning in modern UI/UX practice.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 md:flex-col">
            {["Algorithms", "Software Eng.", "HCI", "Databases"].map((t) => (
              <span key={t} className="font-mono-accent text-[10px] px-2.5 py-1 border border-[oklch(0.82_0.26_142/0.3)] text-[oklch(0.82_0.26_142/0.75)] bg-[oklch(0.1_0.01_260/0.5)] whitespace-nowrap">{t}</span>
            ))}
          </div>
        </CpCard>
      </Reveal>
    </Section>
  );
}

/*
// ------------------------------- TESTIMONIALS (comment out if gonna use)
const quotes = [
  { name: "Ferson 1", role: "Magaling", text: "WOW" },
  { name: "Ferson 2", role: "Mas Magaling",   text: "GALING" },
  { name: "Ferson 3", role: "Pinakamagaling",         text: "Gege sabi mo eh" },
];

function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="// player_reviews.txt" title={<>PLAYER <span className="text-[oklch(0.72_0.29_350)]">REVIEWS</span></>}>
      <div className="grid md:grid-cols-3 gap-4">
        {quotes.map((q, i) => (
          <Reveal key={q.name} delay={i * 100}>
            <CpCard color={i % 2 === 0 ? "pink" : "yellow"} className="p-5 h-full flex flex-col">
              <Quote className={`h-5 w-5 mb-3 ${i % 2 === 0 ? "text-[oklch(0.72_0.29_350/0.6)]" : "text-[oklch(0.82_0.26_142/0.6)]"}`} />
              <p className="text-sm text-foreground/70 leading-relaxed flex-1">"{q.text}"</p>
              <div className="mt-4 flex items-center gap-3 border-t border-[oklch(0.72_0.29_350/0.12)] pt-3">
                <div className={`h-8 w-8 border grid place-items-center font-mono-accent text-xs font-bold ${i % 2 === 0 ? "border-[oklch(0.72_0.29_350/0.5)] text-[oklch(0.72_0.29_350)]" : "border-[oklch(0.82_0.26_142/0.5)] text-[oklch(0.82_0.26_142)]"}`}>
                  {q.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium">{q.name}</div>
                  <div className="font-mono-accent text-[10px] text-foreground/40">{q.role}</div>
                </div>
              </div>
            </CpCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
*/

/* ------------------------------- CONTACT */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="contact" eyebrow="// initiate_contact.sh" title={<>INITIATE <span className="text-[oklch(0.72_0.29_350)]">CONTACT</span></>}>
      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-5">
        <Reveal>
          <CpCard className="p-7 md:p-9">
            <div className="font-mono-accent text-[10px] text-foreground/35 uppercase tracking-widest mb-5">[ TRANSMIT MESSAGE ]</div>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <CpField label="Name"  id="name" />
              <CpField label="Email" id="email" type="email" />
              <div>
                <label htmlFor="msg" className="block font-mono-accent text-[10px] uppercase tracking-widest text-foreground/40 mb-2">Message</label>
                <textarea id="msg" rows={5} required className="w-full bg-[oklch(0.11_0.015_258)] border border-[oklch(0.72_0.29_350/0.25)] px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[oklch(0.72_0.29_350/0.7)] focus:shadow-glow transition-all resize-none font-mono-accent" />
              </div>
              <button type="submit" className="cp-card inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-[oklch(0.09_0.015_260)] font-mono-accent text-xs font-bold uppercase tracking-widest hover:shadow-glow transition-all">
                {sent ? "✓ TRANSMITTED" : "Send Message"} {!sent && <ArrowRight className="h-3.5 w-3.5" />}
              </button>
            </form>
          </CpCard>
        </Reveal>
        <Reveal delay={120}>
          <div className="grid gap-3">
            <ContactCard icon={<Mail className="h-4 w-4" />}     title="Email"    value="hannah.condada21@gmail.com"           href="mailto:hannah.condada21@gmail.com" color="pink" />
            <ContactCard icon={<Github className="h-4 w-4" />}   title="GitHub"   value="github.com/hannahcondada"      href="https://github.com"        color="yellow" />
            <ContactCard icon={<Linkedin className="h-4 w-4" />} title="LinkedIn" value="linkedin.com/in/hannahcondada" href="https://linkedin.com"       color="pink" />
            <ContactCard icon={<MapPin className="h-4 w-4" />}   title="Based in" value="Available worldwide · Remote"                                   color="yellow" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function CpField({ label, id, type = "text" }: { label: string; id: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono-accent text-[10px] uppercase tracking-widest text-foreground/40 mb-2">{label}</label>
      <input id={id} type={type} required className="w-full bg-[oklch(0.11_0.015_258)] border border-[oklch(0.72_0.29_350/0.25)] px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-[oklch(0.72_0.29_350/0.7)] focus:shadow-glow transition-all font-mono-accent" />
    </div>
  );
}

function ContactCard({ icon, title, value, href, color }: { icon: React.ReactNode; title: string; value: string; href?: string; color: "pink" | "yellow" }) {
  const Inner = (
    <CpCard color={color} className="p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-transform">
      <span className={`h-9 w-9 border grid place-items-center flex-shrink-0 ${color === "pink" ? "border-[oklch(0.72_0.29_350/0.45)] text-[oklch(0.72_0.29_350)]" : "border-[oklch(0.82_0.26_142/0.45)] text-[oklch(0.82_0.26_142)]"}`}>{icon}</span>
      <div>
        <div className="font-mono-accent text-[10px] text-foreground/35 uppercase tracking-widest">{title}</div>
        <div className="text-sm text-foreground/80">{value}</div>
      </div>
    </CpCard>
  );
  return href ? <a href={href}>{Inner}</a> : <>{Inner}</>;
}

/* ------------------------------- FOOTER */
function Footer() {
  return (
    <footer className="mt-12 pb-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="border-t border-[oklch(0.72_0.29_350/0.2)] pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="font-display text-lg">
            <span className="text-[oklch(0.72_0.29_350)] font-semibold">Hannah</span>
            <span className="text-foreground/50"> Condada</span>
            <span className="font-mono-accent text-xs text-foreground/30 ml-2">// Application Developer</span>
          </div>
          <div className="flex items-center gap-2">
            {[
              { href: "#",                         label: "GitHub",   icon: <Github className="h-4 w-4" />,   color: "pink"   as const },
              { href: "#",                         label: "LinkedIn", icon: <Linkedin className="h-4 w-4" />, color: "yellow" as const },
              { href: "mailto:hannah.cndada21@gmail.com", label: "Email",    icon: <Mail className="h-4 w-4" />,     color: "pink"   as const },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className={`h-9 w-9 border grid place-items-center transition-all ${s.color === "pink" ? "border-[oklch(0.72_0.29_350/0.3)] text-foreground/45 hover:border-[oklch(0.72_0.29_350/0.7)] hover:text-[oklch(0.72_0.29_350)] hover:shadow-glow" : "border-[oklch(0.82_0.26_142/0.3)] text-foreground/45 hover:border-[oklch(0.82_0.26_142/0.7)] hover:text-[oklch(0.82_0.26_142)] hover:shadow-glow-yellow"}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="font-mono-accent text-[10px] text-foreground/30">
            © {new Date().getFullYear()} HANNAH CONDADA · ALL RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------- PRIMITIVES */
function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-10">
            <span className="font-mono-accent text-xs text-[oklch(0.72_0.29_350/0.7)]">{eyebrow}</span>
            <h2 className="mt-2 font-game text-xl md:text-2xl uppercase tracking-[0.1em] whitespace-nowrap">{title}</h2>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function CpCard({ children, className = "", color = "pink" }: { children: React.ReactNode; className?: string; color?: "pink" | "yellow" }) {
  const borderCls = color === "pink"
    ? "border-[oklch(0.72_0.29_350/0.22)]"
    : "border-[oklch(0.82_0.26_142/0.22)]";
  const cornerCls = color === "pink" ? "cp-card" : "cp-card cp-card-yellow";
  return (
    <div className={`${cornerCls} glass border ${borderCls} shadow-soft ${className}`}>
      {children}
    </div>
  );
}
