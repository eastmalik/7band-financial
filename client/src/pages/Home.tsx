/**
 * 7Band Financial Agency — Home Page
 * Design: Dark navy hero, white content sections, green labels, orange CTAs.
 * Fonts: Playfair Display (headings), Inter (body).
 * Mirrors layout of buildalifeloc.com for 7Band Financial Agency.
 */
import { useEffect, useRef, useState } from "react";
import { Clock, Heart, TrendingUp, CheckCircle, ArrowRight, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SevenBandsAccent, SevenBandsShield } from "@/components/SevenBands";

// Simple scroll-reveal hook
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
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

export default function Home() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* ── HERO SECTION ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ backgroundColor: "#0d1f2d" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/manus-storage/7band-hero-bg_6c47a05e.png')`,
            opacity: 0.35,
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1f2d]/90 via-[#0d1f2d]/70 to-[#0d1f2d]/30" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-[#22c55e]/20 border border-[#22c55e]/40 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block" />
              <span className="font-body text-[#22c55e] text-xs font-semibold tracking-wider uppercase">
                Life Insurance & Generational Wealth
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Build a line of credit{" "}
              <em className="text-[#22c55e] not-italic">guaranteed for life.</em>
            </h1>
            <p className="font-body text-lg text-white/75 leading-relaxed mb-8 max-w-xl">
              For yourself, or started young for your kids. It compounds safely every year, it can't be frozen or called, and it finances everything life asks of you while the balance keeps growing. The wealthy have built these for generations. Yours starts with one conversation.
            </p>
            <SevenBandsAccent className="w-32 text-[#22c55e] mb-6 opacity-60" />
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("#contact")}
                className="bg-[#f97316] hover:bg-[#ea6c0a] text-white font-body font-semibold px-7 py-3.5 rounded-md transition-all duration-150 active:scale-95 text-base"
              >
                Book My Free Needs Analysis
              </button>
              <button
                onClick={() => scrollTo("#how-it-works")}
                className="border-2 border-white/60 hover:border-white text-white font-body font-semibold px-7 py-3.5 rounded-md transition-all duration-150 active:scale-95 text-base"
              >
                See the First 90 Days
              </button>
            </div>
          </div>

          {/* Emblem */}
          <div className="hidden lg:flex justify-center items-center animate-fade-up animate-fade-up-delay-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#22c55e]/10 blur-3xl scale-110" />
              <SevenBandsShield className="w-72 h-72 drop-shadow-2xl relative z-10" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12 bg-white/40 animate-pulse" />
        </div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="max-w-3xl">
              <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
                What We Do
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-6">
                An asset that answers before you ask
              </h2>
              <SevenBandsAccent className="w-24 text-[#22c55e] mb-6 opacity-50" />
              <p className="font-body text-lg text-gray-600 leading-relaxed mb-4">
                Underneath the name is high cash value life insurance, designed a specific way, and we lead with that because this only works out in the open. Built right, the policy behaves like nothing else you own: a pool of capital that grows on guarantees, that you can borrow against with no application and no banker's mood, and that pays your family income-tax-free when you're done with it.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-8">
                The catch is the phrase "built right." The same product built the default way earns every bit of its bad reputation. That's why the design conversation comes before any application, and why the education is free whether you ever work with us or not.
              </p>
              <blockquote className="border-l-4 border-[#f97316] pl-6 py-2 italic font-display text-xl text-[#0d1f2d]">
                "The system doesn't hand you a bank, it grows one. The best time to begin was twenty years ago. The second best time is today."
              </blockquote>
              <div className="mt-8">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="inline-flex items-center gap-2 font-body text-[#0d1f2d] font-semibold border-2 border-[#0d1f2d] px-6 py-3 rounded-md hover:bg-[#0d1f2d] hover:text-white transition-all duration-150 active:scale-95"
                >
                  Want the full education first? It's free <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── WHY NOW — 3 CARDS ────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
              Why Start Now
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-12">
              Two things you can't buy back later
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Clock size={20} />,
                label: "Time",
                title: "Compounding needs a head start",
                body: "Every year you wait is a year of growth that never happens, and the gap widens for the rest of your life. The policy you start at 35 beats the bigger one you start at 50, and it's not close. Start small if you have to. Start.",
                delay: "delay-0",
              },
              {
                icon: <Heart size={20} />,
                label: "Insurability",
                title: "Your health is the ticket in",
                body: "You qualify for this asset with your health, and health only moves one direction. The exam isn't the enemy — waiting is. Lock in insurability while it's cheap, and it stays locked for life. This is doubly true for kids.",
                delay: "delay-100",
              },
              {
                icon: <TrendingUp size={20} />,
                label: "The Alternative",
                title: "Someone's building a bank on your dollars",
                body: "Every dollar sitting idle or flowing out as interest is already capitalizing a banking system. It's just someone else's. Building your own doesn't take new money. Mostly it re-routes money already in motion.",
                delay: "delay-200",
              },
            ].map((card, i) => (
              <RevealSection key={card.label}>
                <div
                  className={`bg-white rounded-xl border border-gray-200 p-7 h-full hover:shadow-lg transition-shadow duration-300`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#22c55e]">{card.icon}</span>
                    <span className="font-body text-[#22c55e] text-xs font-bold tracking-widest uppercase">
                      {card.label}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0d1f2d] mb-3">{card.title}</h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed">{card.body}</p>
                  <SevenBandsAccent className="w-16 text-[#22c55e] mt-4 opacity-30" />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
              The Path
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-4">
              What building it looks like
            </h2>
            <p className="font-body text-gray-600 text-lg leading-relaxed mb-12 max-w-2xl">
              Cash flow feeds the policy. The policy grows the line. The line finances your life, and the death benefit restarts the whole system for the next generation. Here's the map, and the needs analysis is where we draw your version of it.
            </p>
          </RevealSection>

          {/* Process Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Free Needs Analysis", desc: "We review your family's financial situation, goals, and budget — no obligation, no pressure." },
              { step: "02", title: "Policy Built for Cash Value", desc: "We design it specifically for high cash value and low expense — not the default way the product is usually sold." },
              { step: "03", title: "Your Line Activates", desc: "Coverage begins immediately. Your cash value starts growing from day one, guaranteed." },
              { step: "04", title: "Borrow Against It", desc: "No application, no credit check, no banker's mood. It's your capital — access it on your terms." },
              { step: "05", title: "Put Capital to Work", desc: "Real estate, business, emergencies, retirement income. The line finances your life while the balance keeps growing." },
              { step: "06", title: "Recapitalize the Family Bank", desc: "The death benefit passes income-tax-free to your family and restarts the whole system for the next generation." },
            ].map((item, i) => (
              <RevealSection key={item.step}>
                <div
                  className="relative bg-white border border-gray-200 rounded-xl p-6 hover:border-[#22c55e] hover:shadow-md transition-all duration-300"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-9 h-9 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center font-display font-bold text-[#22c55e] text-sm shrink-0">
                      {item.step}
                    </span>
                    <SevenBandsAccent className="w-10 text-[#22c55e] opacity-30" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#0d1f2d] mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES DETAIL ──────────────────────────────────────────── */}
      <section className="py-24 bg-[#0d1f2d]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
              Our Products
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Coverage for every stage of life
            </h2>
            <p className="font-body text-white/60 text-lg leading-relaxed mb-12 max-w-2xl">
              We work with top-rated carriers to find the right product for your situation. The design conversation comes first — always.
            </p>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Term Life Insurance", desc: "Affordable, straightforward protection for a defined period. Ideal for income replacement and mortgage protection." },
              { title: "Whole Life Insurance", desc: "Permanent coverage with guaranteed cash value growth. The foundation of generational wealth building." },
              { title: "Indexed Universal Life", desc: "Growth tied to a market index with downside protection. Combines flexibility with upside potential." },
              { title: "Final Expense Insurance", desc: "Covers end-of-life costs so your family isn't burdened. Simple approval, no medical exam required." },
              { title: "Mortgage Protection", desc: "Ensures your family keeps the home if something happens to you. Peace of mind for your biggest asset." },
              { title: "Children's Whole Life", desc: "Lock in your child's insurability and start their cash value growing today. The gift that compounds for life." },
            ].map((product) => (
              <RevealSection key={product.title}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-[#22c55e]/40 transition-all duration-300 group">
                  <CheckCircle size={20} className="text-[#22c55e] mb-3" />
                  <h3 className="font-display text-lg font-bold text-white mb-2">{product.title}</h3>
                  <p className="font-body text-sm text-white/60 leading-relaxed">{product.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection>
              <span className="inline-block bg-[#22c55e] text-white font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4">
                Who You're Working With
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0d1f2d] mb-6">
                7Band Financial Agency
              </h2>
              <SevenBandsAccent className="w-28 text-[#22c55e] mb-6 opacity-50" />
              <p className="font-body text-gray-600 leading-relaxed mb-4">
                We are a licensed life insurance agency dedicated to helping families — especially those who have been underserved by the traditional financial industry — understand and access the same wealth-building tools that affluent families have used for generations.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-4">
                We believe life insurance is not just about what happens when you die. It's about what happens while you're living — building a financial foundation your children and grandchildren can stand on.
              </p>
              <p className="font-body text-gray-600 leading-relaxed mb-8">
                Every client receives a personalized needs analysis. We don't sell products — we design solutions. If it's not the right time yet, you'll hear that from us too.
              </p>
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-body font-semibold px-7 py-3.5 rounded-md transition-all duration-150 active:scale-95"
              >
                Talk With Us, Free — No Obligation <Phone size={16} />
              </button>
            </RevealSection>
            <RevealSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-[#22c55e]/10 rounded-2xl -z-10" />
                <img
                  src="/manus-storage/7band-about-img_8eb249fc.png"
                  alt="7Band Financial Agency Advisor"
                  className="w-full rounded-xl shadow-2xl object-cover aspect-[3/4]"
                />
              </div>
            </RevealSection>
          </div>
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
              One conversation starts it
            </h2>
            <p className="font-body text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              The needs analysis is free and open to anyone, even if you're an agent. We'll look at your cash flow, whether your base is ready, and what a design built for you would look like. If it's not the right time yet, you'll hear that from us too. No obligation, no chase-down calls afterward. Just answers.
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
