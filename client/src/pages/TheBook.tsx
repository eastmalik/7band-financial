import { useEffect, useState } from "react";
import { Link } from "wouter";
import { BookOpen, Check, ChevronRight, Mail, Play, ShieldAlert, X } from "lucide-react";
import NavItemLink from "@/components/NavItemLink";
import { BOOKING_URL, EVENT_URL } from "@/lib/links";
import {
  BOOK_AUTHOR,
  BOOK_CHAPTERS,
  BOOK_COVER,
  BOOK_DISCLOSURE,
  BOOK_GOOD_FIT,
  BOOK_NOTIFY_MAILTO,
  BOOK_PITCH,
  BOOK_POOR_FIT,
  BOOK_STATUS,
  BOOK_SUBTITLE,
  BOOK_TAGLINE,
  BOOK_TITLE,
} from "@/lib/book";

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm mb-6 font-tactical text-xs font-semibold tracking-[0.2em] uppercase bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
      {text}
    </div>
  );
}

function HudFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute top-0 left-0 w-4 h-4 pointer-events-none" style={{ borderTop: "2px solid rgba(201,168,76,0.7)", borderLeft: "2px solid rgba(201,168,76,0.7)" }} />
      <span className="absolute top-0 right-0 w-4 h-4 pointer-events-none" style={{ borderTop: "2px solid rgba(201,168,76,0.7)", borderRight: "2px solid rgba(201,168,76,0.7)" }} />
      <span className="absolute bottom-0 left-0 w-4 h-4 pointer-events-none" style={{ borderBottom: "2px solid rgba(201,168,76,0.7)", borderLeft: "2px solid rgba(201,168,76,0.7)" }} />
      <span className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none" style={{ borderBottom: "2px solid rgba(201,168,76,0.7)", borderRight: "2px solid rgba(201,168,76,0.7)" }} />
      {children}
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

  const navItems = [
    { label: "← Home", href: "/" },
    { label: "Lifetime LOC", href: "/lifetime-loc" },
    { label: "Game Map", href: "/game-map" },
    { label: "About", href: "/about" },
    { label: "Event", href: EVENT_URL, external: true },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#050400]/95 backdrop-blur-xl border-b border-[#c9a84c]/20" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-sm bg-[#c9a84c]/10 border border-[#c9a84c]/50 flex items-center justify-center">
              <img src="/manus-storage/7band-logo-clean_7b539e21.png" alt="7Band Financial" className="w-full h-full object-contain" />
            </div>
            <span className="font-tactical font-bold text-white tracking-wider text-sm uppercase hidden sm:block">
              7Band <span className="text-[#c9a84c]">Financial</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavItemLink key={item.href} href={item.href} external={item.external}
                className="font-tactical text-sm font-semibold tracking-wider text-[#c9a84c]/70 hover:text-[#c9a84c] uppercase transition-colors">
                {item.label}
              </NavItemLink>
            ))}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="font-tactical text-xs font-bold tracking-widest uppercase px-4 py-2 bg-[#c9a84c] text-black hover:bg-[#e8c97a] transition-colors gold-pulse">
              Begin Quest
            </a>
          </div>
          <button className="md:hidden text-[#c9a84c] p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#050400]/98 border-t border-[#c9a84c]/20 py-4 px-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <NavItemLink key={item.href} href={item.href} external={item.external} onClick={() => setMenuOpen(false)}
              className="font-tactical text-sm font-semibold tracking-wider text-[#c9a84c]/80 hover:text-[#c9a84c] uppercase">
              {item.label}
            </NavItemLink>
          ))}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
            className="font-tactical text-xs font-bold tracking-widest uppercase px-4 py-3 bg-[#c9a84c] text-black text-center">
            Begin Quest
          </a>
        </div>
      )}
    </nav>
  );
}

