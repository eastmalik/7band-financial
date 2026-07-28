/**
 * 7Band Financial Agency — Main Homepage
 * Design: Dark navy hero, white content sections, green labels, orange CTAs.
 * Modeled after oregoncashflowpro.com structure — "front of the store" for a life insurance agency.
 * Fonts: Playfair Display (headings), Inter (body).
 */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle, Phone, TrendingUp, Shield, Users, BookOpen } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SevenBandsAccent, SevenBandsShield } from "@/components/SevenBands";

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
  { label: "I need death benefit coverage", href: "#approach" },
  { label: "Debt is eating my paycheck", href: "#approach" },
  { label: "My savings barely grow", href: "#approach" },
  { label: "I want a safe growth asset I can access", href: "/lifetime-loc" },
  { label: "Will I have enough to retire?", href: "#approach" },
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
              Money problems{" "}
              <em className="text-[#22c55e] not-italic">have solutions.</em>{" "}
              Let's find yours.
            </h1>
            <p className="font-body text-lg text-white/75 leading-relaxed mb-8 max-w-xl">
              Usually the problem underneath is the same one: not enough in a safe growth asset you can reach when you need it most, or want it most. Close that gap and everything else gets easier. That's what we work on here.
            </p>
            <SevenBandsAccent className="w-28 text-[#22c55e] mb-8 opacity-50" />
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
                See Our Main Product →
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#22c55e]/10 blur-3xl scale-110" />
              <SevenBandsShield className="w-64 h-64 drop-shadow-2xl relative z-10" />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* ── WHAT'S THE MONEY PROBLEM? ─────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <p className="font-body text-xs font-bold tracking-widest uppercase text-gray-400 mb-5">
              What's the money problem?
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

      {/* ── BEFORE ANYTHING ELSE ─────────────────────────────────────── */}
      <section id="approach" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="max-w-3xl">
              <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
                Before Anything Else
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-6">
                Life insurance might be the answer. Slow down a beat anyway.
              </h2>
              <SevenBandsAccent className="w-24 text-[#22c55e] mb-6 opacity-40" />
              <p className="font-body text-lg text-gray-600 leading-relaxed mb-4">
                A lot of people come here ready to get started with a policy. They've done the research, they've run the numbers, and they're ready to go. I appreciate that. But a policy is one tool in a bigger picture, and the picture comes first.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-4">
                Is your money moving efficiently? How much risk is your current situation carrying? Sometimes cash value life insurance improves that picture a lot. Sometimes it's not the right fit yet — and you'd want to know that before you commit to premiums.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-8">
                Yes, I sell life insurance. It's my main source of income. But it only gets recommended when it solves a real problem or meets a genuine need in your plan. Finding that out is what the needs analysis is for, and it's free.
              </p>
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center gap-2 font-body text-[#0d1f2d] font-semibold border-2 border-[#0d1f2d] px-6 py-3 rounded-md hover:bg-[#0d1f2d] hover:text-white transition-all duration-150 active:scale-95"
              >
                Book the Free Needs Analysis <ArrowRight size={16} />
              </button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── HOW WE LOOK AT YOUR MONEY ────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
              How We Look at Your Money
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-4">
              The whole picture first. Then the policy.
            </h2>
            <p className="font-body text-gray-600 text-lg leading-relaxed mb-12 max-w-2xl">
              Start with the problem most families actually have: not enough in a safe growth asset that can be reached when it's needed or wanted most. Almost everything else in a financial plan gets easier once that asset exists.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "1",
                icon: <TrendingUp size={22} />,
                title: "Move your money efficiently",
                body: "We find the leaks first. Interest going out, dollars sitting idle, money doing one job when it could do two. Fixing the flow costs nothing, and it funds everything that comes after.",
              },
              {
                num: "2",
                icon: <Shield size={22} />,
                title: "Check your risk",
                body: "How much of your situation rides the market? We look at the downsides and restrictions honestly — contribution caps, lock-ups, and what a bad year at the wrong time does to your plan.",
              },
              {
                num: "3",
                icon: <CheckCircle size={22} />,
                title: "Test the fit",
                body: "Then, and only then: would a high cash value policy make your plan stronger? If yes, we design it right. If no, you'll hear that from us too.",
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
                  <SevenBandsAccent className="w-16 text-[#22c55e] mt-5 opacity-25" />
                </div>
              </RevealSection>
            ))}
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
                <SevenBandsAccent className="w-24 text-[#22c55e] mb-6 opacity-50" />
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
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#22c55e]/10 blur-3xl scale-110" />
                  <SevenBandsShield className="w-56 h-56 relative z-10 opacity-90" />
                </div>
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

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
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
                My Story
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-6">
                7Band Financial Agency
              </h2>
              <SevenBandsAccent className="w-28 text-[#22c55e] mb-6 opacity-40" />
              <p className="font-body text-gray-600 leading-relaxed mb-4">
                I started 7Band Financial Agency because I believe every family deserves access to the same financial tools that wealthy families have used for generations — not just the ones the industry defaults to selling.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-4">
                I'm a licensed life insurance agent dedicated to helping families protect what they've built and grow what they're building. I own the policies I recommend. If it's good enough to teach, it's what I use myself.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-8">
                Every client starts with a free needs analysis. We don't sell products — we design solutions. If it's not the right fit yet, you'll hear that from me directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-body font-semibold px-7 py-3.5 rounded-md transition-all duration-150 active:scale-95"
                >
                  Talk With Me, Free <Phone size={16} />
                </button>
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
              Start with a free needs analysis
            </h2>
            <p className="font-body text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Not a sales appointment. We'll look at how your money is moving, what risk your situation is carrying, and whether a properly designed policy would actually improve things. If it would, you'll see exactly how and why. If it wouldn't, you'll leave knowing that too. No obligation, no chase-down calls afterward. Just answers.
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
              No obligation · No chase-down calls afterward · Just answers
            </p>
          </RevealSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
