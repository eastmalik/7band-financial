/**
 * 7Band Financial Agency — About / Our Team Page
 * Design: Same brand system — dark navy hero, white sections, green labels, orange CTAs.
 * Features Malik East's real bio and photo from 7bandfinancialagency.com/our-team
 */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, Music, Heart, Users } from "lucide-react";
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

const values = [
  {
    icon: <Music size={22} />,
    title: "The Musical Inspiration",
    body: "The name 7Band comes from Malik's musical past. Just as instruments work in concert to create a symphony, life insurance works in concert with the other pieces of a financial strategy to create a more complete financial picture.",
  },
  {
    icon: <Heart size={22} />,
    title: "Relationships First",
    body: "Malik's clients become like family. He encourages long-term thinking and builds relationships built on honesty and authenticity. Every time a client accomplishes one of their financial goals, it's music to his ears.",
  },
  {
    icon: <Users size={22} />,
    title: "Community & Purpose",
    body: "Founded in 2021 out of a genuine desire to teach and help others, 7Band Financial Agency exists to give families access to financial tools that truly work — designed around their lives, not a generic product.",
  },
];

export default function About() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0a0a0a" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        className="relative pt-40 pb-24 overflow-hidden"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/manus-storage/7band-hero-bg_6c47a05e.png')`,
            opacity: 0.18,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 to-[#0a0a0a]/70" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/12 border border-[#c9a84c]/35 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "#c9a84c" }} />
            <span className="font-body text-[#c9a84c] text-xs font-semibold tracking-wider uppercase">
              Our Team
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Who You're{" "}
            <em className="text-[#c9a84c] not-italic">Working With</em>
          </h1>
          <p className="font-body text-lg text-[#e8d5a3]/65 leading-relaxed max-w-2xl mx-auto mb-8">
            7Band Financial Agency was founded on one conviction: hardworking families should be funding their own dreams — not handing their money to banks and institutions that use it to build their own empires. Every client deserves the same tools the wealthy use, and the honest education to put them to work.
          </p>
        </div>
      </section>

      {/* ── MALIK EAST — MAIN BIO ────────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#0f0f0f" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

            {/* Photo Column */}
            <RevealSection className="lg:col-span-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#c9a84c]/10 rounded-2xl -z-10" />
                <img
                  src="/manus-storage/malik-east-profile_b1731fac.webp"
                  alt="Malik East — Founder & Owner, 7Band Financial Agency"
                  className="w-full rounded-xl shadow-2xl object-cover aspect-square"
                />
                {/* Name card overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#0a0a0a]/92 backdrop-blur-sm rounded-b-xl px-6 py-4">
                  <p className="font-display font-bold text-white text-xl leading-tight">Malik East</p>
                  <p className="font-body text-[#c9a84c] text-xs font-bold tracking-widest uppercase mt-1">
                    Founder & Owner · Licensed Life Insurance Agent
                  </p>
                </div>
              </div>
              {/* CTA under photo */}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="https://calendly.com/malikeast/15-minute-quick-meeting-phone-call-via-zoom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-[#c9a84c] hover:bg-[#b8943e] text-white font-body font-semibold px-6 py-3.5 rounded-md transition-all duration-150 active:scale-95 inline-flex items-center justify-center gap-2"
                >
                  Schedule Appointment <ArrowRight size={16} />
                </a>
                <button
                  onClick={() => scrollTo("#contact-section")}
                  className="w-full text-center border border-[#c9a84c]/40 text-[#c9a84c] font-body font-semibold px-6 py-3.5 rounded-md transition-all duration-150 active:scale-95 inline-flex items-center justify-center gap-2"
                >
                  <Phone size={16} /> Contact Us
                </button>
              </div>
            </RevealSection>

            {/* Bio Column */}
            <RevealSection className="lg:col-span-3">
              <span className="inline-block font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4" style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c" }}>
                My Story
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f5f0e8] mb-2">
                Malik East
              </h2>
              <p className="font-body text-[#c9a84c] text-sm font-bold tracking-widest uppercase mb-6">
                Owner · 7Band Financial Agency
              </p>

              <div className="space-y-5 font-body text-[#e8d5a3]/70 leading-relaxed">
                <p>
                  Malik founded 7Band Financial Agency and 7Band Inc. in 2021 out of a desire to teach and help others. Coming from a musical past that inspired his company's name, he developed an appreciation for the way that life insurance can work in concert with the other pieces of a financial strategy to create a more complete financial symphony. Malik is passionate about helping create those symphonies that help others reach their financial goals using life insurance products.
                </p>
                <p>
                  He feels fortunate to be able to build long-term relationships with his clients, who become like family to him. The relationships are key as he encourages long-term thinking when it comes to insurance products, with a period of sowing and hard work before his clients can reap any potential benefits down the road. He loves the sense of community he feels with them, and his clients love his honesty and authenticity and know that he truly has their best interests at heart. Every time a client accomplishes one of their financial goals, it's music to Malik's ears.
                </p>
                <p>
                  Originally from Hattiesburg, Mississippi, Malik and his wife now make their home in Jackson. He loves creating content, traveling, and obtaining unique skillsets. Holding a bachelor's degree in computer networking and information technology, Malik is also a go-to independent tech contractor, working with 38 different tech service companies and providing solutions for businesses in the Jackson area. Malik and his wife are also active members of City Heart Church in Jackson.
                </p>
              </div>

              {/* Quote pull */}
              <blockquote className="mt-8 border-l-4 border-[#c9a84c] pl-6 py-2 italic font-display text-xl text-[#f5f0e8]">
                "Every time a client accomplishes one of their financial goals, it's music to my ears."
              </blockquote>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── VALUES / WHY WE DO THIS ──────────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "#0a0a0a" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <span className="inline-block font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-4" style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c" }}>
              What Drives Us
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#f5f0e8] mb-12">
              The heart behind 7Band
            </h2>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <RevealSection key={v.title}>
                <div
                  className="rounded-xl p-7 h-full hover:shadow-lg transition-shadow duration-300" style={{  background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.2)", transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 flex items-center justify-center text-[#c9a84c] mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#f5f0e8] mb-3">{v.title}</h3>
                  <p className="font-body text-[#e8d5a3]/70 text-sm leading-relaxed">{v.body}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECIRCULATION ────────────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-body text-sm text-[#e8d5a3]/50 mb-1">Ready to get started?</p>
                <p className="font-display text-xl font-bold text-[#f5f0e8]">
                  See what 7Band Financial Agency can do for your family.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 font-body text-[#f5f0e8] font-semibold border border-[#c9a84c]/40 text-[#c9a84c] px-6 py-3 rounded-md transition-all duration-150 active:scale-95"
                >
                  ← Back to Home
                </Link>
                <Link
                  href="/lifetime-loc"
                  className="inline-flex items-center gap-2 font-body text-white font-semibold bg-[#c9a84c] text-[#0a0a0a] px-6 py-3 rounded-md transition-all duration-150 active:scale-95"
                >
                  See the Lifetime LOC <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────── */}
      <section id="contact-section" className="py-24" style={{ backgroundColor: "#0f0f0f" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealSection>
            <span className="inline-block font-body text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-sm mb-6" style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c" }}>
              Get Started
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Stop funding their dreams. Start funding yours.
            </h2>
            <p className="font-body text-lg text-[#e8d5a3]/65 leading-relaxed mb-10 max-w-2xl mx-auto">
              No obligation, no chase-down calls afterward. We'll look at your situation honestly and tell you exactly what we think — whether that's a policy or something else entirely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/malikeast/15-minute-quick-meeting-phone-call-via-zoom"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#c9a84c] hover:bg-[#b8943e] text-white font-body font-semibold px-8 py-4 rounded-md transition-all duration-150 active:scale-95 text-base inline-flex items-center justify-center gap-2"
              >
                Schedule Appointment <ArrowRight size={18} />
              </a>
              <Link
                href="/"
                className="border-2 border-white/40 hover:border-white text-white font-body font-semibold px-8 py-4 rounded-md transition-all duration-150 active:scale-95 text-base inline-flex items-center justify-center gap-2"
              >
                ← Back to Home
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
