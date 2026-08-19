/*
 * SIMPLE VIEW DESIGN REMINDER
 * Calm financial-editorial experience: navy #0B1F3A, mineral blue #2563EB,
 * sky #EAF3FF, understated brass #B8892E. Same strategy, delivered plainly.
 */
import { ArrowRight, BadgeCheck, HeartHandshake, Sparkles } from "lucide-react";
import { Link } from "wouter";

const calendlyUrl = "https://api.leadconnectorhq.com/widget/booking/kclfxyrhhmxucq9DWuZq";
const portraitUrl = "/manus-storage/malik-east-portrait_1eb03c6e.jpeg";

function SevenPointMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
      {Array.from({ length: 7 }, (_, index) => <line key={index} x1="32" y1="5" x2="32" y2="17" stroke="currentColor" strokeWidth="1.5" transform={`rotate(${index * (360 / 7)} 32 32)`} />)}
    </svg>
  );
}

export default function SimpleAboutReplacement() {
  const values = [
    { icon: <BadgeCheck size={25} />, title: "Licensed perspective", body: "Malik has been a licensed life insurance agent since 2020, providing informed conversations about protection and policy options." },
    { icon: <Sparkles size={25} />, title: "Systems-minded clarity", body: "With a B.S. in Computer Networking and Information Technology from Alcorn State University, Malik explains complex ideas as connected decisions — not isolated products." },
    { icon: <HeartHandshake size={25} />, title: "People first", body: "Alongside his wife, Mickala, he keeps the process rooted in readiness, honest questions, and practical next steps." },
  ];

  return (
    <div className="view-mode-enter min-h-screen overflow-x-hidden bg-[#f8fbff] font-body text-[#132945]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#dbe7f5] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-8">
          <Link href="/" className="flex items-center gap-3"><span className="simple-logo-shield"><img src="/manus-storage/7band-logo-clean_7b539e21.png" alt="7Band Financial Agency" className="h-full w-full object-contain mix-blend-multiply" /></span><span className="font-display text-sm font-black tracking-[0.03em] text-[#0b1f3a] sm:text-base">7Band <span className="text-[#2563eb]">Financial</span></span></Link>
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation"><Link href="/" className="font-tactical text-sm font-bold uppercase tracking-[0.1em] text-[#425b78] hover:text-[#2563eb]">Home</Link><Link href="/lifetime-loc" className="font-tactical text-sm font-bold uppercase tracking-[0.1em] text-[#425b78] hover:text-[#2563eb]">Lifetime LOC</Link><Link href="/game-map" className="font-tactical text-sm font-bold uppercase tracking-[0.1em] text-[#425b78] hover:text-[#2563eb]">Roadmap</Link></nav>
          <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="bg-[#0b1f3a] px-4 py-3 font-tactical text-xs font-bold uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#2563eb]">Talk with Malik</a>
        </div>
      </header>
      <section className="relative overflow-hidden bg-[#edf5ff] px-5 pb-16 pt-36 sm:px-7 sm:pt-44"><SevenPointMark className="absolute right-[13%] top-28 h-24 w-24 text-[#b8892e]/40 sm:h-32 sm:w-32" /><div className="relative mx-auto max-w-7xl"><div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2563eb]"><span className="h-px w-7 bg-[#b8892e]" /> About 7Band Financial Agency</div><h1 className="max-w-4xl font-display text-4xl font-black leading-[1.05] text-[#0b1f3a] sm:text-6xl">From the band room to <span className="text-[#2563eb]">Financial Services.</span></h1></div></section>
      <section className="bg-white px-5 py-20 sm:px-7 lg:py-28"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start"><div className="border border-[#dbe7f5] p-2 shadow-[0_14px_34px_rgba(11,31,58,0.07)]"><img src={portraitUrl} alt="Malik East, founder of 7Band Financial Agency" className="aspect-[4/5] w-full object-cover" style={{ objectPosition: "center 26%" }} /><div className="p-5"><p className="font-display text-xl font-bold text-[#0b1f3a]">Malik East</p><p className="mt-1 font-tactical text-xs font-bold uppercase tracking-[0.12em] text-[#2563eb]">The Flow · Founder · Licensed Life Insurance Agent</p></div></div><div><div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2563eb]"><span className="h-px w-7 bg-[#b8892e]" /> Meet Malik</div><h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-5xl">A guide who makes the moving pieces make sense.</h2><div className="mt-7 space-y-5 font-body text-lg leading-relaxed text-[#526b86]"><p>Malik East, Co-Creator of The Flow, is the founder of 7Band Financial Agency and a licensed life insurance agent since 2020. He earned a B.S. in Computer Networking and Information Technology from Alcorn State University in 2019, bringing a systems-minded perspective to financial education.</p><p>His story began in 7th grade, where he began learning the saxophone. Music taught him about timing, rhythm, and harmony. The same principles he learned back then now guide his work in the financial services industry, which became 7Band Inc. and 7Band Financial Agency.</p><p>Alongside his wife, Mickala, who manages client screenings, Malik helps people prepare for conversations about credit, protection, and long-term planning. His standard is simple: understand the whole picture before you decide whether a policy or strategy belongs in it.</p></div><blockquote className="mt-8 border-l-2 border-[#b8892e] pl-6 py-1 font-display text-xl font-bold leading-snug text-[#0b1f3a]">“Every time a client reaches a financial goal, it’s music to my ears.”</blockquote><a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 bg-[#0b1f3a] px-6 py-4 font-tactical text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-[#2563eb]">Schedule a conversation <ArrowRight size={16} /></a></div></div></section>
      <section className="bg-[#f2f7fc] px-5 py-20 sm:px-7 lg:py-28"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2563eb]"><span className="h-px w-7 bg-[#b8892e]" /> What you can expect</div><h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-5xl">A people-first financial conversation.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-3">{values.map((item) => <div key={item.title} className="border border-[#dbe7f5] bg-white p-7 shadow-[0_14px_34px_rgba(11,31,58,0.07)]"><div className="text-[#2563eb]">{item.icon}</div><h3 className="mt-6 font-display text-xl font-bold text-[#0b1f3a]">{item.title}</h3><p className="mt-3 font-body text-sm leading-relaxed text-[#526b86]">{item.body}</p></div>)}</div></div></section>
      <footer className="border-t border-[#d7e3f0] bg-[#0b1f3a] px-5 py-10 font-tactical text-xs leading-relaxed tracking-wide text-white/45 sm:px-7">© {new Date().getFullYear()} 7Band Financial Agency. Licensed life insurance agent. Content is educational only and is not financial, legal, or tax advice.</footer>
    </div>
  );
}
