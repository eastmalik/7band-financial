import { Link } from "wouter";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Shield, Zap, TrendingUp, Lock, Users, ChevronRight,
  Star, Target, Building2, TreePine, ArrowRight, Play,
  CheckCircle, DollarSign, Cpu, ArrowDown
} from "lucide-react";

function SectionLabel({ text, danger = false }: { text: string; danger?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-sm mb-6 font-tactical text-xs font-semibold tracking-[0.2em] uppercase ${
      danger
        ? "bg-red-950/60 border border-red-600/40 text-red-400"
        : "bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c]"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${danger ? "bg-red-500 animate-pulse" : "bg-[#c9a84c]"}`} />
      {text}
    </div>
  );
}

function HudFrame({ children, className = "", danger = false }: { children: React.ReactNode; className?: string; danger?: boolean }) {
  const borderColor = danger ? "rgba(220,38,38,0.7)" : "rgba(201,168,76,0.7)";
  return (
    <div className={`relative ${className}`}>
      <span className="absolute top-0 left-0 w-4 h-4 pointer-events-none" style={{ borderTop: `2px solid ${borderColor}`, borderLeft: `2px solid ${borderColor}` }} />
      <span className="absolute top-0 right-0 w-4 h-4 pointer-events-none" style={{ borderTop: `2px solid ${borderColor}`, borderRight: `2px solid ${borderColor}` }} />
      <span className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none" style={{ borderBottom: `2px solid ${borderColor}`, borderLeft: `2px solid ${borderColor}` }} />
      <span className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none" style={{ borderBottom: `2px solid ${borderColor}`, borderRight: `2px solid ${borderColor}` }} />
      {children}
    </div>
  );
}

type LevelData = {
  level: number;
  title: string;
  concept: string;
  phase: string;
  action: string;
  result: string;
  unlocks: string;
  icon: React.ReactNode;
};

function QuestLevelCard({ lvl, index, isUnlocked, onUnlock }: { lvl: LevelData; index: number; isUnlocked: boolean; onUnlock: (level: number) => void }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 90);
          observer.disconnect();
        }
      },
      { threshold: 0.10 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const handleUnlock = useCallback(() => onUnlock(lvl.level), [lvl.level, onUnlock]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleUnlock();
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleUnlock}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isUnlocked}
      aria-label={`Level ${lvl.level}: ${lvl.title}. ${isUnlocked ? "Unlocked" : "Select to unlock"}`}
      className={`quest-level-card p-6 bg-[#0a0800]/80 flex flex-col gap-4 cursor-pointer ${visible ? "is-visible" : ""} ${isUnlocked ? "is-unlocked" : ""}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.55s cubic-bezier(0.23,1,0.32,1), transform 0.55s cubic-bezier(0.23,1,0.32,1)`,
      }}
    >
      {/* Level badge + concept */}
      <div className="flex items-center gap-3">
        <div className="level-badge flex-shrink-0 w-11 h-11 text-base">{lvl.level}</div>
        <div>
          <div className="quest-concept-label font-tactical text-[11px] text-[#c9a84c]/60 tracking-widest uppercase">{lvl.concept}</div>
          <div className="font-display text-lg font-bold text-white leading-tight">{lvl.title}</div>
        </div>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-[#c9a84c]/30 to-transparent" />
      {/* Action */}
      <div>
        <div className="font-tactical text-[11px] text-[#c9a84c] font-bold tracking-widest uppercase mb-1">Mission Objective</div>
        <p className="font-tactical text-sm text-white/70 leading-relaxed tracking-wide">{lvl.action}</p>
      </div>
      {/* Result */}
      <div>
        <div className="font-tactical text-[11px] text-[#c9a84c] font-bold tracking-widest uppercase mb-1">Outcome Achieved</div>
        <p className="font-tactical text-sm text-white/70 leading-relaxed tracking-wide">{lvl.result}</p>
      </div>
      {/* Unlocks */}
      <div className="mt-auto pt-3 border-t border-[#c9a84c]/15">
        <span className="font-tactical text-[10px] text-[#c9a84c]/50 tracking-widest uppercase">Unlocks → </span>
        <span className="font-tactical text-[10px] text-[#c9a84c]/80 tracking-wide">{lvl.unlocks}</span>
      </div>
      <div className="map-card-status font-tactical text-[10px] font-bold tracking-[0.14em] uppercase" aria-live="polite">
        <span className="map-card-status-dot" /> {isUnlocked ? "Level unlocked" : "Select to unlock"}
      </div>
    </div>
  );
}

function PhaseConnector({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`phase-connector flex justify-center py-5 ${visible ? "is-visible" : ""}`}>
      <div className="flex flex-col items-center gap-1">
        <div className="phase-connector-line" />
        <ArrowDown size={14} className="phase-connector-arrow text-[#c9a84c]" />
        <div className="font-tactical text-[10px] text-[#c9a84c]/50 tracking-widest uppercase">{label}</div>
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { label: "← Home", href: "/", desc: "Return to base camp" },
    { label: "Lifetime LOC", href: "/lifetime-loc", desc: "The core wealth engine" },
    { label: "About", href: "/about", desc: "Meet your guide, Malik East" },
    { label: "The Book", href: "/the-book", desc: "The Generational Wealth Blueprint" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050400]/95 backdrop-blur-xl border-b border-[#c9a84c]/20" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="player-brand-crest group-hover:brightness-125">
                <span className="font-display font-black text-[#c9a84c] text-base">7</span>
              </div>
              <span className="player-brand-wordmark font-tactical font-bold text-white tracking-wider text-sm uppercase hidden sm:block">
                7Band <span className="text-[#c9a84c]">Financial</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}
                  className="font-tactical text-sm font-semibold tracking-wider text-[#c9a84c]/70 hover:text-[#c9a84c] uppercase transition-colors">
                  {item.label}
                </Link>
              ))}
              <a href="https://calendly.com/malikeast7band" target="_blank" rel="noopener noreferrer"
                className="font-tactical text-xs font-bold tracking-widest uppercase px-4 py-2 bg-[#c9a84c] text-black hover:bg-[#e8c97a] transition-colors gold-pulse">
                Begin Quest
              </a>
            </div>
            <button
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 border border-[#c9a84c]/40 bg-[#0a0800]/80 hover:border-[#c9a84c]/80 transition-colors z-50"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`block w-5 h-0.5 bg-[#c9a84c] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#c9a84c] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#c9a84c] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen HUD mobile menu */}
      <div
        className="fixed inset-0 z-40 md:hidden circuit-bg flex flex-col"
        style={{
          background: "linear-gradient(160deg, #050400 0%, #0a0800 60%, #050400 100%)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.35s cubic-bezier(0.23,1,0.32,1), transform 0.35s cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#c9a84c]/15">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
            <div className="player-brand-crest">
              <span className="font-display font-black text-[#c9a84c] text-base">7</span>
            </div>
            <span className="player-brand-wordmark font-tactical font-bold text-white tracking-wider text-sm uppercase">
              7Band <span className="text-[#c9a84c]">Financial</span>
            </span>
          </Link>
          <button onClick={() => setMenuOpen(false)} className="w-10 h-10 flex items-center justify-center border border-[#c9a84c]/40 bg-[#0a0800]/80 text-[#c9a84c] font-tactical text-xs tracking-widest">✕</button>
        </div>
        <div className="px-6 py-3 flex items-center gap-3 border-b border-[#c9a84c]/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
          <span className="font-tactical text-[10px] text-[#c9a84c]/50 tracking-[0.2em] uppercase">Navigation System Active</span>
          <span className="ml-auto font-tactical text-[10px] text-[#c9a84c]/30 tracking-widest uppercase">Game Map — Active</span>
        </div>
        <div className="flex-1 flex flex-col justify-center px-6 gap-1">
          {navItems.map((item, i) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              className="group relative flex items-center gap-4 py-5 border-b border-[#c9a84c]/10 hover:border-[#c9a84c]/30 transition-all"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.4s cubic-bezier(0.23,1,0.32,1) ${0.1 + i * 0.07}s, transform 0.4s cubic-bezier(0.23,1,0.32,1) ${0.1 + i * 0.07}s`,
              }}
            >
              <div className="w-9 h-9 rounded-sm border border-[#c9a84c]/40 bg-[#c9a84c]/5 flex items-center justify-center flex-shrink-0 group-hover:border-[#c9a84c]/80 group-hover:bg-[#c9a84c]/15 transition-all">
                <span className="font-display font-black text-[#c9a84c] text-xs">{i + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-tactical font-bold text-white text-base tracking-wider uppercase group-hover:text-[#c9a84c] transition-colors">{item.label}</div>
                <div className="font-tactical text-[11px] text-[#c9a84c]/40 tracking-wide mt-0.5">{item.desc}</div>
              </div>
              <ChevronRight size={16} className="text-[#c9a84c]/30 group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
        <div className="px-6 pb-10 pt-4" style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? "translateY(0)" : "translateY(12px)", transition: "opacity 0.4s cubic-bezier(0.23,1,0.32,1) 0.42s, transform 0.4s cubic-bezier(0.23,1,0.32,1) 0.42s" }}>
          <a href="https://calendly.com/malikeast7band" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
            className="w-full py-4 bg-[#c9a84c] text-black font-tactical font-black text-sm tracking-widest uppercase text-center block gold-pulse">
            ▶ BEGIN YOUR QUEST
          </a>
          <p className="font-tactical text-[10px] text-[#c9a84c]/30 tracking-widest uppercase text-center mt-3">Free strategy call · No obligation</p>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />
      </div>
    </>
  );
}

const LEVELS: LevelData[] = [
  {
    level: 1,
    title: "Restore Your Shield",
    concept: "Credit Optimization",
    phase: "Phase I — Foundation",
    action: "Erase derogatory marks, remove penalties, and optimize your personal credit profile to elite status.",
    result: "Drop your debt-to-income ratio and build the ultimate defense against high retail interest rates.",
    unlocks: "Access to high-limit business and personal funding lines at Level 3.",
    icon: <Shield size={22} className="text-[#c9a84c]" />,
  },
  {
    level: 2,
    title: "Build Your Base",
    concept: "LLC Structuring",
    phase: "Phase I — Foundation",
    action: "Establish a formal corporate entity to create a structural firewall between personal and business liabilities.",
    result: "Unlocks Business-Level Play, ensuring future high-capacity borrowing does not affect your personal credit.",
    unlocks: "Business credit lines, corporate banking, and entity-level asset protection.",
    icon: <Building2 size={22} className="text-[#c9a84c]" />,
  },
  {
    level: 3,
    title: "Gather Resources",
    concept: "Capital Access",
    phase: "Phase II — Acceleration",
    action: "Tap into high-limit business and personal funding lines to create immediate liquidity.",
    result: "You now have the capital required to fund the core engine at Level 4.",
    unlocks: "The IUL policy premium and the Lifetime LOC mechanic.",
    icon: <DollarSign size={22} className="text-[#c9a84c]" />,
  },
  {
    level: 4,
    title: "Unlock the Engine",
    concept: "IUL / Lifetime LOC",
    phase: "Phase II — Acceleration",
    action: "Fund an Indexed Universal Life policy and activate the Lifetime Line of Credit mechanic.",
    result: "Borrow against your cash value to buy assets while your baseline capital continues to compound uninterrupted.",
    unlocks: "Tax-advantaged growth, policy loans with no credit check, and the dual-job money mechanic.",
    icon: <Zap size={22} className="text-[#c9a84c]" />,
  },
  {
    level: 5,
    title: "Construct the Fortress",
    concept: "Trust & Holding Company",
    phase: "Phase II — Acceleration",
    action: "Move assets out of your personal name and into a legal fortress. Shield your estate from lawsuits, liabilities, and immediate taxation.",
    result: "Your assets are now protected at the entity level — untouchable by creditors and lawsuits.",
    unlocks: "The ability to name the Trust as IUL beneficiary and design the wealth transfer at Level 6.",
    icon: <Lock size={22} className="text-[#c9a84c]" />,
  },
  {
    level: 6,
    title: "Design the Transfer",
    concept: "Beneficiary Architecture",
    phase: "Phase III — Legacy",
    action: "Name the Trust as the primary beneficiary of the IUL. Set the exact rules for how wealth is distributed to heirs.",
    result: "Wealth passes tax-free, bypassing probate entirely and keeping capital out of the government's reach.",
    unlocks: "A fully automated generational transfer — no courts, no delays, no estate tax exposure.",
    icon: <Target size={22} className="text-[#c9a84c]" />,
  },
  {
    level: 7,
    title: "The Generational Tree",
    concept: "Multi-Generation Banking",
    phase: "Phase III — Legacy",
    action: "The death benefit recapitalizes the Family Bank. Generation 2 finances their businesses and lives from this pool, funding Generation 3.",
    result: "The capital pool never resets to zero. It compounds across lifetimes.",
    unlocks: "Infinite generational reach — your great-grandchildren start at Level 4, not Level 1.",
    icon: <TreePine size={22} className="text-[#c9a84c]" />,
  },
];

export default function GameMap() {
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const storedLevels = JSON.parse(window.localStorage.getItem("7band-unlocked-levels") ?? "[]");
      return Array.isArray(storedLevels) ? storedLevels.filter((level): level is number => typeof level === "number") : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("7band-unlocked-levels", JSON.stringify(unlockedLevels));
  }, [unlockedLevels]);

  const unlockLevel = useCallback((level: number) => {
    setUnlockedLevels((current) => current.includes(level) ? current : [...current, level]);
  }, []);

  return (
    <div className="min-h-screen bg-[#050400] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden circuit-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050400]/70 via-[#050400]/30 to-[#050400]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full bg-[#c9a84c]/5 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-32 pb-16">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 gold-text-glow-intense">
            The Generational<br />
            <span className="text-[#c9a84c]">Wealth Blueprint</span>
          </h1>
          <p className="font-tactical text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-4 leading-relaxed tracking-wide">
            A proven, sequential system built for families who are done playing by the bank's rules. Each level unlocks the next. Every level builds on the last. Complete all 7 and you become the bank that finances your family's future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendly.com/malikeast7band" target="_blank" rel="noopener noreferrer"
              className="hud-cta hud-cta-primary inline-flex items-center gap-2 px-8 py-4 bg-[#c9a84c] text-black font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#e8c97a] transition-all gold-pulse">
              <Play size={14} fill="currentColor" /> Begin Your Quest
            </a>
            <Link href="/lifetime-loc"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#c9a84c] font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#c9a84c]/10 transition-all">
              Level 4 Deep Dive <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* PHASE OVERVIEW */}
      <section className="relative py-10 bg-[#050400] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { phase: "Phase I", label: "Foundation", levels: "Levels 1–2", desc: "Restore your credit shield and establish your corporate base. These two levels are the prerequisite for everything that follows.", color: "border-[#c9a84c]/40", icon: <Shield size={18} className="text-[#c9a84c]/60" /> },
              { phase: "Phase II", label: "Acceleration", levels: "Levels 3–5", desc: "Gather capital, activate the IUL engine, and build the legal fortress that protects everything you've built.", color: "border-[#c9a84c]/70", icon: <Zap size={18} className="text-[#c9a84c]/80" /> },
              { phase: "Phase III", label: "Legacy", levels: "Levels 6–7", desc: "Design the generational transfer and activate the multi-generation banking loop that outlasts you by a century.", color: "border-[#c9a84c]", icon: <TreePine size={18} className="text-[#c9a84c]" /> },
            ].map((p) => (
              <HudFrame key={p.phase} className={`p-5 bg-[#0a0800]/70 border-b-2 ${p.color}`}>
                <div className="flex items-center gap-3 mb-3">
                  {p.icon}
                  <div>
                    <div className="font-tactical text-[10px] text-[#c9a84c]/50 tracking-widest uppercase">{p.phase} — {p.levels}</div>
                    <div className="font-display text-lg font-bold text-white">{p.label}</div>
                  </div>
                </div>
                <p className="font-tactical text-xs text-white/55 tracking-wide leading-relaxed">{p.desc}</p>
              </HudFrame>
            ))}
          </div>
          <p className="mt-10 text-center font-tactical text-base font-black uppercase tracking-[0.14em] text-[#c9a84c] sm:text-lg">
            Select any level card to unlock it and begin.
          </p>
        </div>
      </section>

      {/* PHASE I — FOUNDATION */}
      <section className="map-phase-section relative py-20 bg-gradient-to-b from-[#050400] to-[#080600] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(201,168,76,0.04)_0%,transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-px h-12 bg-gradient-to-b from-[#c9a84c]/60 to-transparent" />
            <div>
              <div className="font-tactical text-[10px] text-[#c9a84c]/50 tracking-widest uppercase">Phase I</div>
              <div className="font-display text-2xl font-bold text-white">Foundation — Levels 1 & 2</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEVELS.slice(0, 2).map((lvl, i) => (
              <QuestLevelCard key={lvl.level} lvl={lvl} index={i} isUnlocked={unlockedLevels.includes(lvl.level)} onUnlock={unlockLevel} />
            ))}
          </div>
        </div>
      </section>

      {/* CONNECTOR */}
      <PhaseConnector label="Phase II unlocked" />

      {/* PHASE II — ACCELERATION */}
      <section className="map-phase-section relative py-20 bg-gradient-to-b from-[#080600] to-[#050400] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06)_0%,transparent_70%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-px h-12 bg-gradient-to-b from-[#c9a84c]/80 to-transparent" />
            <div>
              <div className="font-tactical text-[10px] text-[#c9a84c]/50 tracking-widest uppercase">Phase II</div>
              <div className="font-display text-2xl font-bold text-white">Acceleration — Levels 3, 4 & 5</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEVELS.slice(2, 5).map((lvl, i) => (
              <QuestLevelCard key={lvl.level} lvl={lvl} index={i + 2} isUnlocked={unlockedLevels.includes(lvl.level)} onUnlock={unlockLevel} />
            ))}
          </div>
          {/* Level 4 callout */}
          <div className="mt-8">
            <HudFrame className="p-6 bg-[#c9a84c]/8 border border-[#c9a84c]/40">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Zap size={28} className="text-[#c9a84c] flex-shrink-0" />
                <div className="flex-1">
                  <div className="font-display text-base font-bold text-white mb-1">Level 4 is the core engine of the entire blueprint.</div>
                  <p className="font-tactical text-sm text-white/60 tracking-wide">The Lifetime LOC page contains a full deep-dive into the IUL mechanic, the engine loop, and 4 detailed lessons on how to use it correctly.</p>
                </div>
                <Link href="/lifetime-loc"
                  className="hud-cta flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-black font-tactical font-bold text-xs tracking-widest uppercase hover:bg-[#e8c97a] transition-all">
                  Read Level 4 Deep Dive <ArrowRight size={12} />
                </Link>
              </div>
            </HudFrame>
          </div>
        </div>
      </section>

      {/* CONNECTOR */}
      <PhaseConnector label="Phase III unlocked" />

      {/* PHASE III — LEGACY */}
      <section className="map-phase-section relative py-20 bg-gradient-to-b from-[#050400] to-[#080600] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(201,168,76,0.05)_0%,transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-px h-12 bg-gradient-to-b from-[#c9a84c] to-transparent" />
            <div>
              <div className="font-tactical text-[10px] text-[#c9a84c]/50 tracking-widest uppercase">Phase III</div>
              <div className="font-display text-2xl font-bold text-white">Legacy — Levels 6 & 7</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEVELS.slice(5, 7).map((lvl, i) => (
              <QuestLevelCard key={lvl.level} lvl={lvl} index={i + 5} isUnlocked={unlockedLevels.includes(lvl.level)} onUnlock={unlockLevel} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL STATE — VICTORY */}
      <section className="relative py-24 bg-[#050400] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.10)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#c9a84c] mb-4 gold-text-glow-intense">
            This Is What Winning Looks Like.
          </h2>
          <p className="font-tactical text-white/60 text-lg max-w-2xl mx-auto tracking-wide mb-14">
            Complete all 7 levels and this is your final state.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto mb-14">
            {[
              "You are entirely decoupled from the traditional banking system.",
              "You fund your next business expansion, real estate acquisition, and children's education from an asset that never stops compounding.",
              "You have established an impenetrable fortress around your family's assets.",
              "You leave behind a fully capitalized Family Bank, ensuring your wealth outlasts you by a hundred years.",
            ].map((outcome) => (
              <HudFrame key={outcome} className="p-5 bg-[#0a0800]/80 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-[#c9a84c] flex-shrink-0 mt-0.5" />
                  <p className="font-tactical text-sm text-white/80 leading-relaxed tracking-wide">{outcome}</p>
                </div>
              </HudFrame>
            ))}
          </div>
          <div className="font-display text-2xl sm:text-3xl font-black text-white gold-text-glow mb-10">
            "You become the bank that finances your family's future."
          </div>
          <a href="https://calendly.com/malikeast7band" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#c9a84c] text-black font-tactical font-black text-base tracking-widest uppercase hover:bg-[#e8c97a] transition-all gold-pulse">
            <Star size={16} fill="currentColor" /> Lock In Your Character — Begin Now
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#030200] border-t border-[#c9a84c]/15 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-sm bg-[#c9a84c]/10 border border-[#c9a84c]/50 flex items-center justify-center">
              <img src="/manus-storage/7band-logo-clean_7b539e21.png" alt="7Band Financial" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-tactical font-bold text-white tracking-wider text-xs uppercase">
              7Band <span className="text-[#c9a84c]">Financial Agency</span>
            </span>
          </div>
          <p className="font-tactical text-xs text-white/25 tracking-wide text-center max-w-lg">
            Life insurance products are subject to underwriting. Results vary. This is not financial, legal, or tax advice.
          </p>
          <p className="font-tactical text-xs text-white/25 tracking-wide">
            © {new Date().getFullYear()} 7Band Financial Agency
          </p>
        </div>
      </footer>
    </div>
  );
}
