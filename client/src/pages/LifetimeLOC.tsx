/**
 * 7Band Financial Agency — Lifetime LOC Product Page
 * Design: Same brand system — dark navy hero, white sections, green labels, orange CTAs.
 * Modeled after lifetimeloc.com structure — deep-dive into the cash value life insurance product.
 */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, Shield, TrendingUp, DollarSign, RefreshCw, AlertCircle, CheckCircle } from "lucide-react";
import { Link } from "wouter";
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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

const lessons = [
  {
    num: "01",
    icon: <TrendingUp size={22} />,
    title: "How It Grows",
    body: "The two flavors: whole life, the reliable engine, and indexed universal life, the flexible alternative. We cover guarantees, dividends, floors, and where the risk actually lives — in plain language.",
  },
  {
    num: "02",
    icon: <Shield size={22} />,
    title: "Why Design Decides Everything",
    body: "The same product built two different ways produces opposite results. Not all whole life policies are created equal. This is the most important thing to understand before you ever sign an application.",
  },
  {
    num: "03",
    icon: <DollarSign size={22} />,
    title: "Using the Line",
    body: "How borrowing against the policy actually works, the three phases of the system, and the rules that keep you an honest banker to yourself.",
  },
  {
    num: "04",
    icon: <AlertCircle size={22} />,
    title: "Honest Answers",
    body: '"Buy term and invest the difference." "You\'re borrowing your own money." The objections deserve real answers, and each one gets its fair point conceded first before we address it.',
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Cash Flow Feeds the Policy",
    desc: "Your premiums go into a policy designed specifically for high cash value — not the default way the product is usually sold. The design matters more than the carrier.",
  },
  {
    step: "02",
    title: "Cash Value Grows Guaranteed",
    desc: "The cash value compounds safely every year, guaranteed by the insurer. It doesn't drop when markets fall. It doesn't get frozen when the economy turns.",
  },
  {
    step: "03",
    title: "Borrow Against It — No Application",
    desc: "You can borrow against your cash value for anything: real estate, business, emergencies, opportunity. No credit check, no banker's approval, no questions asked.",
  },
  {
    step: "04",
    title: "The Balance Keeps Compounding",
    desc: "Here's what makes this different from a savings account: the full balance inside the policy keeps compounding as if you never touched it, even while the loan is outstanding.",
  },
  {
    step: "05",
    title: "Pay Yourself Back on Your Schedule",
    desc: "You set the repayment terms. There's no bank calling the loan. You pay back what you borrowed and the cycle continues — your own personal banking system.",
  },
  {
    step: "06",
    title: "The Death Benefit Restarts Everything",
    desc: "When you're done, the death benefit passes income-tax-free to your family and recapitalizes the whole system for the next generation. The family bank lives on.",
  },
];

const objections = [
  {
    q: "Isn't whole life insurance a bad investment?",
    a: "That's fair — and it's true of whole life built the default way. The same product designed for high cash value and low commission behaves completely differently. The design is the difference. We show you both side by side.",
  },
  {
    q: "Aren't I just borrowing my own money?",
    a: "Technically, you're borrowing from the insurer using your cash value as collateral — and your full cash value keeps compounding inside the policy the whole time. That's the part most people miss.",
  },
  {
    q: "Why not just use a HELOC?",
    a: "HELOCs are great and we teach people to use them. The difference: a HELOC can be frozen or called when the economy gets ugly — exactly when you need capital most. This line can't be. Have both if you can.",
  },
  {
    q: "What if I can't keep paying the premiums?",
    a: "There are options: reduced paid-up, paid-up additions, policy loans to cover premiums. A well-designed policy has flexibility built in. We walk through the scenarios before you ever apply.",
  },
];

