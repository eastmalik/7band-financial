import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Check, Mail, Menu, X } from "lucide-react";
import { BOOKING_URL, EVENT_LABEL, EVENT_URL } from "@/lib/links";
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

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2563eb]">
      <span className="h-px w-7 bg-[#b8892e]" /> {children}
    </div>
  );
}

export default function SimpleBook() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/lifetime-loc", label: "Lifetime LOC" },
    { href: "/game-map", label: "Roadmap" },
    { href: "/about", label: "About" },
    { href: "/the-book", label: "Book" },
  ];

  return (
    <div className="view-mode-enter min-h-screen overflow-x-hidden bg-[#f8fbff] font-body text-[#132945]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#dbe7f5] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="simple-logo-shield">
              <img src="/manus-storage/7band-logo-clean_7b539e21.png" alt="7Band Financial Agency" className="h-full w-full object-contain mix-blend-multiply" />
            </span>
            <span className="font-display text-sm font-black tracking-[0.03em] text-[#0b1f3a] sm:text-base">
              7Band <span className="text-[#2563eb]">Financial</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="font-tactical text-sm font-bold uppercase tracking-[0.1em] text-[#425b78] transition-colors hover:text-[#2563eb]">
                {item.label}
              </Link>
            ))}
            <a href={EVENT_URL} className="font-tactical text-sm font-bold uppercase tracking-[0.1em] text-[#425b78] transition-colors hover:text-[#2563eb]">
              {EVENT_LABEL}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="hidden bg-[#0b1f3a] px-4 py-3 font-tactical text-xs font-bold uppercase tracking-[0.13em] text-white transition-all hover:bg-[#2563eb] sm:inline-flex">
              Talk With Malik
            </a>
            <button type="button" onClick={() => setMenuOpen((c) => !c)} className="inline-flex p-2 text-[#0b1f3a] lg:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="border-t border-[#dbe7f5] bg-white px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            <div className="mx-auto flex max-w-7xl flex-col gap-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="font-tactical text-base font-bold uppercase tracking-[0.1em] text-[#26425f]">
                  {item.label}
                </Link>
              ))}
              <a href={EVENT_URL} className="font-tactical text-base font-bold uppercase tracking-[0.1em] text-[#26425f]">
                {EVENT_LABEL}
              </a>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-1 bg-[#0b1f3a] px-4 py-3 text-center font-tactical text-xs font-bold uppercase tracking-[0.13em] text-white">
                Schedule a Conversation
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section className="bg-[#edf5ff] px-5 pb-16 pt-36 sm:px-7 sm:pt-44">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="mx-auto w-full max-w-xs border border-[#dbe7f5] bg-white p-2 shadow-[0_14px_34px_rgba(11,31,58,0.1)] lg:mx-0">
            <img src={BOOK_COVER} alt={`${BOOK_TITLE} — book cover`} className="w-full object-contain" />
          </div>
          <div>
            <Kicker>Coming soon</Kicker>
            <h1 className="font-display text-4xl font-black leading-[1.05] text-[#0b1f3a] sm:text-6xl">
              The American <span className="text-[#2563eb]">Money Tree</span>
            </h1>
            <p className="mt-6 font-display text-xl font-bold leading-snug text-[#2563eb] sm:text-2xl">
              {BOOK_TAGLINE}
            </p>
            <p className="mt-4 max-w-2xl font-body text-lg leading-relaxed text-[#526b86]">
              {BOOK_SUBTITLE}
            </p>
            <p className="mt-4 font-tactical text-xs font-bold uppercase tracking-[0.12em] text-[#2563eb]">
              By {BOOK_AUTHOR} · {BOOK_STATUS}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={BOOK_NOTIFY_MAILTO} className="inline-flex items-center justify-center gap-2 bg-[#0b1f3a] px-6 py-4 font-tactical text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#2563eb]">
                <Mail size={16} /> Notify me at release
              </a>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-[#91a8c0] bg-white px-6 py-4 font-tactical text-sm font-bold uppercase tracking-[0.12em] text-[#0b1f3a] transition-colors hover:border-[#2563eb]">
                Talk with Malik <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PREMISE */}
      <section className="bg-white px-5 py-20 sm:px-7 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <Kicker>Why this book exists</Kicker>
          <h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-5xl">
            Written to be understood, not to sell you something.
          </h2>
          <p className="mx-auto mt-7 max-w-3xl font-body text-lg leading-relaxed text-[#526b86]">
            {BOOK_PITCH}
          </p>
          <blockquote className="mx-auto mt-10 max-w-3xl border-l-2 border-[#b8892e] py-1 pl-7 text-left">
            <p className="font-display text-xl font-bold leading-snug text-[#0b1f3a]">
              “Some people in this industry give this product a nickname and never tell you what it
              actually is. You end up three chapters in, excited about something, and you still
              don't know what you're buying. We're not doing that.”
            </p>
            <p className="mt-4 font-tactical text-xs font-bold uppercase tracking-[0.12em] text-[#2563eb]">
              — Opening page
            </p>
          </blockquote>
        </div>
      </section>

      {/* CHAPTERS */}
      <section className="bg-[#f2f7fc] px-5 py-20 sm:px-7 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <Kicker>Ten chapters · plus a full glossary</Kicker>
            <h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-5xl">
              What's inside
            </h2>
            <p className="mt-5 font-body text-lg leading-relaxed text-[#526b86]">
              Structured like a real owner's manual — including the troubleshooting chapter most
              books in this category leave out.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {BOOK_CHAPTERS.map((c) => (
              <div key={c.n} className="border border-[#dbe7f5] bg-white p-7 shadow-[0_14px_34px_rgba(11,31,58,0.06)]">
                <span className="font-tactical text-xs font-bold tracking-[0.14em] text-[#2563eb]">
                  Chapter {c.n}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-[#0b1f3a]">{c.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-[#526b86]">{c.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIT TEST */}
      <section className="bg-white px-5 py-20 sm:px-7 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <Kicker>Chapter 2 — straight from the book</Kicker>
            <h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-5xl">
              Including when the answer is no
            </h2>
            <p className="mt-5 font-body text-lg leading-relaxed text-[#526b86]">
              “Nobody puts a lawnmower engine in a sedan.” A real manual tells you what a product
              is for — and what it isn't.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="border border-[#dbe7f5] bg-[#f8fbff] p-7">
              <div className="flex items-center gap-2">
                <Check size={18} className="text-[#2563eb]" />
                <h3 className="font-tactical text-sm font-bold uppercase tracking-[0.12em] text-[#2563eb]">Tends to fit when</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {BOOK_GOOD_FIT.map((t) => (
                  <li key={t} className="flex gap-3 font-body text-sm leading-relaxed text-[#425b78]">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2563eb]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#e4c9c9] bg-[#fdf6f6] p-7">
              <div className="flex items-center gap-2">
                <X size={18} className="text-[#b4443c]" />
                <h3 className="font-tactical text-sm font-bold uppercase tracking-[0.12em] text-[#b4443c]">Tends not to fit when</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {BOOK_POOR_FIT.map((t) => (
                  <li key={t} className="flex gap-3 font-body text-sm leading-relaxed text-[#425b78]">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#b4443c]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 10 */}
      <section className="bg-[#0b1f3a] px-5 py-20 text-white sm:px-7 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#9bc4ff]">
            <span className="h-px w-7 bg-[#b8892e]" /> Chapter 10
          </div>
          <h2 className="font-display text-3xl font-black leading-tight sm:text-5xl">
            How your agent is paid
          </h2>
          <p className="mx-auto mt-7 max-w-3xl font-body text-lg leading-relaxed text-white/75">
            “Most manuals don't have this chapter. This one does, because you cannot evaluate
            advice without knowing how the person giving it is compensated.”
          </p>
          <p className="mx-auto mt-5 max-w-3xl font-body leading-relaxed text-white/60">
            The book explains why a policy designed for cash accumulation typically pays the agent
            less than the alternative — and tells readers to ask any agent, including the author,
            that question directly.
          </p>
        </div>
      </section>

      {/* AUTHOR */}
      <section className="bg-white px-5 py-20 sm:px-7 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:items-center">
          <div className="mx-auto w-full max-w-[260px] border border-[#dbe7f5] p-2 shadow-[0_14px_34px_rgba(11,31,58,0.07)] lg:mx-0">
            <img src="/manus-storage/malik-east-portrait_1eb03c6e.jpeg" alt="Malik East" className="aspect-[4/5] w-full object-cover" style={{ objectPosition: "center 26%" }} />
          </div>
          <div>
            <Kicker>The author</Kicker>
            <h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-4xl">Malik East</h2>
            <p className="mt-2 font-tactical text-xs font-bold uppercase tracking-[0.12em] text-[#2563eb]">
              The Flow · Founder, 7Band Financial Agency · Licensed Life Insurance Agent
            </p>
            <div className="mt-7 space-y-5 font-body text-lg leading-relaxed text-[#526b86]">
              <p>
                Malik East founded 7Band Financial Agency on a simple standard: people deserve to
                understand the products and strategies that affect their family before anyone asks
                them to make a decision.
              </p>
              <p>
                His story started in 7th grade with a saxophone. Music taught him timing, rhythm,
                and harmony — the same principles that now shape how he explains financial
                decisions.
              </p>
            </div>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 border border-[#91a8c0] bg-white px-6 py-4 font-tactical text-sm font-bold uppercase tracking-[0.12em] text-[#0b1f3a] hover:border-[#2563eb]">
              Read the full profile <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* NOTIFY */}
      <section className="bg-[#edf5ff] px-5 py-20 sm:px-7 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <BookOpen size={30} className="mx-auto text-[#2563eb]" />
          <h2 className="mt-6 font-display text-3xl font-black text-[#0b1f3a] sm:text-5xl">
            Be first to read it
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-[#526b86]">
            The manuscript is in final review. Leave your name and you'll hear the day it's
            released — no other mail, and nothing sold to you in the meantime.
          </p>
          <a href={BOOK_NOTIFY_MAILTO} className="mt-8 inline-flex items-center justify-center gap-2 bg-[#0b1f3a] px-8 py-5 font-tactical text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#2563eb]">
            <Mail size={16} /> Notify me at release
          </a>
        </div>
      </section>

      {/* DISCLOSURE */}
      <section className="border-t border-[#dbe7f5] bg-white px-5 py-12 sm:px-7">
        <div className="mx-auto max-w-4xl">
          <div className="font-tactical text-xs font-bold uppercase tracking-[0.12em] text-[#526b86]">
            Important disclosure
          </div>
          <p className="mt-3 font-body text-[13px] leading-relaxed text-[#7b90a8]">
            {BOOK_DISCLOSURE}
          </p>
        </div>
      </section>
    </div>
  );
}
