import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Shield, Music, Users, Heart, ArrowRight, Star, Wifi, Building2, TreePine } from "lucide-react";

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
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#050400]/95 backdrop-blur-xl border-b border-[#c9a84c]/20" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-sm bg-[#c9a84c]/10 border border-[#c9a84c]/50 flex items-center justify-center group-hover:bg-[#c9a84c]/20 transition-colors">
              <img src="/manus-storage/7band-logo-clean_7b539e21.png" alt="7Band Financial" className="w-full h-full object-contain" />
            </div>
            <span className="font-tactical font-bold text-white tracking-wider text-sm uppercase hidden sm:block">
              7Band <span className="text-[#c9a84c]">Financial</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: "← Home", href: "/" },
              { label: "Lifetime LOC", href: "/lifetime-loc" },
              { label: "Game Map", href: "/game-map" },
              { label: "The Book", href: "/the-book" },
            ].map((item) => (
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
          <button className="md:hidden text-[#c9a84c] p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#050400]/98 border-t border-[#c9a84c]/20 py-4 px-4 flex flex-col gap-4">
            {[
              { label: "← Home", href: "/" },
              { label: "Lifetime LOC", href: "/lifetime-loc" },
              { label: "Game Map", href: "/game-map" },
              { label: "The Book", href: "/the-book" },
            ].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="font-tactical text-sm font-semibold tracking-wider text-[#c9a84c]/80 hover:text-[#c9a84c] uppercase">
                {item.label}
              </Link>
            ))}
            <a href="https://calendly.com/malikeast7band" target="_blank" rel="noopener noreferrer"
              className="font-tactical text-xs font-bold tracking-widest uppercase px-4 py-3 bg-[#c9a84c] text-black text-center">
              Begin Quest
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-[#050400] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden circuit-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050400]/80 via-[#050400]/40 to-[#050400]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#c9a84c]/5 blur-3xl" />
        </div>
        <div className="absolute top-20 left-0 right-0 flex justify-center">
          <div className="flex items-center gap-6 px-6 py-2 border-b border-[#c9a84c]/20">
            <span className="status-active flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse inline-block" />Guide Profile — Active
            </span>
            <span className="status-active flex items-center gap-1.5">
              <Wifi size={10} className="text-[#c9a84c]/60" />Secure Connection
            </span>
          </div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
          <SectionLabel text="Enter Your Guide" />
          <h1 className="font-display text-4xl sm:text-6xl font-black text-white leading-[1.05] mb-4 gold-text-glow-intense">
            Malik East
          </h1>
          <p className="font-tactical text-lg text-[#c9a84c] tracking-widest uppercase font-bold mb-6">
            TheFlow · Founder & Owner — 7Band Financial Agency
          </p>
          <p className="font-tactical text-white/60 text-lg max-w-2xl mx-auto tracking-wide">
            “Every time a client accomplishes one of their financial goals, it’s music to my ears.”
          </p>
        </div>
      </section>

      {/* PROFILE + PHOTO */}
      <section className="relative py-24 bg-[#050400] circuit-bg overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(201,168,76,0.04)_0%,transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Photo */}
            <div className="flex justify-center lg:justify-start">
              <HudFrame className="p-2 bg-[#0a0800]/80 max-w-sm w-full">
                <img
                  src="/manus-storage/malik-east-portrait_1eb03c6e.jpeg"
                  alt="Malik East — Founder, 7Band Financial Agency"
                  className="aspect-[4/5] w-full object-cover"
                  style={{ objectPosition: "center 26%" }}
                />
                <div className="p-4">
                  <div className="font-tactical text-xs text-[#c9a84c]/50 tracking-widest uppercase mb-1">Character Selection</div>
                  <div className="font-display text-lg font-bold text-white">Malik East</div>
                  <div className="font-tactical text-xs text-white/50 tracking-wide mt-1">TheFlow · Founder · Licensed Life Insurance Agent</div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse inline-block" />
                    <span className="font-tactical text-xs text-[#c9a84c] tracking-wider">Status: Active — Taking New Clients</span>
                  </div>
                </div>
              </HudFrame>
            </div>
            {/* Bio */}
            <div>
              <SectionLabel text="TheFlow — Origin Story" />
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                From the Band Room to<br />
                <span className="text-[#c9a84c]">Financial Orchestration.</span>
              </h2>
              <div className="space-y-4 font-tactical text-white/65 text-base leading-relaxed tracking-wide">
                <p>
                  Malik East, known as <span className="text-[#c9a84c] font-semibold">TheFlow</span>, is the founder of 7Band Financial Agency and a licensed life insurance agent since 2020. A 2019 Alcorn State University graduate with a B.S. in Computer Networking and Information Technology, he brings a systems-minded approach to financial education.
                </p>
                <p>
                  His journey began in a 7th-grade band room in 2007, where the saxophone taught him that progress requires timing, rhythm, and harmony. That idea became 7Band: a belief that credit, protection, business structure, and long-term planning should work together like instruments in one composition — not as disconnected moves.
                </p>
                <p>
                  Alongside his wife, Mickala, who manages client screenings, Malik helps families ask better questions and understand the next right step. His approach remains simple: the whole picture before the policy. If a strategy is not the right fit, that conversation should be honest about it.
                </p>
              </div>
              <blockquote className="mt-8 border-l-2 border-[#c9a84c] pl-6 py-2">
                <p className="font-display text-xl italic text-[#c9a84c]">
                  "Every time a client reaches a financial goal, it’s music to my ears."
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* STAT CARDS */}
      <section className="relative py-20 bg-gradient-to-b from-[#050400] to-[#080600] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel text="Character Stats" />
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white">
              What Malik Brings to the <span className="text-[#c9a84c]">Table.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Shield size={22} className="text-[#c9a84c]" />, title: "Licensed & Independent", body: "As an independent agent, Malik works with multiple carriers — not one company's product line. That means you get the policy that fits your situation, not the one that pays the highest commission." },
              { icon: <Music size={22} className="text-[#c9a84c]" />, title: "The 7Band Philosophy", body: "Seven bands. Seven levels. The same way a musical composition requires every instrument in its right place, the 7-Level Blueprint requires every financial tool deployed in the right sequence." },
              { icon: <Heart size={22} className="text-[#c9a84c]" />, title: "Relationship First", body: "Every client is a long-term relationship, not a transaction. Malik stays in the picture through policy reviews, life changes, and every level of the Blueprint — because the system only works if someone is managing it." },
              { icon: <Users size={22} className="text-[#c9a84c]" />, title: "Community Builder", body: "Beyond the agency, Malik runs The Real Ethical Agents community on Skool — a space for agents and clients alike to learn, share, and hold each other accountable to a higher standard." },
              { icon: <Building2 size={22} className="text-[#c9a84c]" />, title: "Full Ecosystem", body: "7Band Financial Agency sits inside a broader ecosystem: 7Band Inc. (non-profit), Arise Credit Pro (credit education), and The Flow community — all working toward the same mission." },
              { icon: <TreePine size={22} className="text-[#c9a84c]" />, title: "Generational Focus", body: "The goal is never just the policy. The goal is a Family Bank that outlasts you by 100 years. Every recommendation is made with that end state in mind." },
            ].map((card) => (
              <HudFrame key={card.title} className="p-6 bg-[#0a0800]/80 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  {card.icon}
                  <h3 className="font-display text-base font-bold text-white">{card.title}</h3>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-[#c9a84c]/30 to-transparent" />
                <p className="font-tactical text-sm text-white/60 leading-relaxed tracking-wide">{card.body}</p>
              </HudFrame>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-[#050400] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <SectionLabel text="Begin Your Quest" />
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#c9a84c] mb-4 gold-text-glow-intense">
            Ready to Work With Malik?
          </h2>
          <p className="font-tactical text-white/60 text-lg max-w-xl mx-auto tracking-wide mb-10">
            Schedule a free strategy session. No pressure, no obligation — just an honest conversation about where you are and what's possible from here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendly.com/malikeast7band" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#c9a84c] text-black font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#e8c97a] transition-all gold-pulse">
              <Star size={14} fill="currentColor" /> Schedule Free Strategy Session
            </a>
            <Link href="/"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#c9a84c] font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#c9a84c]/10 transition-all">
              View the Blueprint <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#030200] border-t border-[#c9a84c]/15 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-sm bg-[#c9a84c]/10 border border-[#c9a84c]/50 flex items-center justify-center">
              <span className="font-display font-black text-[#c9a84c] text-xs">7B</span>
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
