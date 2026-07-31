/**
 * 7Band Financial Agency — Main Homepage
 * Design: Dark navy hero, white content sections, green labels, orange CTAs.
 * StoryBrand framework: Hero = Be Your Own Bank, Villain = banks/interest, Guide = Malik, Plan = 3 steps, Stakes = success/failure.
 * Fonts: Playfair Display (headings), Inter (body).
 */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle, Phone, TrendingUp, Shield, BookOpen, AlertTriangle, Download } from "lucide-react";
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

const problems = [
  { label: "I'm paying too much interest to banks", href: "#villain" },
  { label: "My dollars are sitting idle", href: "#villain" },
  { label: "I missed an investment — no capital", href: "#villain" },
  { label: "I want to be my own bank", href: "/lifetime-loc" },
  { label: "I need life insurance coverage", href: "#services" },
  { label: "Something else? Let's talk →", href: "#contact" },
];

export default function Home() {
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
            opacity: 0.28,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f2d]/95 via-[#0d1f2d]/75 to-[#0d1f2d]/40" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#22c55e]/20 border border-[#22c55e]/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block" />
              <span className="font-body text-[#22c55e] text-xs font-semibold tracking-wider uppercase">
                Licensed Life Insurance Agent
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Be Your{" "}
              <em className="text-[#22c55e] not-italic">Own Bank.</em>
            </h1>
            <p className="font-body text-lg text-white/75 leading-relaxed mb-8 max-w-xl">
              Stop losing money to high-interest bank loans. Build a private line of credit you control — one that grows every year, can't be frozen, and funds your life while your balance keeps compounding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("#contact")}
                className="bg-[#f97316] hover:bg-[#ea6c0a] text-white font-body font-semibold px-7 py-3.5 rounded-md transition-all duration-150 active:scale-95 text-base"
              >
                Book My Free Needs Analysis
              </button>
              <Link
                href="/lifetime-loc"
                className="border-2 border-white/60 hover:border-white text-white font-body font-semibold px-7 py-3.5 rounded-md transition-all duration-150 active:scale-95 text-base text-center"
              >
                See How It Works →
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* ── ONE-LINER / STORY GAP ────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <p className="font-body text-sm text-gray-500 leading-relaxed max-w-3xl mb-5">
              Most business owners and families lose thousands in interest by "renting" money from banks. We help you build a private line of credit through life insurance — so you can fund your own investments and keep your wealth growing while you use it.
            </p>
            <p className="font-body text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">
              What's your situation?
            </p>
            <div className="flex flex-wrap gap-3">
              {problems.map((p) =>
                p.href.startsWith("/") ? (
                  <Link
                    key={p.label}
                    href={p.href}
                    className="font-body text-sm font-medium px-4 py-2 rounded-full border border-[#0d1f2d]/20 text-[#0d1f2d] hover:bg-[#0d1f2d] hover:text-white hover:border-[#0d1f2d] transition-all duration-150"
                  >
                    {p.label}
                  </Link>
                ) : (
                  <button
                    key={p.label}
                    onClick={() => scrollTo(p.href)}
                    className="font-body text-sm font-medium px-4 py-2 rounded-full border border-[#0d1f2d]/20 text-[#0d1f2d] hover:bg-[#0d1f2d] hover:text-white hover:border-[#0d1f2d] transition-all duration-150"
                  >
                    {p.label}
                  </button>
                )
              )}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── THE VILLAIN ──────────────────────────────────────────────── */}
      <section id="villain" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="max-w-3xl">
              <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
                The Problem
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-6">
                Banks are getting rich off your money. You don't have to let them.
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-[#f97316] mt-1 shrink-0" />
                  <p className="font-body text-gray-600 leading-relaxed"><strong>The External Problem:</strong> You lack quick access to capital when a business opportunity or emergency hits — banks move too slow, charge too much, or say no entirely.</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-[#f97316] mt-1 shrink-0" />
                  <p className="font-body text-gray-600 leading-relaxed"><strong>The Internal Problem:</strong> You feel controlled — watching great opportunities pass by because your dollars are sitting idle or locked up somewhere you can't reach them.</p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle size={18} className="text-[#f97316] mt-1 shrink-0" />
                  <p className="font-body text-gray-600 leading-relaxed"><strong>The Real Problem:</strong> You shouldn't have to rent money from a bank when you could be your own lender — keeping the interest for yourself instead of giving it away.</p>
                </div>
              </div>
              <blockquote className="border-l-4 border-[#f97316] pl-6 py-2 italic font-display text-xl text-[#0d1f2d] mb-8">
                "We understand how frustrating it is to watch a great investment opportunity pass by because a bank wouldn't move fast enough."
              </blockquote>
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center gap-2 font-body text-[#0d1f2d] font-semibold border-2 border-[#0d1f2d] px-6 py-3 rounded-md hover:bg-[#0d1f2d] hover:text-white transition-all duration-150 active:scale-95"
              >
                Book My Free Needs Analysis <ArrowRight size={16} />
              </button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── THE 3-STEP PLAN ──────────────────────────────────────────── */}
      <section id="approach" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
              The Plan
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-4">
              Three steps to your private bank.
            </h2>
            <p className="font-body text-gray-600 text-lg leading-relaxed mb-12 max-w-2xl">
              Simple process. Powerful result. Here's exactly how we build it.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "1",
                icon: <TrendingUp size={22} />,
                title: "Design Your Bank",
                body: "We build a custom high-cash-value life insurance policy engineered for maximum cash accumulation — not just a death benefit.",
              },
              {
                num: "2",
                icon: <Shield size={22} />,
                title: "Fund Your Future",
                body: "Deposit capital into your policy to create an immediate line of credit. Your money is working — growing guaranteed — from day one.",
              },
              {
                num: "3",
                icon: <CheckCircle size={22} />,
                title: "Borrow on Your Terms",
                body: "Access capital for any investment, expense, or opportunity — no application, no credit check, no banker's opinion. Your balance keeps compounding the whole time.",
              },
            ].map((step, i) => (
              <RevealSection key={step.num}>
                <div
                  className="bg-white rounded-xl border border-gray-200 p-7 h-full hover:shadow-lg transition-shadow duration-300"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center text-[#22c55e] shrink-0">
                      {step.icon}
                    </span>
                    <span className="font-display font-bold text-[#0d1f2d] text-lg">{step.num}.</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0d1f2d] mb-3">{step.title}</h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed">{step.body}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAKES: SUCCESS VS FAILURE ───────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
              The Stakes
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-12">
              What happens if you act — and if you don't.
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealSection>
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 h-full">
                <span className="inline-block bg-red-100 text-red-700 font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
                  Without a Private Bank
                </span>
                <h3 className="font-display text-2xl font-bold text-red-800 mb-4">Every day you wait costs you.</h3>
                <ul className="space-y-3 font-body text-red-700 text-sm leading-relaxed">
                  <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0" />Idle dollars earning next to nothing while inflation erodes their value</li>
                  <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0" />Paying banks thousands in interest — money that could stay in your pocket</li>
                  <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0" />Missing investment opportunities because capital isn't accessible fast enough</li>
                  <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 shrink-0" />Leaving your family exposed with no guaranteed protection in place</li>
                </ul>
              </div>
            </RevealSection>
            <RevealSection>
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 h-full">
                <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
                  With Your Private Bank
                </span>
                <h3 className="font-display text-2xl font-bold text-[#0d1f2d] mb-4">Financial independence on your terms.</h3>
                <ul className="space-y-3 font-body text-gray-700 text-sm leading-relaxed">
                  <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#22c55e] mt-0.5 shrink-0" />Capital available instantly — fund deals, cover emergencies, seize opportunities</li>
                  <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#22c55e] mt-0.5 shrink-0" />Interest you "pay" goes back to you — not to a bank</li>
                  <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#22c55e] mt-0.5 shrink-0" />Guaranteed growth every year, safe from market crashes</li>
                  <li className="flex items-start gap-2"><CheckCircle size={16} className="text-[#22c55e] mt-0.5 shrink-0" />A tax-free death benefit that transfers generational wealth to your family</li>
                </ul>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── LIFETIME LOC CALLOUT ─────────────────────────────────────── */}
      <section className="py-20 bg-[#0d1f2d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
                  Our Main Product
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                  The Lifetime LOC
                </h2>
                <p className="font-body text-white/70 text-lg leading-relaxed mb-4">
                  A line of credit that's guaranteed for life. It compounds safely every year, it can't be frozen or called, and it finances everything life asks of you while the balance keeps growing.
                </p>
                <p className="font-body text-white/60 leading-relaxed mb-8">
                  The wealthy have used this for generations. Banks hold it by the billions. We teach you exactly how it works and build one designed specifically for your situation.
                </p>
                <Link
                  href="/lifetime-loc"
                  className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-body font-semibold px-7 py-3.5 rounded-md transition-all duration-150 active:scale-95"
                >
                  Learn About the Lifetime LOC <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── PRODUCTS GRID ────────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
              Products
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-4">
              Coverage for every stage of life
            </h2>
            <p className="font-body text-gray-600 text-lg leading-relaxed mb-12 max-w-2xl">
              We work with top-rated carriers to find the right product for your family's unique situation. The design conversation always comes first.
            </p>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Term Life Insurance", desc: "Affordable, straightforward protection for a defined period. Ideal for income replacement and mortgage protection." },
              { title: "Whole Life Insurance", desc: "Permanent coverage with guaranteed cash value growth. The foundation of the Lifetime LOC strategy." },
              { title: "Indexed Universal Life", desc: "Growth tied to a market index with downside protection. Combines flexibility with upside potential." },
              { title: "Final Expense Insurance", desc: "Covers end-of-life costs so your family isn't burdened. Simple approval, no medical exam required." },
              { title: "Mortgage Protection", desc: "Ensures your family keeps the home if something happens to you. Peace of mind for your biggest asset." },
              { title: "Children's Whole Life", desc: "Lock in your child's insurability and start their cash value growing today. The gift that compounds for life." },
            ].map((product, i) => (
              <RevealSection key={product.title}>
                <div
                  className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:border-[#22c55e] hover:shadow-md transition-all duration-300"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <CheckCircle size={20} className="text-[#22c55e] mb-3" />
                  <h3 className="font-display text-lg font-bold text-[#0d1f2d] mb-2">{product.title}</h3>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">{product.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD GEN: FREE PDF ───────────────────────────────────────── */}
      <section className="py-16 bg-[#22c55e]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <Download size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Free Download: "5 Ways Banks Steal Your Interest (and How to Take It Back)"
                </h3>
                <p className="font-body text-white/80 text-sm leading-relaxed">
                  Not ready to book a call yet? Start here. This free PDF breaks down exactly how the banking system profits from your idle money — and what you can do about it today.
                </p>
              </div>
              <button
                onClick={() => scrollTo("#contact")}
                className="bg-white text-[#22c55e] hover:bg-white/90 font-body font-bold px-7 py-3.5 rounded-md transition-all duration-150 active:scale-95 shrink-0 whitespace-nowrap"
              >
                Get the Free PDF
              </button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── ABOUT / GUIDE ────────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#22c55e]/10 rounded-2xl -z-10" />
                <img
                  src="/manus-storage/7band-about-img_8eb249fc.png"
                  alt="7Band Financial Agency — Licensed Life Insurance Agent"
                  className="w-full rounded-xl shadow-2xl object-cover aspect-[3/4]"
                />
              </div>
            </RevealSection>
            <RevealSection>
              <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
                Your Guide
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-6">
                Your guide to becoming your own bank.
              </h2>
              <p className="font-body text-gray-600 leading-relaxed mb-4">
                I'm Malik East — founder of 7Band Financial Agency and a licensed life insurance agent. I built this agency because I believe every family deserves access to the same financial tools that wealthy families and major banks have used for generations.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-4">
                I own the policies I recommend. If it's good enough to teach, it's what I use myself. That's not a tagline — it's how I operate every single day.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-8">
                Every client starts with a free needs analysis. No pressure. No chase-down calls. Just an honest look at your situation and a clear answer on whether this is the right fit for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-body font-semibold px-7 py-3.5 rounded-md transition-all duration-150 active:scale-95"
                >
                  Talk With Me, Free <Phone size={16} />
                </button>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 font-body text-[#0d1f2d] font-semibold border-2 border-[#0d1f2d] px-6 py-3 rounded-md hover:bg-[#0d1f2d] hover:text-white transition-all duration-150 active:scale-95"
                >
                  Read My Full Story <ArrowRight size={16} />
                </Link>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── THE BOOK PLACEHOLDER ─────────────────────────────────────── */}
      <section id="book" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-40 h-52 bg-[#0d1f2d] rounded-xl flex items-center justify-center shadow-xl shrink-0">
                <BookOpen size={48} className="text-[#22c55e]" />
              </div>
              <div>
                <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
                  The Book
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0d1f2d] mb-3">
                  Coming Soon
                </h2>
                <p className="font-body text-gray-600 leading-relaxed mb-6 max-w-xl">
                  The full system in one place — how to move your money efficiently, build a personal banking system, and keep it working for generations. Details coming soon.
                </p>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="inline-flex items-center gap-2 font-body text-[#0d1f2d] font-semibold border-2 border-[#0d1f2d] px-6 py-3 rounded-md hover:bg-[#0d1f2d] hover:text-white transition-all duration-150 active:scale-95"
                >
                  Get Notified at Launch <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealSection>
            <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-6">
              Get Started
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0d1f2d] mb-6">
              Ready to stop renting money from banks?
            </h2>
            <p className="font-body text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Book your free needs analysis. We'll look at your situation, show you exactly how a private banking strategy would work for you, and give you a straight answer — no pressure, no obligation.
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
                className="border-2 border-[#0d1f2d] text-[#0d1f2d] hover:bg-[#0d1f2d] hover:text-white font-body font-semibold px-8 py-4 rounded-md transition-all duration-150 active:scale-95 text-base inline-flex items-center justify-center gap-2"
              >
                <Phone size={18} /> Call Us Today
              </a>
            </div>
            <p className="font-body text-sm text-gray-400 mt-6">
              No obligation · No pressure · Straight answers only
            </p>
          </RevealSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
