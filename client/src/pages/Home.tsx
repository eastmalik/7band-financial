import { Link } from "wouter";
import { useState, useEffect } from "react";
import {
  Shield, Zap, Lock, Users, ChevronRight,
  AlertTriangle, Star, Target, Building2, TreePine,
  ArrowRight, Play, CheckCircle, XCircle, DollarSign,
  Cpu
} from "lucide-react";

// ─── SECTION LABEL ───────────────────────────────────────────
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
      {/* Top-left corner */}
      <span className="absolute top-0 left-0 w-4 h-4 pointer-events-none" style={{
        borderTop: `2px solid ${borderColor}`, borderLeft: `2px solid ${borderColor}`
      }} />
      {/* Top-right corner */}
      <span className="absolute top-0 right-0 w-4 h-4 pointer-events-none" style={{
        borderTop: `2px solid ${borderColor}`, borderRight: `2px solid ${borderColor}`
      }} />
      {/* Bottom-left corner */}
      <span className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none" style={{
        borderBottom: `2px solid ${borderColor}`, borderLeft: `2px solid ${borderColor}`
      }} />
      {/* Bottom-right corner */}
      <span className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none" style={{
        borderBottom: `2px solid ${borderColor}`, borderRight: `2px solid ${borderColor}`
      }} />
      {children}
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = [
    { label: "Lifetime LOC", href: "/lifetime-loc", desc: "The core wealth engine" },
    { label: "Game Map", href: "/game-map", desc: "The 7-Level Generational Wealth Blueprint" },
    { label: "About", href: "/about", desc: "Meet your guide, TheFlow" },
    { label: "The Book", href: "/the-book", desc: "The Generational Wealth Blueprint" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050400]/95 backdrop-blur-xl border-b border-[#c9a84c]/20" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="player-brand-crest group-hover:brightness-125">
                <span className="font-display font-black text-[#c9a84c] text-base">7</span>
              </div>
              <span className="player-brand-wordmark font-tactical font-bold text-white tracking-wider text-sm uppercase hidden sm:block">
                7Band <span className="text-[#c9a84c]">Financial</span>
              </span>
            </Link>
            {/* Desktop nav */}
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
            {/* Mobile HUD hamburger button */}
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

      {/* ── FULL-SCREEN HUD MOBILE MENU ── */}
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
        {/* Top accent line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />

        {/* HUD header row */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#c9a84c]/15">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
            <div className="player-brand-crest">
              <span className="font-display font-black text-[#c9a84c] text-base">7</span>
            </div>
            <span className="player-brand-wordmark font-tactical font-bold text-white tracking-wider text-sm uppercase">
              7Band <span className="text-[#c9a84c]">Financial</span>
            </span>
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center border border-[#c9a84c]/40 bg-[#0a0800]/80 text-[#c9a84c] font-tactical text-xs tracking-widest"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Status bar */}
        <div className="px-6 py-3 flex items-center gap-3 border-b border-[#c9a84c]/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
          <span className="font-tactical text-[10px] text-[#c9a84c]/50 tracking-[0.2em] uppercase">Navigation System Active</span>
          <span className="ml-auto font-tactical text-[10px] text-[#c9a84c]/30 tracking-widest uppercase">7Band GWQ v4.5.4</span>
        </div>

        {/* Nav items */}
        <div className="flex-1 flex flex-col justify-center px-6 gap-1">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
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

        {/* Bottom CTA */}
        <div
          className="px-6 pb-10 pt-4"
          style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.4s cubic-bezier(0.23,1,0.32,1) 0.42s, transform 0.4s cubic-bezier(0.23,1,0.32,1) 0.42s",
          }}
        >
          <a
            href="https://calendly.com/malikeast7band"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="w-full py-4 bg-[#c9a84c] text-black font-tactical font-black text-sm tracking-widest uppercase text-center block gold-pulse"
          >
            ▶ BEGIN YOUR QUEST
          </a>
          <p className="font-tactical text-[10px] text-[#c9a84c]/30 tracking-widest uppercase text-center mt-3">
            Free strategy call · No obligation
          </p>
        </div>

        {/* Bottom accent line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />
      </div>
    </>
  );
}
// ─── MAIN HOME PAGE ──────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[#050400] text-white overflow-x-hidden">
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO: PLAYER PROFILE / QUEST OBJECTIVE
          ══════════════════════════════════════════════════════ */}
      <section className="player-hero-motion relative min-h-screen flex items-center justify-center overflow-hidden circuit-bg">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/manus-storage/7band-hero-bg-v2_c2aa05ef.jpg"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050400]/60 via-[#050400]/20 to-[#050400]" />
        </div>
        {/* Radial glow center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#c9a84c]/5 blur-3xl" />
        </div>
        <div aria-hidden="true" className="hero-energy-field" />
        <div aria-hidden="true" className="hero-energy-wave hero-energy-wave-one" />
        <div aria-hidden="true" className="hero-energy-wave hero-energy-wave-two" />
        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto translate-y-10 px-4 pt-48 pb-16 text-center sm:translate-y-8 sm:px-6 sm:pt-28">
          <h1 className="player-hero-title font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 gold-text-glow-intense">
            Stop Funding<br />
            <span className="text-[#c9a84c]">Their Dreams.</span><br />
            Start Funding Yours.
          </h1>
          <p className="player-hero-copy font-tactical text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-4 leading-relaxed tracking-wide">
            Every dollar you park in a bank account is a dollar working for their shareholders — not your family. The 7-Level Generational Wealth Blueprint is the strategy the wealthy use to reclaim that capital and build a legacy that compounds across lifetimes.
          </p>
          <div className="player-trust-cue mx-auto mb-2">
            <Shield size={13} strokeWidth={2.25} /> Licensed life insurance guidance · educational planning · no obligation
          </div>
          <div className="player-hero-actions mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendly.com/malikeast7band" target="_blank" rel="noopener noreferrer"
              className="hud-cta hud-cta-primary inline-flex items-center gap-2 px-8 py-4 bg-[#c9a84c] text-black font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#e8c97a] transition-all gold-pulse">
              <Play size={14} fill="currentColor" /> Begin Your Quest
            </a>
            <Link href="/lifetime-loc"
              className="hud-cta inline-flex items-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#c9a84c] font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#c9a84c]/10 transition-all">
              Unlock Lifetime LOC <ChevronRight size={14} />
            </Link>
          </div>
          {/* Stat bar */}
          <div className="player-hero-stats mt-16 grid grid-cols-2 gap-4 max-w-md mx-auto">
            {[
              { value: "7", label: "Levels of Mastery" },
              { value: "∞", label: "Generational Reach" },
            ].map((stat) => (
              <HudFrame key={stat.label} className="p-4 bg-[#0a0800]/80">
                <div className="font-display text-3xl font-black text-[#c9a84c] gold-text-glow">{stat.value}</div>
                <div className="font-tactical text-xs text-white/50 tracking-wider uppercase mt-1">{stat.label}</div>
              </HudFrame>
            ))}
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="flex flex-col items-center gap-2 opacity-50">
            <span className="status-active">Scroll to Continue</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#c9a84c]/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — BOSS FIGHT: THE BANKING TRAP VILLAIN
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-gradient-to-b from-[#050400] to-[#0f0202] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.06)_0%,transparent_70%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel text="Boss Fight — Identify the Enemy" danger />
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4 glitch-text">
              The Traditional Banking Trap
            </h2>
            <p className="font-tactical text-white/60 text-lg max-w-2xl mx-auto tracking-wide">
              You've been playing the game on their terms. Here's what that's actually costing you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <DollarSign size={24} className="text-red-400" />,
                title: "Your Money Is Static",
                body: "Sitting in a checking account earning 0.1% while the bank lends it out at 22% retail interest. You're their product.",
                status: "CRITICAL DRAIN",
              },
              {
                icon: <AlertTriangle size={24} className="text-red-400" />,
                title: "Interest Is Leaking",
                body: "Every car loan, credit card, and mortgage sends hundreds of thousands of dollars to institutions over your lifetime.",
                status: "COMPOUNDING LOSS",
              },
              {
                icon: <XCircle size={24} className="text-red-400" />,
                title: "Your Legacy Resets",
                body: "Estate taxes and probate ensure your children start their financial journey from Level 1, with zero capital, playing the exact same rigged game.",
                status: "LEGACY FAILURE",
              },
            ].map((item) => (
              <div key={item.title} className="danger-panel p-6 red-glow">
                <div className="flex items-center gap-3 mb-4">
                  {item.icon}
                  <span className="font-tactical text-xs text-red-400/70 tracking-widest uppercase">&gt; STATUS: {item.status}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="font-tactical text-white/60 text-sm leading-relaxed tracking-wide">{item.body}</p>
              </div>
            ))}
          </div>
          {/* Error log style */}
          <HudFrame danger className="p-6 bg-[#0f0202]/80 max-w-3xl mx-auto">
            <div className="font-tactical text-sm text-red-400/80 leading-loose tracking-wide">
              <div className="mb-2"><span className="text-red-500 font-bold">ERROR LOG:</span> If you do not change your strategy, the bank will continue to drain your momentum.</div>
              <div className="mb-2"><span className="text-red-500 font-bold">ERROR LOG:</span> You will pay hundreds of thousands in lifetime interest to institutions.</div>
              <div><span className="text-red-500 font-bold">ERROR LOG:</span> Your estate will be subjected to the friction of probate and taxation.</div>
            </div>
            <div className="mt-6 text-center font-tactical font-bold text-red-500 text-xl tracking-widest animate-pulse">
              [ CONTINUE? 9… 8… 7… ]
            </div>
          </HudFrame>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — ENTER YOUR GUIDE
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-[#050400] circuit-bg overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(201,168,76,0.04)_0%,transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — guide profile */}
            <div>
              <SectionLabel text="Enter Your Guide — Malik East // TheFlow" />
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                A Licensed Agent Who Turns<br />
                <span className="text-[#c9a84c]">Financial Noise Into Harmony.</span>
              </h2>
              <p className="font-tactical text-white/65 text-base leading-relaxed tracking-wide mb-6">
                Malik East, known as TheFlow, is the founder of 7Band Financial Agency and a licensed life insurance agent since 2020. With a Computer Networking and Information Technology background from Alcorn State University, he brings a systems-minded approach to helping families understand their next financial move.
              </p>
              <p className="font-tactical text-white/65 text-base leading-relaxed tracking-wide mb-8">
                TheFlow began in a 7th-grade band room, where music taught him the value of rhythm, timing, and harmony. 7Band carries that lesson forward: every financial tool should have a role in a system designed to serve the people who build it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#c9a84c]/50 text-[#c9a84c] font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#c9a84c]/10 transition-all">
                  View Full Profile <ArrowRight size={14} />
                </Link>
                <a href="https://calendly.com/malikeast7band" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-black font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#e8c97a] transition-all">
                  Schedule Session <ChevronRight size={14} />
                </a>
              </div>
            </div>
            {/* Right — guide stats panel */}
            <div className="space-y-4">
              {[
                { label: "Role", value: "Licensed Life Insurance Agent & Founder", icon: <Shield size={16} className="text-[#c9a84c]" /> },
                { label: "Agency", value: "7Band Financial Agency", icon: <Building2 size={16} className="text-[#c9a84c]" /> },
                { label: "Strategy", value: "Dynamic Banking — IUL + Credit + LLC + Trust", icon: <Cpu size={16} className="text-[#c9a84c]" /> },
                { label: "Mission", value: "Generational Wealth That Outlasts You by 100 Years", icon: <TreePine size={16} className="text-[#c9a84c]" /> },
                { label: "Ecosystem", value: "7Band Inc. · Arise Credit Pro · The Flow Community", icon: <Users size={16} className="text-[#c9a84c]" /> },
              ].map((row) => (
                <HudFrame key={row.label} className="p-4 bg-[#0a0800]/70">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{row.icon}</div>
                    <div>
                      <div className="font-tactical text-xs text-[#c9a84c]/50 tracking-widest uppercase mb-0.5">{row.label}</div>
                      <div className="font-tactical text-sm text-white/85 font-semibold tracking-wide">{row.value}</div>
                    </div>
                  </div>
                </HudFrame>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — DIAGNOSTIC MATRIX: NPC vs PLAYER 1
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-20 bg-gradient-to-b from-[#050400] to-[#080600] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.05)_0%,transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel text="Campaign Map — The 7 Levels of Mastery" />
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4">
            The <span className="text-[#c9a84c]">Generational Wealth</span> Blueprint
          </h2>
          <p className="font-tactical text-white/60 text-lg max-w-2xl mx-auto tracking-wide mb-10">
            A proven, sequential system. Three phases. Seven levels. Each one unlocks the next — from credit restoration to multi-generational banking.
          </p>
          {/* "Imagine someone sat you down" passage */}
          <div className="max-w-3xl mx-auto mb-12 text-left">
            <div className="relative border-l-2 border-[#c9a84c]/40 pl-6 py-2">
              <p className="font-tactical text-white/80 text-base sm:text-lg leading-relaxed tracking-wide mb-4">
                Imagine someone sat you down and gave you the game.
              </p>
              <p className="font-tactical text-white/55 text-sm sm:text-base leading-relaxed tracking-wide mb-3">
                Not a sales pitch. Not a seminar. The actual game — how credit really works and how to weaponize it. How to structure a business so it operates as a separate entity with its own financial identity. How to access capital from banks and institutions the way businesses do. Why life insurance is not about death — it is about building a tax-free vault that funds your life while you are still in it.
              </p>
              <p className="font-tactical text-white/55 text-sm sm:text-base leading-relaxed tracking-wide mb-3">
                How to separate yourself from your assets so no lawsuit, no creditor, no circumstance can reach what you built. And then — when all of it is in place — how to become the architect of your own financial future. Not dependent on an employer. Not subject to a bank's terms. Not leaving your family to start from zero.
              </p>
              <p className="font-display text-[#c9a84c] text-base sm:text-lg font-bold italic tracking-wide">
                Master of your fate. Captain of your soul. That is what this Blueprint is built to produce.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { phase: "Phase I", label: "Foundation", levels: "Levels 1–2", desc: "Credit + LLC", color: "border-[#c9a84c]/40" },
              { phase: "Phase II", label: "Acceleration", levels: "Levels 3–5", desc: "Capital + IUL + Trust", color: "border-[#c9a84c]/70" },
              { phase: "Phase III", label: "Legacy", levels: "Levels 6–7", desc: "Transfer + Family Bank", color: "border-[#c9a84c]" },
            ].map((p) => (
              <HudFrame key={p.phase} className={`p-5 bg-[#0a0800]/70 border-b-2 ${p.color}`}>
                <div className="font-tactical text-[10px] text-[#c9a84c]/50 tracking-widest uppercase mb-1">{p.phase} — {p.levels}</div>
                <div className="font-display text-xl font-bold text-white mb-1">{p.label}</div>
                <div className="font-tactical text-xs text-white/40 tracking-wide">{p.desc}</div>
              </HudFrame>
            ))}
          </div>
          <Link href="/game-map"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a84c] text-black font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#e8c97a] transition-all gold-pulse">
            View the Full Game Map <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — DIAGNOSTIC MATRIX: NPC vs PLAYER 1
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-[#060500] circuit-bg overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel text="Diagnostic Matrix" />
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4">
              NPC Strategy vs. <span className="text-[#c9a84c]">Player 1 Strategy</span>
            </h2>
            <p className="font-tactical text-white/60 text-base max-w-xl mx-auto tracking-wide">
              Two people. Same income. Completely different outcomes. The only difference is the system they're running.
            </p>
          </div>
          {/* Column headers */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="font-tactical text-xs text-[#c9a84c]/40 tracking-widest uppercase text-center py-2">Category</div>
            <div className="py-3 px-4 text-center border border-white/10 bg-white/5">
              <div className="font-tactical text-xs text-white/40 tracking-widest uppercase">Traditional Banking</div>
              <div className="font-display text-sm font-bold text-white/60 mt-1">NPC Mode</div>
            </div>
            <div className="py-3 px-4 text-center border border-[#c9a84c]/50 bg-[#c9a84c]/10 gold-glow">
              <div className="font-tactical text-xs text-[#c9a84c]/70 tracking-widest uppercase">Dynamic Banking</div>
              <div className="font-display text-sm font-bold text-[#c9a84c] mt-1">Player 1 Mode</div>
            </div>
          </div>
          {/* Matrix rows */}
          {[
            {
              category: "Money State",
              npc: "Static. Sitting in checking accounts earning 0.1%.",
              player: "Fluid. Money is constantly in motion, doing two jobs at once.",
            },
            {
              category: "Interest",
              npc: "Leaking. You pay 22% retail interest to the bank.",
              player: "Recaptured. You become the bank, keeping interest within your own policy.",
            },
            {
              category: "Estate / Legacy",
              npc: "Vulnerable. Wealth resets upon death due to estate taxes and probate.",
              player: "Fortress. Wealth passes tax-free, recapitalizing the family bank.",
            },
            {
              category: "Capital Access",
              npc: "Dependent. You must qualify, wait, and pay interest to a third party.",
              player: "Sovereign. You borrow from yourself with no credit check, no approval required.",
            },
          ].map((row) => (
            <div key={row.category} className="grid grid-cols-3 gap-4 mb-3">
              <div className="flex items-center px-3 py-4 border-l-2 border-[#c9a84c]/30">
                <span className="font-tactical text-xs font-bold text-[#c9a84c] tracking-wider uppercase">{row.category}</span>
              </div>
              <div className="px-4 py-4 bg-[#0f0202]/60 border border-red-900/30">
                <p className="font-tactical text-sm text-white/50 leading-relaxed">{row.npc}</p>
              </div>
              <div className="px-4 py-4 bg-[#0a0800]/80 border border-[#c9a84c]/30">
                <p className="font-tactical text-sm text-white/80 leading-relaxed font-semibold">{row.player}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — SYSTEM WARNING: COST OF INACTION
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-20 bg-gradient-to-b from-[#050400] to-[#0f0202] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.08)_0%,transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel text="System Warning — Cost of Inaction" danger />
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-10 glitch-text">
            What Happens If You Don't Change the Strategy?
          </h2>
          <div className="space-y-4 text-left mb-12">
            {[
              { status: "CRITICAL DRAIN", msg: "If you do not change your strategy, the bank will continue to drain your momentum." },
              { status: "COMPOUNDING LOSS", msg: "You will pay hundreds of thousands of dollars in lifetime interest to institutions." },
              { status: "ASSET CORRUPTION", msg: "Your estate will be subjected to the friction of probate and taxation." },
              { status: "LEGACY FAILURE", msg: "Your children will be forced to start their financial journey from Level 1, with zero capital, playing the exact same rigged game." },
            ].map((item) => (
              <div key={item.status} className="danger-panel p-5 flex items-start gap-4">
                <AlertTriangle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-tactical text-xs text-red-400 font-bold tracking-widest uppercase">&gt; STATUS: {item.status} — </span>
                  <span className="font-tactical text-sm text-white/70 tracking-wide">{item.msg}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="font-tactical font-bold text-red-500 text-2xl tracking-widest animate-pulse mb-8">
            [ CONTINUE? 9… 8… 7… ]
          </div>
          <a href="https://calendly.com/malikeast7band" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#c9a84c] text-black font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#e8c97a] transition-all gold-pulse">
            <Play size={14} fill="currentColor" /> Yes — Begin My Quest
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — ULTIMATE VICTORY: HIGH SCORE ACHIEVED
          ══════════════════════════════════════════════════════ */}
      <section className="relative py-24 bg-[#050400] overflow-hidden">
        <div className="absolute inset-0">
          <img src="/manus-storage/7band-victory-tree_5ae0c46c.jpg" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050400] via-[#050400]/70 to-[#050400]/80" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.12)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel text="Ultimate Victory — High Score Achieved" />
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#c9a84c] mb-4 gold-text-glow-intense">
            This Is What Winning Looks Like.
          </h2>
          <p className="font-tactical text-white/60 text-lg max-w-2xl mx-auto tracking-wide mb-14">
            When you complete the 7-Level Blueprint, here is your final state.
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

      {/* ══════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════ */}
      <footer className="bg-[#030200] border-t border-[#c9a84c]/15 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-sm bg-[#c9a84c]/10 border border-[#c9a84c]/50 flex items-center justify-center">
                  <img src="/manus-storage/7band-logo-clean_7b539e21.png" alt="7Band Financial" className="w-full h-full object-contain" />
                </div>
                <span className="font-tactical font-bold text-white tracking-wider text-sm uppercase">
                  7Band <span className="text-[#c9a84c]">Financial</span>
                </span>
              </div>
              <p className="font-tactical text-white/40 text-xs leading-relaxed tracking-wide mb-4">
                Stop Funding Their Dreams.<br />Start Funding Yours.
              </p>
            </div>
            {/* Services */}
            <div>
              <div className="font-tactical text-xs text-[#c9a84c]/50 tracking-widest uppercase mb-4">Our Services</div>
              <ul className="space-y-2">
                {["Lifetime LOC", "Credit Restoration", "LLC Structuring", "IUL Blueprint", "Trust & Estate", "Family Banking"].map((s) => (
                  <li key={s}><span className="font-tactical text-xs text-white/50 hover:text-[#c9a84c] transition-colors tracking-wide cursor-pointer">{s}</span></li>
                ))}
              </ul>
            </div>
            {/* Ecosystem */}
            <div>
              <div className="font-tactical text-xs text-[#c9a84c]/50 tracking-widest uppercase mb-4">Our Ecosystem</div>
              <ul className="space-y-2">
                {[
                  { label: "7Band Inc. (Non-Profit)", href: "https://www.7bandinc.org" },
                  { label: "Arise Credit Pro", href: "https://www.arisecreditpro.com" },
                  { label: "The Flow — Skool", href: "https://www.skool.com/the-real-ethical-agents-4233" },
                  { label: "YouTube Channel", href: "https://www.youtube.com/@Malik_East" },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      className="font-tactical text-xs text-white/50 hover:text-[#c9a84c] transition-colors tracking-wide">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div>
              <div className="font-tactical text-xs text-[#c9a84c]/50 tracking-widest uppercase mb-4">Contact</div>
              <ul className="space-y-3">
                <li>
                  <div className="font-tactical text-xs text-white/30 tracking-wider uppercase mb-1">Email</div>
                  <a href="mailto:info@7bandfinancial.com" className="font-tactical text-xs text-white/60 hover:text-[#c9a84c] transition-colors">info@7bandfinancial.com</a>
                </li>
                <li>
                  <div className="font-tactical text-xs text-white/30 tracking-wider uppercase mb-1">Schedule</div>
                  <a href="https://calendly.com/malikeast7band" target="_blank" rel="noopener noreferrer"
                    className="font-tactical text-xs text-[#c9a84c] hover:text-[#e8c97a] transition-colors">
                    Book a Free Strategy Call →
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#c9a84c]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-tactical text-xs text-white/25 tracking-wide">
              © {new Date().getFullYear()} 7Band Financial Agency. All rights reserved.
            </p>
            <p className="font-tactical text-xs text-white/20 tracking-wide text-center max-w-lg">
              Life insurance products are subject to underwriting. Results vary. This is not financial, legal, or tax advice. Consult a licensed professional for your specific situation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