export default function TheBook() {
  return (
    <div className="min-h-screen bg-[#050400] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO — cover + title */}
      <section className="relative overflow-hidden circuit-bg pt-32 pb-20 sm:pt-40">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050400]/80 via-[#050400]/40 to-[#050400]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[620px] h-[620px] rounded-full bg-[#c9a84c]/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
            <div className="flex justify-center lg:justify-start">
              <HudFrame className="p-2 bg-[#0a0800]/70 max-w-xs w-full">
                <img
                  src={BOOK_COVER}
                  alt={`${BOOK_TITLE} — book cover`}
                  className="w-full object-contain"
                />
              </HudFrame>
            </div>

            <div className="text-center lg:text-left">
              <SectionLabel text="Coming Soon" />
              <h1 className="font-display text-4xl sm:text-6xl font-black text-white leading-[1.03] mb-5 gold-text-glow-intense">
                The American<br /><span className="text-[#c9a84c]">Money Tree</span>
              </h1>
              <p className="font-display text-xl sm:text-2xl font-bold text-[#c9a84c] leading-snug mb-5 gold-text-glow">
                {BOOK_TAGLINE}
              </p>
              <p className="font-tactical text-lg text-white/70 tracking-wide leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
                {BOOK_SUBTITLE}
              </p>
              <p className="font-tactical text-sm text-[#c9a84c]/80 tracking-widest uppercase font-bold mb-8">
                By {BOOK_AUTHOR} · {BOOK_STATUS}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href={BOOK_NOTIFY_MAILTO}
                  className="hud-cta hud-cta-primary inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a84c] text-black font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#e8c97a] transition-all gold-pulse">
                  <Mail size={15} /> Notify Me at Release
                </a>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
                  className="hud-cta inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#c9a84c] font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#c9a84c]/10 transition-all">
                  <Play size={13} fill="currentColor" /> Talk With Malik
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PREMISE */}
      <section className="relative py-24 bg-gradient-to-b from-[#050400] to-[#0a0800] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06)_0%,transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel text="Why This Book Exists" />
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-6 leading-tight">
            Written to be understood,<br /><span className="text-[#c9a84c]">not to sell you something.</span>
          </h2>
          <p className="font-tactical text-white/70 text-lg leading-relaxed tracking-wide">
            {BOOK_PITCH}
          </p>

          <HudFrame className="mt-12 p-8 bg-[#0a0800]/80 text-left">
            <p className="font-display text-xl sm:text-2xl font-bold text-[#c9a84c] leading-snug mb-4">
              “Some people in this industry give this product a nickname and never tell you what it actually is.”
            </p>
            <p className="font-tactical text-white/60 leading-relaxed tracking-wide">
              “You end up three chapters in, excited about something, and you still don't know what you're
              buying. We're not doing that.”
            </p>
            <p className="font-tactical text-xs text-[#c9a84c]/60 tracking-widest uppercase mt-5">
              — Opening page
            </p>
          </HudFrame>
        </div>
      </section>

      {/* CHAPTERS */}
      <section className="relative py-24 bg-[#050400] circuit-bg overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel text="Ten Chapters · Plus a Full Glossary" />
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4">
              What's Inside
            </h2>
            <p className="font-tactical text-white/60 text-lg max-w-2xl mx-auto tracking-wide">
              Structured like a real owner's manual — including the troubleshooting chapter
              most books in this category leave out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BOOK_CHAPTERS.map((c) => (
              <HudFrame key={c.n} className="p-5 bg-[#0a0800]/70">
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-sm border border-[#c9a84c]/40 bg-[#c9a84c]/5 flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-black text-[#c9a84c] text-xs">{c.n}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-tactical font-bold text-white text-sm tracking-wider uppercase">{c.title}</div>
                    <div className="font-tactical text-[12px] text-white/50 tracking-wide mt-1.5 leading-relaxed">{c.blurb}</div>
                  </div>
                </div>
              </HudFrame>
            ))}
          </div>
        </div>
      </section>

      {/* THE FIT TEST */}
      <section className="relative py-24 bg-gradient-to-b from-[#0a0800] to-[#050400] overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel text="Chapter 2 — Straight From the Book" />
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4">
              Including When the Answer Is No
            </h2>
            <p className="font-tactical text-white/60 text-lg max-w-2xl mx-auto tracking-wide">
              “Nobody puts a lawnmower engine in a sedan.” A real manual tells you what a
              product is for — and what it isn't.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HudFrame className="p-7 bg-[#0a0800]/80">
              <div className="flex items-center gap-2 mb-5">
                <Check size={18} className="text-[#c9a84c]" />
                <h3 className="font-tactical font-bold text-[#c9a84c] text-sm tracking-widest uppercase">Tends to fit when</h3>
              </div>
              <ul className="space-y-3">
                {BOOK_GOOD_FIT.map((t) => (
                  <li key={t} className="flex gap-3 font-tactical text-sm text-white/70 leading-relaxed tracking-wide">
                    <ChevronRight size={14} className="text-[#c9a84c]/60 flex-shrink-0 mt-1" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </HudFrame>

            <div className="relative p-7 bg-[#1a0505]/60 border border-red-500/25">
              <div className="flex items-center gap-2 mb-5">
                <X size={18} className="text-red-400" />
                <h3 className="font-tactical font-bold text-red-400 text-sm tracking-widest uppercase">Tends not to fit when</h3>
              </div>
              <ul className="space-y-3">
                {BOOK_POOR_FIT.map((t) => (
                  <li key={t} className="flex gap-3 font-tactical text-sm text-white/70 leading-relaxed tracking-wide">
                    <ChevronRight size={14} className="text-red-400/60 flex-shrink-0 mt-1" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE UNUSUAL CHAPTER */}
      <section className="relative py-24 bg-[#050400] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.07)_0%,transparent_70%)]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <SectionLabel text="Chapter 10" />
            <h2 className="font-display text-3xl sm:text-5xl font-black text-[#c9a84c] mb-4 gold-text-glow">
              How Your Agent Is Paid
            </h2>
          </div>
          <HudFrame className="p-8 bg-[#0a0800]/80">
            <p className="font-tactical text-white/70 text-lg leading-relaxed tracking-wide mb-5">
              “Most manuals don't have this chapter. This one does, because you cannot evaluate
              advice without knowing how the person giving it is compensated.”
            </p>
            <p className="font-tactical text-white/60 leading-relaxed tracking-wide">
              The book explains why a policy designed for cash accumulation typically pays the
              agent <em className="text-[#c9a84c] not-italic font-bold">less</em> than the alternative —
              and tells readers to ask any agent, including the author, that question directly.
            </p>
          </HudFrame>
        </div>
      </section>

      {/* AUTHOR */}
      <section className="relative py-24 bg-gradient-to-b from-[#050400] to-[#0a0800] circuit-bg overflow-hidden">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.6fr_1.4fr] gap-12 items-center">
            <div className="flex justify-center lg:justify-start">
              <HudFrame className="p-2 bg-[#0a0800]/80 max-w-[240px] w-full">
                <img
                  src="/manus-storage/malik-east-portrait_1eb03c6e.jpeg"
                  alt="Malik East"
                  className="aspect-[4/5] w-full object-cover"
                  style={{ objectPosition: "center 26%" }}
                />
              </HudFrame>
            </div>
            <div className="text-center lg:text-left">
              <SectionLabel text="The Author" />
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-4">Malik East</h2>
              <p className="font-tactical text-sm text-[#c9a84c] tracking-widest uppercase font-bold mb-6">
                TheFlow · Founder, 7Band Financial Agency · Licensed Life Insurance Agent
              </p>
              <p className="font-tactical text-white/65 leading-relaxed tracking-wide mb-4">
                Malik East founded 7Band Financial Agency on a simple standard: people deserve to
                understand the products and strategies that affect their family before anyone asks
                them to make a decision.
              </p>
              <p className="font-tactical text-white/65 leading-relaxed tracking-wide mb-8">
                His story started in 7th grade with a saxophone. Music taught him timing, rhythm,
                and harmony — the same principles that now shape how he explains financial
                decisions: understand the whole picture before you decide whether a policy
                belongs in it.
              </p>
              <Link href="/about"
                className="hud-cta inline-flex items-center gap-2 px-7 py-3.5 border border-[#c9a84c]/50 text-[#c9a84c] font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#c9a84c]/10 transition-all">
                Read the Full Profile <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NOTIFY */}
      <section className="relative py-24 bg-[#050400] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.1)_0%,transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <BookOpen size={32} className="text-[#c9a84c] mx-auto mb-6" />
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-5 gold-text-glow-intense">
            Be First to Read It
          </h2>
          <p className="font-tactical text-white/65 text-lg leading-relaxed tracking-wide mb-9">
            The manuscript is in final review. Leave your name and you'll hear the day it's
            released — no other mail, and nothing sold to you in the meantime.
          </p>
          <a href={BOOK_NOTIFY_MAILTO}
            className="hud-cta hud-cta-primary inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#c9a84c] text-black font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#e8c97a] transition-all gold-pulse">
            <Mail size={15} /> Notify Me at Release
          </a>
        </div>
      </section>

      {/* DISCLOSURE */}
      <section className="relative py-14 bg-[#0a0800] border-t border-[#c9a84c]/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 items-start">
            <ShieldAlert size={16} className="text-[#c9a84c]/60 flex-shrink-0 mt-1" />
            <div>
              <div className="font-tactical text-xs font-bold text-[#c9a84c]/70 tracking-widest uppercase mb-3">
                Important Disclosure
              </div>
              <p className="font-tactical text-[13px] text-white/45 leading-relaxed tracking-wide">
                {BOOK_DISCLOSURE}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
