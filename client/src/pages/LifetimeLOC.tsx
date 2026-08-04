import { Link } from "wouter";
import { useState, useEffect } from "react";
import {
  Zap, TrendingUp, Lock, ChevronRight, ArrowRight,
  Play, CheckCircle, DollarSign, RefreshCw, Shield,
  Building2, TreePine, ArrowDown, Wifi, Star
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
              <span className="font-display font-black text-[#c9a84c] text-sm">7B</span>
            </div>
            <span className="font-tactical font-bold text-white tracking-wider text-sm uppercase hidden sm:block">
              7Band <span className="text-[#c9a84c]">Financial</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: "← Home", href: "/" },
              { label: "Pricing", href: "/pricing" },
              { label: "About", href: "/about" },
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
              { label: "Pricing", href: "/pricing" },
              { label: "About", href: "/about" },
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

export default function LifetimeLOC() {
  return (
    <div className="min-h-screen bg-[#050400] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden circuit-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050400]/80 via-[#050400]/40 to-[#050400]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full bg-[#c9a84c]/5 blur-3xl" />
        </div>
        <div className="absolute top-20 left-0 right-0 flex justify-center">
          <div className="flex items-center gap-6 px-6 py-2 border-b border-[#c9a84c]/20">
            <span className="status-active flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse inline-block" />Level 4 Unlocked
            </span>
            <span className="status-active flex items-center gap-1.5">
              <Wifi size={10} className="text-[#c9a84c]/60" />IUL Engine — Online
            </span>
          </div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
          <SectionLabel text="7Band Financial Agency — Flagship Product" />
          <p className="font-tactical text-sm text-[#c9a84c] tracking-widest uppercase mb-4 font-bold">Your Freedom Starts Now</p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 gold-text-glow-intense">
            The Lifetime<br />
            <span className="text-[#c9a84c]">Line of Credit</span>
          </h1>
          <p className="font-tactical text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-4 leading-relaxed tracking-wide">
            A permanent, tax-advantaged line of credit built inside a life insurance policy — guaranteed to grow, guaranteed to be there, and guaranteed to pass to the next generation. This is Level 4 of the 7-Level Generational Wealth Blueprint.
          </p>
          <p className="font-tactical text-sm text-[#c9a84c]/60 tracking-widest uppercase mb-10">
            The tool wealthy families have used for over 100 years. Now available to yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://calendly.com/malikeast7band" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#c9a84c] text-black font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#e8c97a] transition-all gold-pulse">
              <Play size={14} fill="currentColor" /> Build My Lifetime LOC
            </a>
            <Link href="/"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#c9a84c] font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#c9a84c]/10 transition-all">
              Back to Campaign Map
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <div className="flex flex-col items-center gap-2 opacity-50">
            <span className="status-active">Scroll to Learn the Mechanics</span>
            <div className="w-px h-8 bg-gradient-to-b from-[#c9a84c]/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="relative py-24 bg-[#050400] circuit-bg overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_right,rgba(201,168,76,0.04)_0%,transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel text="What Is It — Plain Language" />
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-6 leading-tight">
                A Policy That Doubles as<br />
                <span className="text-[#c9a84c]">Your Private Bank.</span>
              </h2>
              <p className="font-tactical text-white/65 text-base leading-relaxed tracking-wide mb-5">
                An Indexed Universal Life (IUL) policy is a permanent life insurance contract with a cash value component that grows based on a stock market index — but with a floor of zero, meaning you never lose principal to a market crash.
              </p>
              <p className="font-tactical text-white/65 text-base leading-relaxed tracking-wide mb-5">
                The Lifetime LOC is the borrowing mechanic built into that policy. Once your cash value reaches a threshold, you can borrow against it — with no credit check, no approval process, and no mandatory repayment schedule. Your baseline capital keeps compounding as if the loan never happened.
              </p>
              <p className="font-tactical text-white/65 text-base leading-relaxed tracking-wide">
                Banks hold billions in these policies. Wealthy families have used this mechanic for over a century to finance businesses, real estate, and education — while keeping their capital working simultaneously.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: <TrendingUp size={18} className="text-[#c9a84c]" />, label: "Growth", value: "Indexed to the S&P 500 with a 0% floor — you participate in market gains, never market losses." },
                { icon: <Lock size={18} className="text-[#c9a84c]" />, label: "Protection", value: "Guaranteed death benefit passes to your beneficiaries income-tax-free, bypassing probate entirely." },
                { icon: <DollarSign size={18} className="text-[#c9a84c]" />, label: "Access", value: "Borrow against your cash value with no credit check, no approval, and no mandatory repayment." },
                { icon: <RefreshCw size={18} className="text-[#c9a84c]" />, label: "Recapture", value: "When you repay the loan, the interest goes back into your policy — not to a bank." },
                { icon: <TreePine size={18} className="text-[#c9a84c]" />, label: "Legacy", value: "The death benefit recapitalizes the Family Bank, ensuring Generation 2 starts at Level 4, not Level 1." },
              ].map((row) => (
                <HudFrame key={row.label} className="p-4 bg-[#0a0800]/70">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{row.icon}</div>
                    <div>
                      <div className="font-tactical text-xs text-[#c9a84c]/60 tracking-widest uppercase mb-0.5">{row.label}</div>
                      <div className="font-tactical text-sm text-white/75 tracking-wide leading-relaxed">{row.value}</div>
                    </div>
                  </div>
                </HudFrame>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ENGINE LOOP */}
      <section className="relative py-24 bg-gradient-to-b from-[#050400] to-[#080600] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06)_0%,transparent_70%)]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel text="The IUL Engine Loop — How It Works" />
            <h2 className="font-display text-3xl sm:text-5xl font-black text-white mb-4">
              Your Money Works <span className="text-[#c9a84c]">Two Jobs at Once.</span>
            </h2>
            <p className="font-tactical text-white/60 text-base max-w-2xl mx-auto tracking-wide">
              This is the core mechanic that separates the 7-Level Blueprint from every other financial strategy.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            {[
              { step: "01", title: "Fund the Policy", body: "You contribute premium payments into your IUL. These build your cash value, indexed to the S&P 500 with a 0% floor.", icon: <DollarSign size={20} className="text-[#c9a84c]" /> },
              { step: "02", title: "Cash Value Grows", body: "Your cash value compounds tax-deferred. In strong market years it captures index gains. In down years, the floor protects your principal.", icon: <TrendingUp size={20} className="text-[#c9a84c]" /> },
              { step: "03", title: "Borrow Against It", body: "You take a policy loan against your cash value. No credit check. No approval. No mandatory repayment schedule. Funds arrive in days.", icon: <Zap size={20} className="text-[#c9a84c]" /> },
              { step: "04", title: "Deploy the Capital", body: "You use the loan to buy assets: real estate, business inventory, a vehicle, your child's education — any capital deployment that generates a return.", icon: <Building2 size={20} className="text-[#c9a84c]" /> },
              { step: "05", title: "Baseline Keeps Compounding", body: "While your loan is deployed, your full cash value continues to grow as if the loan never happened. Your money is doing two jobs simultaneously.", icon: <RefreshCw size={20} className="text-[#c9a84c]" /> },
              { step: "06", title: "Repay Yourself", body: "When you repay the loan, the interest goes back into your policy — not to a bank. You recapture every dollar of interest that would have leaked to a third party.", icon: <Shield size={20} className="text-[#c9a84c]" /> },
            ].map((item, i) => (
              <div key={item.step} className="w-full max-w-2xl">
                <HudFrame className="p-5 bg-[#0a0800]/80">
                  <div className="flex items-start gap-4">
                    <div className="level-badge flex-shrink-0 w-10 h-10 text-sm">{item.step}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {item.icon}
                        <h3 className="font-display text-base font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="font-tactical text-sm text-white/65 leading-relaxed tracking-wide">{item.body}</p>
                    </div>
                  </div>
                </HudFrame>
                {i < 5 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown size={16} className="text-[#c9a84c]/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 border border-[#c9a84c]/40 bg-[#c9a84c]/10">
              <RefreshCw size={14} className="text-[#c9a84c]" />
              <span className="font-tactical text-sm text-[#c9a84c] font-bold tracking-widest uppercase">Loop Repeats Indefinitely — Across Generations</span>
              <RefreshCw size={14} className="text-[#c9a84c]" />
            </div>
          </div>
        </div>
      </section>

      {/* HONEST ANSWERS */}
      <section className="relative py-24 bg-[#060500] circuit-bg overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <SectionLabel text="Honest Answers — No Sales Pitch" />
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-4">
              Questions You Should Ask<br />
              <span className="text-[#c9a84c]">Before You Commit.</span>
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is this the right product for everyone?", a: "No. The Lifetime LOC mechanic requires patience — cash value takes 3–5 years to build to a meaningful borrowing threshold. If you need liquidity in the next 12 months, this is not the right starting point. We'll tell you that in our first session." },
              { q: "What if I can't keep up with premium payments?", a: "IUL policies have flexibility built in. If your income changes, premium payments can be reduced or paused using accumulated cash value. We design every policy with this flexibility in mind from day one." },
              { q: "How is this different from whole life insurance?", a: "Whole life has fixed, guaranteed growth. IUL is indexed — it captures market upside with a floor protecting your downside. IUL also offers more premium flexibility. The right choice depends on your specific situation, which is why we do a needs analysis first." },
              { q: "What if I borrow against the policy and the market crashes?", a: "Your floor protects your cash value from market losses. However, if your loan balance grows faster than your cash value, the policy can lapse. We design policies with loan management built into the strategy to prevent this." },
              { q: "Do I need to qualify medically?", a: "Yes. Life insurance requires underwriting. Your health, age, and lifestyle affect your premium rates. We work with multiple carriers to find the most competitive rates for your specific profile." },
            ].map((item) => (
              <HudFrame key={item.q} className="p-6 bg-[#0a0800]/70">
                <div className="mb-3">
                  <span className="font-tactical text-xs text-[#c9a84c] font-bold tracking-widest uppercase">&gt; Q: </span>
                  <span className="font-display text-base font-bold text-white">{item.q}</span>
                </div>
                <div>
                  <span className="font-tactical text-xs text-[#c9a84c]/50 font-bold tracking-widest uppercase">&gt; A: </span>
                  <span className="font-tactical text-sm text-white/65 leading-relaxed tracking-wide">{item.a}</span>
                </div>
              </HudFrame>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 bg-gradient-to-b from-[#060500] to-[#050400] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.10)_0%,transparent_70%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <SectionLabel text="Lock In Your Character" />
          <h2 className="font-display text-3xl sm:text-5xl font-black text-[#c9a84c] mb-4 gold-text-glow-intense">
            Ready to Build Your<br />Lifetime LOC?
          </h2>
          <p className="font-tactical text-white/60 text-lg max-w-xl mx-auto tracking-wide mb-10">
            Schedule a free needs analysis. We'll review your current financial position, determine if an IUL is the right fit, and design a policy structure built around your specific goals — before you commit to anything.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="https://calendly.com/malikeast7band" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 bg-[#c9a84c] text-black font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#e8c97a] transition-all gold-pulse">
              <Star size={14} fill="currentColor" /> Schedule Free Needs Analysis
            </a>
            <Link href="/"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#c9a84c] font-tactical font-bold text-sm tracking-widest uppercase hover:bg-[#c9a84c]/10 transition-all">
              View Full Blueprint <ArrowRight size={14} />
            </Link>
          </div>
          <p className="font-tactical text-xs text-white/30 tracking-wide">No pressure. No obligation. Just a clear picture of what's possible.</p>
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
