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
            <a href="https://api.leadconnectorhq.com/widget/booking/kclfxyrhhmxucq9DWuZq" target="_blank" rel="noopener noreferrer"
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
          <a href="https://api.leadconnectorhq.com/widget/booking/kclfxyrhhmxucq9DWuZq" target="_blank" rel="noopener noreferrer"
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

export default function Lesson4() {
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
          <SectionLabel text="The Manual · Level 4 · Lesson 4 of 4" />
          <h1 className="font-display text-4xl sm:text-6xl font-black text-white leading-tight mb-6 gold-text-glow-intense">
            Honest<br /><span className="text-[#c9a84c]">Answers</span>
          </h1>
          <p className="font-tactical text-lg text-white/65 max-w-2xl mx-auto leading-relaxed tracking-wide">
            Every objection you have heard about IUL is addressed here — directly, without spin. The Fair Kernel method: acknowledge the truth in every objection, then explain what the objection misses.
          </p>
        </div>
      </section>

      {/* OBJECTIONS */}
      <section className="relative py-20 bg-[#050400]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionLabel text="The Objections — Answered Honestly" />
          <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-12 leading-tight">
            We Don't Dodge the Hard Questions.<br />
            <span className="text-[#c9a84c]">We Answer Them.</span>
          </h2>

          <div className="space-y-6 mb-12">
            {[
              {
                objection: "Term insurance is cheaper. Why not just buy term and invest the difference?",
                fairKernel: "Term is absolutely cheaper for pure death benefit. If all you need is income replacement for 20 years, term wins on price every time.",
                whatItMisses: "Term fails the discipline test. Most people who buy term and invest the difference never actually invest the difference. The IUL forces the savings behavior. Additionally, term expires — leaving your family with nothing at the exact moment they need the generational transfer. The IUL's death benefit recapitalizes the Family Bank at Level 7.",
              },
              {
                objection: "IUL fees are too high. The internal charges eat into returns.",
                fairKernel: "An off-the-shelf IUL does have significant internal charges that reduce net returns. This is a legitimate concern for poorly designed policies.",
                whatItMisses: "A high-cash-value design (Lesson 2) minimizes cost-of-insurance charges by reducing the death benefit to the IRS minimum. The net return on a properly designed policy, combined with the tax-free loan access and uninterrupted compounding mechanic, consistently outperforms taxable alternatives when measured on an after-tax, after-cost basis.",
              },
              {
                objection: "I can get better returns in the stock market.",
                fairKernel: "In a strong bull market, a direct S&P 500 index fund will outperform the credited rate of an IUL. The cap on gains is real.",
                whatItMisses: "The comparison ignores three variables: (1) the 0% floor means you never lose principal in a crash — a 40% market drop requires a 67% gain just to break even; (2) the tax-free loan access means you never pay capital gains tax to access your money; (3) the uninterrupted compounding mechanic means your money earns returns while simultaneously deployed in other assets. No brokerage account can do that.",
              },
              {
                objection: "This sounds too complicated. I don't understand it.",
                fairKernel: "The mechanics of an IUL are genuinely more complex than a savings account or a term policy. That complexity is real.",
                whatItMisses: "The complexity is a one-time education cost. Once you understand the four lessons in this manual, the mechanics are straightforward. The wealthy have used this tool for over 100 years precisely because most people never take the time to learn it. That asymmetry of knowledge is the advantage.",
              },
              {
                objection: "What if I can't afford the premiums?",
                fairKernel: "An IUL requires consistent premium payments to build cash value. If your budget is too tight to fund it properly, it is not the right time.",
                whatItMisses: "This is why the 7-Level Blueprint starts at Level 1 (credit restoration) and Level 3 (capital access) before Level 4. The sequence is designed to ensure you have the financial foundation and access to capital before you fund the engine. We do not sell you Level 4 until you are ready for it.",
              },
            ].map((item, i) => (
              <HudFrame key={i} className="p-6 bg-[#0a0800]/80">
                <div className="flex items-start gap-3 mb-4">
                  <AlertTriangle size={16} className="text-[#c9a84c] mt-0.5 flex-shrink-0" />
                  <div className="font-display text-base font-bold text-white">"{item.objection}"</div>
                </div>
                <div className="pl-7 space-y-3">
                  <div>
                    <div className="font-tactical text-xs text-[#c9a84c]/60 tracking-widest uppercase mb-1 font-bold">The Fair Kernel — What's True</div>
                    <p className="font-tactical text-sm text-white/60 tracking-wide leading-relaxed">{item.fairKernel}</p>
                  </div>
                  <div>
                    <div className="font-tactical text-xs text-[#c9a84c] tracking-widest uppercase mb-1 font-bold">What the Objection Misses</div>
                    <p className="font-tactical text-sm text-white/75 tracking-wide leading-relaxed">{item.whatItMisses}</p>
                  </div>
                </div>
              </HudFrame>
            ))}
          </div>

          <HudFrame className="p-8 bg-[#c9a84c]/5 border border-[#c9a84c]/30 mb-12">
            <div className="font-tactical text-xs text-[#c9a84c] tracking-widest uppercase mb-3 font-bold">The Bottom Line</div>
            <p className="font-display text-xl font-bold text-white mb-3">
              "We will never recommend a product that doesn't solve a real problem. If IUL is not right for you, we will tell you."
            </p>
            <p className="font-tactical text-white/60 tracking-wide text-sm leading-relaxed">
              7Band Financial Agency operates on one principle: the whole picture before the policy. If your situation calls for term insurance, a ROTH IRA, or a different vehicle entirely, that is what we will tell you. Our reputation is built on honest advice — not commissions.
            </p>
          </HudFrame>

          <div className="text-center">
            <div className="font-tactical text-xs text-[#c9a84c] tracking-widest uppercase mb-4 font-bold">You've Completed The Manual</div>
            <h3 className="font-display text-2xl font-bold text-white mb-6">Ready to Build Your Lifetime LOC?</h3>
            <a href="https://api.leadconnectorhq.com/widget/booking/kclfxyrhhmxucq9DWuZq" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a84c] text-black font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#e8c97a] transition-all gold-pulse">
              <BookOpen size={14} /> Schedule Your Strategy Session
            </a>
          </div>
        </div>
      </section>

      <LessonFooter
        prev={{ href: "/lesson-3", label: "Lesson 3: Using the Line" }}
      />
    </div>
  );
}