export default function LifetimeLOC() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: "#0d1f2d" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/manus-storage/7band-hero-bg_6c47a05e.png')`,
            opacity: 0.22,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f2d]/95 via-[#0d1f2d]/80 to-[#0d1f2d]/50" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#22c55e]/20 border border-[#22c55e]/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block" />
              <span className="font-body text-[#22c55e] text-xs font-semibold tracking-wider uppercase">
                7Band Financial Agency · Flagship Product
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              A line of credit{" "}
              <em className="text-[#22c55e] not-italic">guaranteed for life.</em>
            </h1>
            <p className="font-body text-lg text-white/75 leading-relaxed mb-6 max-w-xl">
              Your HELOC can be frozen. Your card limit can be cut. Your banker can say no. There's one line of credit that never gets called, never expires, and grows every year you own it — and the banks buy it for themselves by the billion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("#loc-contact")}
                className="bg-[#f97316] hover:bg-[#ea6c0a] text-white font-body font-semibold px-7 py-3.5 rounded-md transition-all duration-150 active:scale-95 text-base"
              >
                Build Mine — Free Needs Analysis
              </button>
              <button
                onClick={() => scrollTo("#how-it-grows")}
                className="border-2 border-white/60 hover:border-white text-white font-body font-semibold px-7 py-3.5 rounded-md transition-all duration-150 active:scale-95 text-base"
              >
                Start Learning
              </button>
            </div>
          </div>

        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-40">
          <div className="w-px h-12 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* ── WHAT IT ACTUALLY IS ──────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="max-w-3xl">
              <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
                Plain Language First
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-6">
                What "Lifetime LOC" actually means
            </h2>
              <p className="font-body text-lg text-gray-600 leading-relaxed mb-4">
                The asset underneath is high cash value life insurance — whole life or indexed universal life, designed a specific way. We lead with that because nothing here works as a secret. Once you see what a properly designed policy does, "a line of credit that's guaranteed for life" is simply the most accurate description of how it behaves.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-4">
                The cash value compounds safely every year, guaranteed. You can borrow against it for anything — no application, no credit check, no banker's opinion — while the full balance keeps compounding inside as if it never left. You pay yourself back on a schedule you set.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-8">
                And unlike a HELOC, it can't be frozen or called when the economy gets ugly — which is exactly when you need capital most.
              </p>
              <blockquote className="border-l-4 border-[#f97316] pl-6 py-2 italic font-display text-xl text-[#0d1f2d]">
                "Banks held $205.7 billion of cash value in bank-owned life insurance across more than 3,000 institutions as of late 2024, per FDIC filings. The lobby sells you free checking. The vault buys something else."
              </blockquote>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── HOW IT WORKS — 6 STEPS ───────────────────────────────────── */}
      <section id="how-it-grows" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
              The Whole System
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-4">
              Where the Lifetime LOC fits
            </h2>
            <p className="font-body text-gray-600 text-lg leading-relaxed mb-12 max-w-2xl">
              The line of credit isn't the whole plan — it's the engine in the middle of one. Cash flow feeds it, the line puts capital to work when life asks for it, and the death benefit recapitalizes everything for the next generation.
            </p>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {howItWorks.map((item, i) => (
              <RevealSection key={item.step}>
                <div
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#22c55e] hover:shadow-md transition-all duration-300 h-full"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-9 h-9 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center font-display font-bold text-[#22c55e] text-sm shrink-0">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0d1f2d] mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE LESSONS ────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d1f2d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
              Learn It in Order
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Four lessons, then the honest pushback
            </h2>
            <p className="font-body text-white/60 text-lg leading-relaxed mb-12 max-w-2xl">
              The education is free whether you ever work with us or not. Start here.
            </p>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {lessons.map((lesson, i) => (
              <RevealSection key={lesson.num}>
                <div
                  className="bg-white/5 border border-white/10 rounded-xl p-7 hover:bg-white/10 hover:border-[#22c55e]/40 transition-all duration-300 group h-full"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e] shrink-0">
                      {lesson.icon}
                    </span>
                    <span className="font-body text-[#22c55e] text-xs font-bold tracking-widest uppercase">
                      Lesson {lesson.num}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3">{lesson.title}</h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed">{lesson.body}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── HONEST ANSWERS / OBJECTIONS ──────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
              Honest Answers
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-4">
              The objections deserve real answers
            </h2>
            <p className="font-body text-gray-600 text-lg leading-relaxed mb-12 max-w-2xl">
              Each one gets its fair point conceded first. We're not here to sell you past your doubts — we're here to give you the full picture.
            </p>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {objections.map((item, i) => (
              <RevealSection key={i}>
                <div
                  className="bg-gray-50 border border-gray-200 rounded-xl p-7 hover:border-[#22c55e] hover:shadow-md transition-all duration-300 h-full"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle size={18} className="text-[#f97316] mt-0.5 shrink-0" />
                    <h3 className="font-display text-lg font-bold text-[#0d1f2d]">{item.q}</h3>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-[#22c55e] mt-0.5 shrink-0" />
                    <p className="font-body text-sm text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECIRCULATION — BACK TO MAIN SITE ───────────────────────── */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-body text-sm text-gray-500 mb-1">Looking for other coverage options?</p>
                <p className="font-display text-xl font-bold text-[#0d1f2d]">
                  See everything 7Band Financial Agency offers.
                </p>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-body text-[#0d1f2d] font-semibold border-2 border-[#0d1f2d] px-6 py-3 rounded-md hover:bg-[#0d1f2d] hover:text-white transition-all duration-150 active:scale-95 shrink-0"
              >
                Back to Main Site <ArrowRight size={16} />
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section id="loc-contact" className="py-24 bg-[#0d1f2d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealSection>
            <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-6">
              Build Yours
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              See it with your own numbers
            </h2>
            <p className="font-body text-lg text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              The needs analysis is free and open to anyone, even if you're an agent. We'll look at your cash flow and whether this asset actually fits your plan. If it doesn't yet, you'll hear that from us too. No obligation, no chase-down calls afterward. Just answers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@7bandfinancial.com"
                className="bg-[#f97316] hover:bg-[#ea6c0a] text-white font-body font-semibold px-8 py-4 rounded-md transition-all duration-150 active:scale-95 text-base inline-flex items-center justify-center gap-2"
              >
                Book My Free Needs Analysis <ArrowRight size={18} />
              </a>
              <a
                href="tel:+1-800-000-0000"
                className="border-2 border-white/40 hover:border-white text-white font-body font-semibold px-8 py-4 rounded-md transition-all duration-150 active:scale-95 text-base inline-flex items-center justify-center gap-2"
              >
                <Phone size={18} /> Call Us Today
              </a>
            </div>
            <p className="font-body text-sm text-white/30 mt-6">
              No obligation · No chase-down calls afterward · Just answers
            </p>
          </RevealSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
