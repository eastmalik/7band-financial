import { Link } from "wouter";
import { useState, useEffect } from "react";
import { ChevronRight, ArrowLeft, CheckCircle, AlertTriangle, Zap, TrendingUp, RefreshCw, DollarSign, Shield, BookOpen } from "lucide-react";

function SectionLabel({ text, danger = false }: { text: string; danger?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-sm mb-6 font-tactical text-xs font-semibold tracking-[0.2em] uppercase ${
      danger ? "bg-red-950/60 border border-red-600/40 text-red-400" : "bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c]"
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

function LessonNavbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#050400]/95 backdrop-blur-xl border-b border-[#c9a84c]/20" : "bg-transparent"}`}>
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
          <div className="flex items-center gap-4">
            <Link href="/lifetime-loc" className="font-tactical text-sm font-semibold tracking-wider text-[#c9a84c]/70 hover:text-[#c9a84c] uppercase transition-colors hidden md:block">
              ← The Manual
            </Link>
            <a href="https://calendly.com/malikeast7band" target="_blank" rel="noopener noreferrer"
              className="font-tactical text-xs font-bold tracking-widest uppercase px-4 py-2 bg-[#c9a84c] text-black hover:bg-[#e8c97a] transition-colors">
              Begin Quest
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function LessonFooter({ prev, next }: { prev?: { href: string; label: string }; next?: { href: string; label: string } }) {
  return (
    <footer className="bg-[#050400] border-t border-[#c9a84c]/20 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {prev ? (
          <Link href={prev.href} className="flex items-center gap-2 font-tactical text-sm text-[#c9a84c]/60 hover:text-[#c9a84c] uppercase tracking-wider transition-colors">
            <ArrowLeft size={14} /> {prev.label}
          </Link>
        ) : <div />}
        <Link href="/lifetime-loc" className="font-tactical text-xs text-white/30 hover:text-white/60 uppercase tracking-widest transition-colors">
          Back to The Manual
        </Link>
        {next ? (
          <Link href={next.href} className="flex items-center gap-2 font-tactical text-sm text-[#c9a84c]/60 hover:text-[#c9a84c] uppercase tracking-wider transition-colors">
            {next.label} <ChevronRight size={14} />
          </Link>
        ) : (
          <a href="https://calendly.com/malikeast7band" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 font-tactical text-sm text-[#c9a84c] hover:text-[#e8c97a] uppercase tracking-wider transition-colors font-bold">
            Begin Your Quest <ChevronRight size={14} />
          </a>
        )}
      </div>
      <p className="text-center font-tactical text-xs text-white/20 tracking-wide mt-8 px-4">
        © {new Date().getFullYear()} 7Band Financial Agency · Licensed Life Insurance Agent · Educational content only. Not financial advice.
      </p>
    </footer>
  );
}

export default function Lesson3() {
  return (
    <div className="min-h-screen bg-[#050400] text-white overflow-x-hidden">
      <LessonNavbar />
      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden circuit-bg pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050400]/60 via-[#050400]/30 to-[#050400]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-[#c9a84c]/5 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20">
          <SectionLabel text="The Manual · Level 4 · Lesson 3 of 4" />
          <h1 className="font-display text-4xl sm:text-6xl font-black text-white leading-tight mb-6 gold-text-glow-intense">
            Using<br /><span className="text-[#c9a84c]">The Line</span>
          </h1>
          <p className="font-tactical text-lg text-white/65 max-w-2xl mx-auto leading-relaxed tracking-wide">
            Two doors. One rule. The Honest Banker principle is the mechanic that separates players who build wealth from players who drain it.
          </p>
        </div>
      </section>

      {/* CORE CONCEPT */}
      <section className="relative py-20 bg-[#050400]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="The Two Doors" />
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-8 leading-tight">
            When You Need Capital,<br />
            <span className="text-[#c9a84c]">You Have Two Choices.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <HudFrame className="p-6 bg-[#0a0800]/80">
              <div className="font-tactical text-xs text-[#c9a84c] tracking-widest uppercase mb-3 font-bold">Door 1 — Policy Loan</div>
              <div className="font-display text-lg font-bold text-white mb-4">Borrow From Your IUL</div>
              <ul className="space-y-3 mb-4">
                {[
                  "No credit check required.",
                  "No approval process.",
                  "No mandatory repayment schedule.",
                  "Your cash value keeps compounding.",
                  "Interest rate is typically 5–8%.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={13} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                    <span className="font-tactical text-sm text-white/70 tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-tactical text-xs text-white/40 tracking-wide leading-relaxed">Best for: Deals that need to move fast. No time for bank approval. Capital needed within days.</p>
            </HudFrame>
            <HudFrame className="p-6 bg-[#0a0800]/80">
              <div className="font-tactical text-xs text-[#c9a84c] tracking-widest uppercase mb-3 font-bold">Door 2 — Outside Line of Credit</div>
              <div className="font-display text-lg font-bold text-white mb-4">Borrow From a Bank or Lender</div>
              <ul className="space-y-3 mb-4">
                {[
                  "Requires credit approval.",
                  "Formal application and underwriting.",
                  "Mandatory repayment schedule.",
                  "Your IUL cash value is untouched.",
                  "Interest rate varies — often lower for business lines.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle size={13} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                    <span className="font-tactical text-sm text-white/70 tracking-wide">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-tactical text-xs text-white/40 tracking-wide leading-relaxed">Best for: Lower-rate financing when time allows. Use the IUL as your emergency backstop.</p>
            </HudFrame>
          </div>

          <HudFrame className="p-8 bg-[#0a0800]/80 mb-12">
            <SectionLabel text="The Honest Banker Rule" />
            <h3 className="font-display text-2xl font-bold text-white mb-4">Pay Yourself Back — With Interest.</h3>
            <p className="font-tactical text-white/65 leading-relaxed tracking-wide mb-4">
              The most powerful mechanic in the entire system is also the most overlooked: <span className="text-[#c9a84c] font-semibold">repaying your policy loan with interest</span>. This is called the Honest Banker Rule.
            </p>
            <p className="font-tactical text-white/65 leading-relaxed tracking-wide mb-4">
              When you borrow from a bank, the interest you pay leaves your financial ecosystem permanently. It goes to the bank's shareholders. When you borrow from your IUL and repay with interest, that interest goes back into your cash value — <span className="text-[#c9a84c] font-semibold">recapitalizing your own pool</span>.
            </p>
            <p className="font-tactical text-white/65 leading-relaxed tracking-wide">
              Over time, this creates a compounding effect where every deal you finance makes your pool larger, not smaller. This is the mechanic that allows the Family Bank to grow across generations instead of depleting.
            </p>
          </HudFrame>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: <Zap size={22} className="text-[#c9a84c]" />, title: "Speed", body: "Policy loans arrive in days. No waiting for bank approval when a deal requires immediate action." },
              { icon: <RefreshCw size={22} className="text-[#c9a84c]" />, title: "Recapture", body: "Every dollar of interest you pay on a policy loan goes back into your cash value — not to a third party." },
              { icon: <TrendingUp size={22} className="text-[#c9a84c]" />, title: "Compounding Pool", body: "Each repayment cycle makes the pool larger. The Family Bank grows with every transaction." },
            ].map((card) => (
              <HudFrame key={card.title} className="p-5 bg-[#0a0800]/70 text-center">
                <div className="flex justify-center mb-3">{card.icon}</div>
                <div className="font-display text-base font-bold text-white mb-2">{card.title}</div>
                <p className="font-tactical text-xs text-white/60 tracking-wide leading-relaxed">{card.body}</p>
              </HudFrame>
            ))}
          </div>

          <HudFrame className="p-8 bg-[#c9a84c]/5 border border-[#c9a84c]/30">
            <div className="font-tactical text-xs text-[#c9a84c] tracking-widest uppercase mb-3 font-bold">The Takeaway</div>
            <p className="font-display text-xl font-bold text-white mb-3">
              "The discipline to repay yourself is what separates a player who builds a Family Bank from one who just has an insurance policy."
            </p>
            <p className="font-tactical text-white/60 tracking-wide text-sm leading-relaxed">
              The Lifetime LOC is a tool. The Honest Banker Rule is the discipline that makes the tool compound. Without it, you have a line of credit. With it, you have a generational wealth engine.
            </p>
          </HudFrame>
        </div>
      </section>

      <LessonFooter
        prev={{ href: "/lesson-2", label: "Lesson 2: Design Decides Everything" }}
        next={{ href: "/lesson-4", label: "Lesson 4: Honest Answers" }}
      />
    </div>
  );
}
