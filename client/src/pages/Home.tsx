/**
 * 7Band Financial Agency — Homepage
 * Theme: High-end Gold & Dark RPG gamified SB7 framework
 * Layout: Z-pattern — grunt-test header, villain, 7 Levels quest map, pricing tiers, stakes
 * Core Message: "Stop Funding Their Dreams. Start Funding Yours."
 * Brand One-Liner: 7-Level Generational Wealth Blueprint
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import {
  Shield, Building2, Coins, Zap, Lock, GitBranch, TreePine,
  ArrowRight, ChevronDown, AlertTriangle, Trophy, Download, Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const levels = [
  {
    num: "01",
    phase: "Foundation",
    icon: <Shield size={28} />,
    title: "Restore Your Shield",
    sub: "Credit Restoration",
    desc: "Your credit score is your financial passport. We restore it so every door opens.",
    color: "#c9a84c",
  },
  {
    num: "02",
    phase: "Foundation",
    icon: <Building2 size={28} />,
    title: "Build Your Base",
    sub: "LLC Structure",
    desc: "Separate your personal wealth from liability. Build the legal foundation that protects everything you earn.",
    color: "#c9a84c",
  },
  {
    num: "03",
    phase: "Foundation",
    icon: <Coins size={28} />,
    title: "Gather Resources",
    sub: "Access Capital",
    desc: "Business credit, funding lines, and capital access — without using your personal credit as collateral.",
    color: "#c9a84c",
  },
  {
    num: "04",
    phase: "Acceleration",
    icon: <Zap size={28} />,
    title: "Unlock The Engine",
    sub: "IUL / Lifetime Line of Credit",
    desc: "The tool banks buy by the billion for themselves. A line of credit that grows, never gets called, and funds two jobs at once.",
    color: "#f59e0b",
    featured: true,
  },
  {
    num: "05",
    phase: "Legacy",
    icon: <Lock size={28} />,
    title: "Construct the Fortress",
    sub: "Trust & Holding Company",
    desc: "Move assets out of your personal name. Build the structure that owns your businesses, cars, and real estate.",
    color: "#e8c97a",
  },
  {
    num: "06",
    phase: "Legacy",
    icon: <GitBranch size={28} />,
    title: "Design the Transfer",
    sub: "Trust Beneficiary Planning",
    desc: "Decide exactly who gets what, when, and how. No probate. No guessing. No government interference.",
    color: "#e8c97a",
  },
  {
    num: "07",
    phase: "Legacy",
    icon: <TreePine size={28} />,
    title: "The Generational Tree",
    sub: "The High Score — Wealth That Never Resets",
    desc: "The family bank. Every dollar works two jobs. Every generation starts ahead. The wealth never resets to zero.",
    color: "#e8c97a",
    isLast: true,
  },
];

const packs = [
  {
    tier: "Bronze",
    name: "The Foundational Move",
    price: "$750",
    tagline: "Lay the groundwork. Stop the bleeding.",
    color: "#cd7f32",
    items: [
      "Credit Restoration Strategy (Level 1)",
      "LLC Formation Guidance (Level 2)",
      "Capital Access Roadmap (Level 3)",
      "1-on-1 Needs Analysis Session",
      "Financial Audit & Gap Report",
    ],
    cta: "Start the Foundation",
  },
  {
    tier: "Silver",
    name: "The Pro-Gamer Move",
    price: "$1,500",
    tagline: "Add the IUL engine. Money works two jobs.",
    color: "#c9a84c",
    featured: true,
    items: [
      "Everything in Bronze",
      "IUL / Lifetime LOC Design (Level 4)",
      "Policy Illustration & Comparison",
      "Banking Strategy Blueprint",
      "Ongoing Policy Review (Year 1)",
    ],
    cta: "Choose Your Expansion Pack",
  },
  {
    tier: "Gold",
    name: "The Master Class",
    price: "$5,000",
    tagline: "Full 7-Level Blueprint. Attorney included.",
    color: "#e8c97a",
    items: [
      "Everything in Silver",
      "Trust & Holding Company Setup (Level 5)",
      "Trust Beneficiary Design (Level 6)",
      "Generational Transfer Plan (Level 7)",
      "Attorney Consultation Included",
      "Full 7-Level Blueprint Document",
    ],
    cta: "Unlock the Master Class",
  },
];

const phaseColors: Record<string, string> = {
  Foundation: "#c9a84c",
  Acceleration: "#f59e0b",
  Legacy: "#e8c97a",
};

export default function Home() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0a0a0a", color: "#e8d5a3" }}>
      <Navbar />

      {/* ── HERO — GRUNT TEST ─────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/manus-storage/7band-hero-bg_6c47a05e.png')`,
            opacity: 0.08,
          }}
        />
        {/* Gold radial glow */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.08) 0%, transparent 70%)"
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT — Main hook */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
              style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.35)" }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "#c9a84c" }} />
              <span className="font-body text-xs font-semibold tracking-widest uppercase" style={{ color: "#c9a84c" }}>
                Licensed Life Insurance Agent
              </span>
            </div>

            <h1 className="font-display font-bold leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#f5f0e8" }}>
              Stop Funding{" "}
              <span style={{ color: "#c9a84c" }}>Their Dreams.</span>
              <br />
              Start Funding{" "}
              <span style={{ color: "#c9a84c" }}>Yours.</span>
            </h1>

            <p className="font-body text-lg leading-relaxed mb-4" style={{ color: "rgba(232,213,163,0.75)", maxWidth: "520px" }}>
              Most people lose a small fortune in interest and taxes because they were never taught how to be their own bank.
            </p>
            <p className="font-body text-base leading-relaxed mb-10" style={{ color: "rgba(232,213,163,0.55)", maxWidth: "520px" }}>
              We provide a <strong style={{ color: "#c9a84c" }}>7-Level Generational Wealth Blueprint</strong> that helps you restore your credit, access business funding, and build a tax-free legacy — so your family's money never stops working for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("#expansion-packs")}
                className="font-body font-bold px-8 py-4 rounded-md transition-all duration-150 active:scale-95 text-base"
                style={{ backgroundColor: "#c9a84c", color: "#0a0a0a" }}
              >
                Choose Your Expansion Pack
              </button>
              <button
                onClick={() => scrollTo("#free-guide")}
                className="font-body font-semibold px-8 py-4 rounded-md transition-all duration-150 active:scale-95 text-base"
                style={{ border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c", background: "transparent" }}
              >
                Download the Free Guide ↓
              </button>
            </div>
          </div>

          {/* RIGHT — One-liner card */}
          <Reveal delay={200}>
            <div className="rounded-2xl p-8" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.25)" }}>
              <div className="flex items-center gap-3 mb-6">
                <Star size={20} style={{ color: "#c9a84c" }} />
                <span className="font-body text-xs font-bold tracking-widest uppercase" style={{ color: "#c9a84c" }}>
                  The 7-Level Blueprint
                </span>
              </div>
              <div className="space-y-4">
                {[
                  { phase: "Phase 1: Foundation", levels: "Levels 1–3", desc: "Credit · LLC · Capital" },
                  { phase: "Phase 2: Acceleration", levels: "Level 4", desc: "IUL Engine · Lifetime LOC" },
                  { phase: "Phase 3: Legacy", levels: "Levels 5–7", desc: "Trust · Transfer · Generational Tree" },
                ].map((p) => (
                  <div key={p.phase} className="flex items-start gap-4 p-4 rounded-lg" style={{ background: "rgba(201,168,76,0.06)" }}>
                    <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: "#c9a84c" }} />
                    <div>
                      <p className="font-body font-bold text-sm" style={{ color: "#c9a84c" }}>{p.phase}</p>
                      <p className="font-body text-xs" style={{ color: "rgba(232,213,163,0.5)" }}>{p.levels} · {p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(201,168,76,0.2)" }}>
                <p className="font-body text-xs italic" style={{ color: "rgba(232,213,163,0.45)" }}>
                  "Every dollar your family earns should work two jobs — funding your life and compounding simultaneously."
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40 cursor-pointer" onClick={() => scrollTo("#villain")}>
          <ChevronDown size={28} style={{ color: "#c9a84c" }} className="animate-bounce" />
        </div>
      </section>

      {/* ── VILLAIN — THE TRADITIONAL BANKING TRAP ───────────────────── */}
      <section id="villain" className="py-24" style={{ backgroundColor: "#0f0f0f" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={20} style={{ color: "#dc2626" }} />
              <span className="font-body text-xs font-bold tracking-widest uppercase" style={{ color: "#dc2626" }}>
                The Villain
              </span>
            </div>
            <h2 className="font-display font-bold mb-6" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#f5f0e8" }}>
              The Traditional Banking Trap
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="space-y-5 font-body leading-relaxed" style={{ color: "rgba(232,213,163,0.7)" }}>
                <p className="text-lg">
                  Every dollar you pay in interest to a bank is <strong style={{ color: "#dc2626" }}>leakage</strong> — money that leaves your family's ecosystem forever and funds the bank's bonuses, buildings, and expansion.
                </p>
                <p>
                  The average American household pays <strong style={{ color: "#f5f0e8" }}>$300,000+ in interest</strong> over a lifetime. That's not bad luck. That's by design.
                </p>
                <p>
                  Banks hold over <strong style={{ color: "#f5f0e8" }}>$200 billion</strong> of the same financial product we teach in their own vaults — because it works. They sell you free checking. They buy something else.
                </p>
                <p style={{ color: "rgba(232,213,163,0.5)" }}>
                  The 7-Level Blueprint is the exit strategy.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Avg. lifetime interest paid", value: "$300K+", bad: true },
                  { label: "Bank-owned life insurance", value: "$200B+", bad: true },
                  { label: "Families with a wealth plan", value: "< 10%", bad: true },
                  { label: "Tax-free growth potential", value: "Unlimited", bad: false },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl p-5 text-center"
                    style={{ background: "rgba(201,168,76,0.05)", border: `1px solid ${stat.bad ? "rgba(220,38,38,0.3)" : "rgba(201,168,76,0.3)"}` }}>
                    <p className="font-display font-bold text-2xl mb-1" style={{ color: stat.bad ? "#dc2626" : "#c9a84c" }}>
                      {stat.value}
                    </p>
                    <p className="font-body text-xs" style={{ color: "rgba(232,213,163,0.5)" }}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 7 LEVELS QUEST MAP ───────────────────────────────────────── */}
      <section id="quest-map" className="py-24" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4 inline-block"
              style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#c9a84c" }}>
              The Quest Map
            </span>
            <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#f5f0e8" }}>
              7 Levels of Mastery
            </h2>
            <p className="font-body text-lg mb-12" style={{ color: "rgba(232,213,163,0.6)", maxWidth: "560px" }}>
              Not a services list. A blueprint. Each level builds on the last. Skip one and the whole structure weakens.
            </p>
          </Reveal>

          {/* Phase labels */}
          <div className="flex flex-wrap gap-3 mb-10">
            {["Foundation (1–3)", "Acceleration (4)", "Legacy (5–7)"].map((phase, i) => {
              const colors = ["#c9a84c", "#f59e0b", "#e8c97a"];
              return (
                <span key={phase} className="font-body text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full"
                  style={{ border: `1px solid ${colors[i]}60`, color: colors[i], background: `${colors[i]}10` }}>
                  {phase}
                </span>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {levels.map((level, i) => (
              <Reveal key={level.num} delay={i * 70}>
                <div
                  className={`rounded-xl p-6 h-full transition-all duration-300 hover:scale-[1.02] ${level.featured ? "ring-2" : ""}`}
                  style={{
                    background: level.featured ? "rgba(245,158,11,0.08)" : "rgba(201,168,76,0.04)",
                    border: `1px solid ${level.color}35`,
                    outline: level.featured ? `2px solid ${level.color}` : undefined,
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ background: `${level.color}15`, color: level.color }}>
                      {level.icon}
                    </div>
                    <span className="font-display font-bold text-3xl" style={{ color: `${level.color}30` }}>
                      {level.num}
                    </span>
                  </div>
                  <span className="font-body text-xs font-bold tracking-widest uppercase mb-2 inline-block"
                    style={{ color: phaseColors[level.phase] }}>
                    {level.phase}
                  </span>
                  <h3 className="font-display font-bold text-lg mb-1" style={{ color: "#f5f0e8" }}>
                    {level.title}
                  </h3>
                  <p className="font-body text-xs font-semibold mb-3" style={{ color: level.color }}>
                    {level.sub}
                  </p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(232,213,163,0.6)" }}>
                    {level.desc}
                  </p>
                  {level.featured && (
                    <div className="mt-4">
                      <Link href="/lifetime-loc"
                        className="inline-flex items-center gap-1.5 font-body text-xs font-bold"
                        style={{ color: "#f59e0b" }}>
                        Learn More <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPANSION PACKS / PRICING ─────────────────────────────────── */}
      <section id="expansion-packs" className="py-24" style={{ backgroundColor: "#0f0f0f" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <span className="font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4 inline-block"
              style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#c9a84c" }}>
              Pricing
            </span>
            <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#f5f0e8" }}>
              Choose Your Expansion Pack
            </h2>
            <p className="font-body text-lg mb-14" style={{ color: "rgba(232,213,163,0.6)", maxWidth: "520px" }}>
              Three tiers. One blueprint. Pick the level that matches where you are right now.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {packs.map((pack, i) => (
              <Reveal key={pack.tier} delay={i * 100}>
                <div
                  className={`rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:scale-[1.02] ${pack.featured ? "ring-2" : ""}`}
                  style={{
                    background: pack.featured ? "rgba(201,168,76,0.09)" : "rgba(201,168,76,0.04)",
                    border: `1px solid ${pack.color}40`,
                    outline: pack.featured ? `2px solid ${pack.color}` : undefined,
                  }}
                >
                  {pack.featured && (
                    <div className="text-center mb-4">
                      <span className="font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                        style={{ backgroundColor: "#c9a84c", color: "#0a0a0a" }}>
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="mb-6">
                    <p className="font-body text-xs font-bold tracking-widest uppercase mb-2" style={{ color: pack.color }}>
                      {pack.tier}
                    </p>
                    <h3 className="font-display font-bold text-xl mb-2" style={{ color: "#f5f0e8" }}>
                      {pack.name}
                    </h3>
                    <p className="font-body text-sm mb-4" style={{ color: "rgba(232,213,163,0.55)" }}>
                      {pack.tagline}
                    </p>
                    <p className="font-display font-bold" style={{ fontSize: "2.5rem", color: pack.color }}>
                      {pack.price}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pack.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 font-body text-sm" style={{ color: "rgba(232,213,163,0.75)" }}>
                        <span className="mt-0.5 shrink-0" style={{ color: pack.color }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://calendly.com/malikeast/15-minute-quick-meeting-phone-call-via-zoom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center font-body font-bold py-3.5 rounded-md transition-all duration-150 active:scale-95 inline-block"
                    style={{
                      backgroundColor: pack.featured ? pack.color : "transparent",
                      color: pack.featured ? "#0a0a0a" : pack.color,
                      border: pack.featured ? "none" : `1px solid ${pack.color}60`,
                    }}
                  >
                    {pack.cta}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUCCESS vs FAILURE STAKES ─────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display font-bold mb-4 text-center" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#f5f0e8" }}>
              Two Endings. You Choose.
            </h2>
            <p className="font-body text-lg mb-14 text-center" style={{ color: "rgba(232,213,163,0.55)" }}>
              Every financial decision is a fork in the road. Here's where each path leads.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* HIGH SCORE */}
            <Reveal>
              <div className="rounded-2xl p-8 h-full" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.3)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <Trophy size={28} style={{ color: "#c9a84c" }} />
                  <div>
                    <p className="font-body text-xs font-bold tracking-widest uppercase" style={{ color: "#c9a84c" }}>The High Score Ending</p>
                    <h3 className="font-display font-bold text-xl" style={{ color: "#f5f0e8" }}>The Multi-Generational Family Bank</h3>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Every dollar works two jobs — funding your life and compounding simultaneously",
                    "Business credit lines open without touching personal credit",
                    "Tax-free death benefit recapitalizes the family bank for the next generation",
                    "Your grandchildren start the game on Level 5 — not Level 1",
                    "Wealth that never resets to zero",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-sm" style={{ color: "rgba(232,213,163,0.75)" }}>
                      <span style={{ color: "#c9a84c" }} className="shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* GAME OVER */}
            <Reveal delay={100}>
              <div className="rounded-2xl p-8 h-full" style={{ background: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.25)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle size={28} style={{ color: "#dc2626" }} />
                  <div>
                    <p className="font-body text-xs font-bold tracking-widest uppercase" style={{ color: "#dc2626" }}>Game Over</p>
                    <h3 className="font-display font-bold text-xl" style={{ color: "#f5f0e8" }}>Broke at the Kitchen Table</h3>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "The Tax Boss takes 30–40% before your family sees a dollar",
                    "The Interest Villain collects $300K+ over your lifetime",
                    "No business credit — personal credit on the line for every move",
                    "No trust — assets go through probate, lawyers take their cut",
                    "Every generation starts back at Level 1",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-body text-sm" style={{ color: "rgba(232,213,163,0.6)" }}>
                      <span style={{ color: "#dc2626" }} className="shrink-0 mt-0.5">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── GUIDE — MALIK EAST ───────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#0f0f0f" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4 inline-block"
                style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#c9a84c" }}>
                Your Guide
              </span>
              <h2 className="font-display font-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#f5f0e8" }}>
                Malik East
              </h2>
              <p className="font-body text-sm font-bold tracking-widest uppercase mb-6" style={{ color: "#c9a84c" }}>
                Founder · 7Band Financial Agency · Licensed Life Insurance Agent
              </p>
              <div className="space-y-4 font-body leading-relaxed" style={{ color: "rgba(232,213,163,0.7)" }}>
                <p>
                  You are the hero of this story. Malik is the guide — the Yoda, not the Luke. His job is to hand you the tools, show you the map, and walk with you through every level.
                </p>
                <p>
                  He founded 7Band Financial Agency and 7Band Inc. in 2021 out of a genuine desire to teach. Coming from a musical past that inspired the company's name, he understands that every instrument — every financial tool — works in concert to create a complete financial symphony.
                </p>
                <p style={{ color: "rgba(232,213,163,0.5)" }}>
                  Every time a client levels up, it's music to his ears.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/about"
                  className="inline-flex items-center gap-2 font-body font-semibold px-6 py-3 rounded-md transition-all duration-150 active:scale-95"
                  style={{ border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c" }}>
                  Meet Malik <ArrowRight size={16} />
                </Link>
                <a
                  href="https://calendly.com/malikeast/15-minute-quick-meeting-phone-call-via-zoom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body font-bold px-6 py-3 rounded-md transition-all duration-150 active:scale-95"
                  style={{ backgroundColor: "#c9a84c", color: "#0a0a0a" }}>
                  Book Free Needs Analysis <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-2xl" style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.12) 0%, transparent 70%)" }} />
                <img
                  src="/manus-storage/malik-east-profile_b1731fac.webp"
                  alt="Malik East — Founder & Owner, 7Band Financial Agency"
                  className="w-full rounded-xl shadow-2xl object-cover"
                  style={{ aspectRatio: "4/5", maxHeight: "520px", objectPosition: "top" }}
                />
                <div className="absolute bottom-0 left-0 right-0 rounded-b-xl px-6 py-4"
                  style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(8px)" }}>
                  <p className="font-display font-bold text-lg" style={{ color: "#f5f0e8" }}>Malik East</p>
                  <p className="font-body text-xs font-bold tracking-widest uppercase mt-0.5" style={{ color: "#c9a84c" }}>
                    Founder & Owner · Licensed Life Insurance Agent
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FREE GUIDE LEAD-GEN ──────────────────────────────────────── */}
      <section id="free-guide" className="py-16" style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8"
              style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.25)" }}>
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c" }}>
                  <Download size={26} />
                </div>
                <div>
                  <p className="font-body text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#c9a84c" }}>
                    Free Download
                  </p>
                  <h3 className="font-display font-bold text-xl mb-1" style={{ color: "#f5f0e8" }}>
                    5 Ways You're Funding a Bank's Dream Instead of Your Own
                  </h3>
                  <p className="font-body text-sm" style={{ color: "rgba(232,213,163,0.55)" }}>
                    The free guide that started it all. No email required.
                  </p>
                </div>
              </div>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); }}
                className="shrink-0 font-body font-semibold px-7 py-3.5 rounded-md transition-all duration-150 active:scale-95 whitespace-nowrap"
                style={{ border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c" }}
              >
                Download Free Guide
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-28" style={{ backgroundColor: "#0f0f0f" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <span className="font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-6 inline-block"
              style={{ backgroundColor: "rgba(201,168,76,0.15)", color: "#c9a84c" }}>
              Start Your Quest
            </span>
            <h2 className="font-display font-bold mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f5f0e8" }}>
              Stop Funding Their Dreams.
              <br />
              <span style={{ color: "#c9a84c" }}>Start Funding Yours.</span>
            </h2>
            <p className="font-body text-lg leading-relaxed mb-10" style={{ color: "rgba(232,213,163,0.6)" }}>
              No obligation. No sales pressure. A 15-minute call where we look at your situation honestly and tell you exactly what level to start at.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/malikeast/15-minute-quick-meeting-phone-call-via-zoom"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body font-bold px-10 py-4 rounded-md transition-all duration-150 active:scale-95 text-base inline-flex items-center justify-center gap-2"
                style={{ backgroundColor: "#c9a84c", color: "#0a0a0a" }}
              >
                Choose Your Expansion Pack <ArrowRight size={18} />
              </a>
              <button
                onClick={() => scrollTo("#free-guide")}
                className="font-body font-semibold px-10 py-4 rounded-md transition-all duration-150 active:scale-95 text-base"
                style={{ border: "1px solid rgba(201,168,76,0.4)", color: "#c9a84c" }}
              >
                Download the Free Guide
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
