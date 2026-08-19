/*
 * SIMPLE VIEW DESIGN REMINDER
 * Calm financial-editorial experience: navy #0B1F3A, mineral blue #2563EB,
 * sky #EAF3FF, understated brass #B8892E. Same strategy, delivered plainly.
 */
import { Link } from "wouter";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  HeartHandshake,
  Landmark,
  Lightbulb,
  Menu,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

const calendlyUrl = "https://calendly.com/malikeast7band";
const logoUrl = "/manus-storage/7band-logo-clean_7b539e21.png";

function SimpleKicker({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#2563eb]">
      <span className="h-px w-7 bg-[#b8892e]" />
      {children}
    </div>
  );
}

function SimpleCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`border border-[#dbe7f5] bg-white shadow-[0_14px_34px_rgba(11,31,58,0.07)] ${className}`}>{children}</div>;
}

function SimpleSection({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`relative px-5 py-20 sm:px-7 lg:py-28 ${className}`}>{children}</section>;
}

function SevenPointMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={`seven-point-mark ${className}`}>
      <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
      {Array.from({ length: 7 }, (_, index) => (
        <line key={index} x1="32" y1="5" x2="32" y2="17" stroke="currentColor" strokeWidth="1.5" transform={`rotate(${index * (360 / 7)} 32 32)`} />
      ))}
    </svg>
  );
}

function SimpleLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/lifetime-loc", label: "Lifetime LOC" },
    { href: "/game-map", label: "Roadmap" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="view-mode-enter min-h-screen overflow-x-hidden bg-[#f8fbff] font-body text-[#132945]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#dbe7f5] bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-8">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="simple-logo-shield"><img src={logoUrl} alt="7Band Financial Agency" className="h-full w-full object-contain mix-blend-multiply" /></span>
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
          </nav>

          <div className="flex items-center gap-3">
            <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="hidden bg-[#0b1f3a] px-4 py-3 font-tactical text-xs font-bold uppercase tracking-[0.13em] text-white transition-all hover:bg-[#2563eb] active:scale-[0.97] sm:inline-flex">
              Talk With Malik
            </a>
            <button type="button" onClick={() => setMenuOpen((current) => !current)} className="inline-flex p-2 text-[#0b1f3a] lg:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen}>
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
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="mt-1 bg-[#0b1f3a] px-4 py-3 text-center font-tactical text-xs font-bold uppercase tracking-[0.13em] text-white">
                Schedule a Conversation
              </a>
            </div>
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="border-t border-[#d7e3f0] bg-[#0b1f3a] px-5 py-14 text-white sm:px-7">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="simple-logo-shield"><img src={logoUrl} alt="7Band Financial Agency" className="h-full w-full object-contain mix-blend-multiply" /></span>
              <span className="font-display text-sm font-bold">7Band Financial Agency</span>
            </div>
            <p className="max-w-sm font-tactical text-sm leading-relaxed tracking-wide text-white/70">A clear, people-first approach to credit education, life insurance, and long-term financial strategy.</p>
          </div>
          <div>
            <p className="mb-4 font-tactical text-xs font-bold uppercase tracking-[0.15em] text-[#8eb8ff]">Explore</p>
            <div className="flex flex-col gap-2.5 font-tactical text-sm text-white/70">
              <Link href="/lifetime-loc" className="hover:text-white">Lifetime LOC</Link>
              <Link href="/game-map" className="hover:text-white">Financial Roadmap</Link>
              <Link href="/about" className="hover:text-white">About Malik East</Link>
            </div>
          </div>
          <div>
            <p className="mb-4 font-tactical text-xs font-bold uppercase tracking-[0.15em] text-[#8eb8ff]">Ecosystem</p>
            <div className="flex flex-col gap-2.5 font-tactical text-sm text-white/70">
              <a href="https://7bandinc.org" target="_blank" rel="noopener noreferrer" className="hover:text-white">7Band Inc.</a>
              <a href="https://www.arisecreditpro.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Arise Credit Pro</a>
              <a href="https://www.skool.com/the-real-ethical-agents-4233" target="_blank" rel="noopener noreferrer" className="hover:text-white">The Real Ethical Agents</a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 font-tactical text-xs leading-relaxed tracking-wide text-white/45">
          © {new Date().getFullYear()} 7Band Financial Agency. Licensed life insurance agent. Content is educational only and is not financial, legal, or tax advice. Policy benefits, costs, and availability depend on the specific policy and individual circumstances.
        </div>
      </footer>
    </div>
  );
}

export function SimpleHome() {
  return (
    <SimpleLayout>
      <section className="relative overflow-hidden bg-[#edf5ff] px-5 pb-20 pt-36 sm:px-7 sm:pt-44 lg:pb-28">
        <div className="absolute right-0 top-0 h-full w-[46%] bg-[linear-gradient(135deg,transparent_0%,rgba(37,99,235,0.08)_55%,rgba(184,137,46,0.12)_100%)]" />
        <SevenPointMark className="absolute right-[9%] top-28 h-28 w-28 text-[#2563eb]/15 sm:h-40 sm:w-40" />
        <div className="absolute bottom-0 left-[8%] h-px w-3/4 bg-gradient-to-r from-transparent via-[#b8892e]/55 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <SimpleKicker>Financial clarity for real life</SimpleKicker>
            <h1 className="font-display text-4xl font-black leading-[1.05] text-[#0b1f3a] sm:text-6xl lg:text-7xl">Build a financial life you can <span className="text-[#2563eb]">understand.</span></h1>
            <p className="mt-7 max-w-2xl font-body text-lg leading-relaxed text-[#425b78] sm:text-xl">7Band Financial Agency helps you strengthen your foundation, explore protection strategies, and make decisions with a clearer picture of where you are and where you want to go.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0b1f3a] px-6 py-4 font-tactical text-sm font-bold uppercase tracking-[0.12em] text-white transition-all hover:bg-[#2563eb] active:scale-[0.97]">Schedule a conversation <ArrowRight size={16} /></a>
              <Link href="/lifetime-loc" className="inline-flex items-center justify-center gap-2 border border-[#91a8c0] bg-white px-6 py-4 font-tactical text-sm font-bold uppercase tracking-[0.12em] text-[#0b1f3a] transition-all hover:border-[#2563eb] hover:text-[#2563eb] active:scale-[0.97]">Explore Lifetime LOC <ChevronRight size={16} /></Link>
            </div>
            <p className="mt-6 font-tactical text-xs uppercase tracking-[0.11em] text-[#647b95]">Licensed guidance · No pressure · Your questions first</p>
          </div>
          <SimpleCard className="relative overflow-hidden p-7 sm:p-9">
            <div className="absolute left-0 top-0 h-1 w-full bg-[#b8892e]" />
            <p className="font-tactical text-xs font-bold uppercase tracking-[0.15em] text-[#2563eb]">The 7Band perspective</p>
            <p className="mt-5 font-display text-2xl font-bold leading-snug text-[#0b1f3a]">“Stop funding their dreams. Start funding yours.”</p>
            <div className="my-7 h-px bg-[#dbe7f5]" />
            <p className="font-body text-sm leading-relaxed text-[#526b86]">The point is not to chase a one-size-fits-all product. It is to learn how credit, protection, access to capital, and long-term planning may fit together in a way that serves your household.</p>
          </SimpleCard>
        </div>
      </section>

      <SimpleSection id="services" className="bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <SimpleKicker>Start with what matters now</SimpleKicker>
            <h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-5xl">Two focused ways to move forward.</h2>
            <p className="mt-5 font-body text-lg leading-relaxed text-[#526b86]">You do not need an overloaded playbook. Begin with the part of your financial life that needs attention today.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <SimpleCard className="group p-7 sm:p-9">
              <CreditCard className="text-[#2563eb]" size={29} strokeWidth={1.7} />
              <h3 className="mt-8 font-display text-2xl font-bold text-[#0b1f3a]">Credit Education & Restoration</h3>
              <p className="mt-4 font-body leading-relaxed text-[#526b86]">Understand the factors that shape your credit profile, identify the steps within your control, and build a practical plan to improve your financial readiness.</p>
              <div className="mt-7 flex items-center gap-2 font-tactical text-sm font-bold uppercase tracking-[0.1em] text-[#2563eb]"><CheckCircle2 size={16} /> Start with the foundation</div>
            </SimpleCard>
            <SimpleCard className="group border-t-4 border-t-[#b8892e] p-7 sm:p-9">
              <HeartHandshake className="text-[#b8892e]" size={30} strokeWidth={1.7} />
              <h3 className="mt-8 font-display text-2xl font-bold text-[#0b1f3a]">Life Insurance & Lifetime LOC</h3>
              <p className="mt-4 font-body leading-relaxed text-[#526b86]">Explore whether permanent life insurance and cash-value strategies align with your protection needs, timeline, budget, and broader financial goals.</p>
              <Link href="/lifetime-loc" className="mt-7 inline-flex items-center gap-2 font-tactical text-sm font-bold uppercase tracking-[0.1em] text-[#2563eb] transition-colors hover:text-[#0b1f3a]">Learn about Lifetime LOC <ArrowRight size={16} /></Link>
            </SimpleCard>
          </div>
        </div>
      </SimpleSection>

      <SimpleSection className="overflow-hidden bg-[#0b1f3a]">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SimpleKicker>Your financial roadmap</SimpleKicker>
            <h2 className="font-display text-3xl font-black leading-tight text-white sm:text-5xl">A simple sequence. A clearer next step.</h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-white/70">A well-built financial life is not an overnight transformation. It is a series of informed decisions, made in the right order and reviewed as your circumstances change.</p>
            <Link href="/game-map" className="mt-8 inline-flex items-center gap-2 border border-white/35 px-5 py-3 font-tactical text-sm font-bold uppercase tracking-[0.12em] text-white transition-all hover:border-white hover:bg-white hover:text-[#0b1f3a]">View the roadmap <ArrowRight size={16} /></Link>
          </div>
          <div className="grid gap-px overflow-hidden border border-white/15 bg-white/15 sm:grid-cols-3">
            {[
              { number: "01", title: "Strengthen", body: "Take an honest look at credit, cash flow, and the foundation beneath your next move.", icon: <Target size={20} /> },
              { number: "02", title: "Structure", body: "Learn how personal, business, and protection decisions can be kept intentional and organized.", icon: <Building2 size={20} /> },
              { number: "03", title: "Protect", body: "Review life insurance and legacy strategies through the lens of your family’s real needs.", icon: <ShieldCheck size={20} /> },
            ].map((item) => (
              <div key={item.number} className="bg-[#102b4f] p-7">
                <div className="flex items-center justify-between text-[#9bc4ff]">{item.icon}<span className="font-tactical text-xs font-bold tracking-[0.14em]">{item.number}</span></div>
                <h3 className="mt-8 font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-white/65">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </SimpleSection>

      <SimpleSection className="bg-[#f8fbff]">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SimpleKicker>Meet your guide</SimpleKicker>
            <h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-5xl">The whole picture before the policy.</h2>
            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-[#526b86]">Malik East brings a systems-minded and people-first approach to each conversation. The goal is to make sure you understand the options, costs, trade-offs, and the role a product may — or may not — play in your plan.</p>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 font-tactical text-sm font-bold uppercase tracking-[0.1em] text-[#2563eb] hover:text-[#0b1f3a]">Meet Malik East <ArrowRight size={16} /></Link>
          </div>
          <SimpleCard className="p-7 sm:p-9">
            <ClipboardCheck className="text-[#2563eb]" size={28} strokeWidth={1.6} />
            <p className="mt-6 font-display text-xl font-bold leading-snug text-[#0b1f3a]">A good financial conversation should leave you with more clarity, not more pressure.</p>
            <p className="mt-4 font-body text-sm leading-relaxed text-[#526b86]">That means questions are welcome, recommendations are individualized, and the decision stays yours.</p>
          </SimpleCard>
        </div>
      </SimpleSection>

      <SimpleSection className="bg-white">
        <div className="mx-auto max-w-4xl text-center">
          <SimpleKicker>Ready when you are</SimpleKicker>
          <h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-5xl">Let’s talk about the next right step.</h2>
          <p className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-[#526b86]">Bring your questions, your current reality, and the goals you are working toward. We will start there.</p>
          <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 bg-[#2563eb] px-7 py-4 font-tactical text-sm font-bold uppercase tracking-[0.12em] text-white transition-all hover:bg-[#0b1f3a] active:scale-[0.97]">Schedule a conversation <ArrowRight size={16} /></a>
        </div>
      </SimpleSection>
    </SimpleLayout>
  );
}

const lessonDetails = {
  "/lesson-1": {
    number: "01", title: "Uninterrupted Compounding", subtitle: "How cash value, policy loans, and collateral are commonly discussed in a permanent life insurance strategy.", points: ["A policy loan is different from a withdrawal, but it comes with terms and interest.", "The cash-value and loan-crediting mechanics depend on the specific policy design.", "Unpaid loans can reduce cash value and death benefit, so monitoring matters."],
  },
  "/lesson-2": {
    number: "02", title: "Design Decides Everything", subtitle: "Why policy structure, funding strategy, and suitability deserve more than a quick sales conversation.", points: ["Life insurance designs are not interchangeable; costs and features vary.", "Funding levels and riders should be discussed in context of a client’s goals and budget.", "A licensed review should explain trade-offs before an application is submitted."],
  },
  "/lesson-3": {
    number: "03", title: "Using the Line", subtitle: "What it means to compare a policy loan with other sources of capital.", points: ["A policy loan may be one option among many; it is not automatically the right source of funds.", "Loan interest and repayment choices affect the policy’s long-term performance.", "The right decision depends on purpose, cost, risk tolerance, timing, and available alternatives."],
  },
  "/lesson-4": {
    number: "04", title: "Honest Answers", subtitle: "The questions every person should ask before deciding whether an IUL strategy fits.", points: ["Life insurance is designed first for protection; any cash-value use should be evaluated carefully.", "Fees, caps, participation rates, loans, and policy requirements need to be understood.", "If a strategy does not fit your circumstances, an honest conversation should say so."],
  },
};

export function SimpleLifetimeLOC() {
  const manualCards = Object.entries(lessonDetails);
  return (
    <SimpleLayout>
      <section className="relative overflow-hidden bg-[#edf5ff] px-5 pb-20 pt-36 sm:px-7 sm:pt-44">
        <div className="absolute right-[8%] top-20 h-72 w-72 rounded-full border border-[#2563eb]/15" />
        <SevenPointMark className="absolute right-[12%] top-28 h-24 w-24 text-[#b8892e]/35 sm:h-32 sm:w-32" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <SimpleKicker>Permanent life insurance education</SimpleKicker>
            <h1 className="font-display text-4xl font-black leading-[1.05] text-[#0b1f3a] sm:text-6xl">Understanding the <span className="text-[#2563eb]">Lifetime LOC.</span></h1>
            <p className="mt-7 max-w-2xl font-body text-lg leading-relaxed text-[#425b78]">The Lifetime LOC is a way some people use policy loans from a permanent life insurance policy as part of a broader financial strategy. It is not a product in itself, and it deserves a careful, individualized discussion.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0b1f3a] px-6 py-4 font-tactical text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#2563eb]">Talk through your questions <ArrowRight size={16} /></a><a href="#manual" className="inline-flex items-center justify-center gap-2 border border-[#91a8c0] bg-white px-6 py-4 font-tactical text-sm font-bold uppercase tracking-[0.12em] text-[#0b1f3a] hover:border-[#2563eb]">Read the lessons <ChevronRight size={16} /></a></div>
          </div>
          <SimpleCard className="p-7 sm:p-8">
            <p className="font-tactical text-xs font-bold uppercase tracking-[0.14em] text-[#2563eb]">A responsible starting point</p>
            <p className="mt-5 font-display text-2xl font-bold leading-snug text-[#0b1f3a]">Protection needs come first. Strategy comes after suitability.</p>
            <p className="mt-5 font-body text-sm leading-relaxed text-[#526b86]">Policy loans accrue interest. They can reduce policy values and death benefits if not managed. Actual outcomes depend on the policy, funding, loans, performance, and your circumstances.</p>
          </SimpleCard>
        </div>
      </section>

      <SimpleSection className="bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl"><SimpleKicker>The plain-language version</SimpleKicker><h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-5xl">What this strategy is trying to do.</h2></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: <ShieldCheck size={25} />, title: "Protect", body: "Permanent life insurance may provide lifelong coverage when it is properly funded and kept in force." },
              { icon: <TrendingUp size={25} />, title: "Build value", body: "Some policies can build cash value over time under their specific terms and crediting methods." },
              { icon: <Landmark size={25} />, title: "Create options", body: "Depending on the policy, policy loans may offer a source of liquidity that should be compared with other options." },
            ].map((item) => <SimpleCard key={item.title} className="p-7"><div className="text-[#2563eb]">{item.icon}</div><h3 className="mt-6 font-display text-xl font-bold text-[#0b1f3a]">{item.title}</h3><p className="mt-3 font-body text-sm leading-relaxed text-[#526b86]">{item.body}</p></SimpleCard>)}
          </div>
        </div>
      </SimpleSection>

      <SimpleSection className="bg-[#f2f7fc]">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div><SimpleKicker>Questions worth asking</SimpleKicker><h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-5xl">Clarity before commitment.</h2><p className="mt-6 font-body text-lg leading-relaxed text-[#526b86]">A useful conversation is not about convincing someone to buy a policy. It is about examining whether the structure, cost, protection need, timeline, and access features make sense together.</p></div>
          <div className="space-y-4">
            {["What is the policy designed to do first: provide protection, build cash value, or both?", "How do premiums, charges, indexed crediting, and loan interest work in this specific policy?", "What happens if I reduce contributions, borrow, or cannot keep funding the policy as planned?", "What alternatives should I compare before deciding?"].map((question, index) => <div key={question} className="flex gap-5 border-b border-[#d3e0ee] pb-5"><span className="font-tactical text-sm font-bold text-[#b8892e]">0{index + 1}</span><p className="font-body text-base leading-relaxed text-[#24405d]">{question}</p></div>)}
          </div>
        </div>
      </SimpleSection>

      <SimpleSection id="manual" className="bg-white">
        <div className="mx-auto max-w-7xl"><div className="max-w-2xl"><SimpleKicker>The manual</SimpleKicker><h2 className="font-display text-3xl font-black text-[#0b1f3a] sm:text-5xl">Four short lessons. No hype.</h2><p className="mt-5 font-body text-lg leading-relaxed text-[#526b86]">Read the core questions behind the Lifetime LOC discussion in plain language.</p></div><div className="mt-12 grid gap-5 md:grid-cols-2">{manualCards.map(([href, lesson]) => <Link key={href} href={href} className="group border border-[#dbe7f5] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[#2563eb] hover:shadow-[0_16px_35px_rgba(11,31,58,0.1)]"><span className="font-tactical text-xs font-bold tracking-[0.14em] text-[#2563eb]">LESSON {lesson.number}</span><h3 className="mt-5 font-display text-xl font-bold text-[#0b1f3a]">{lesson.title}</h3><p className="mt-3 font-body text-sm leading-relaxed text-[#526b86]">{lesson.subtitle}</p><span className="mt-6 inline-flex items-center gap-2 font-tactical text-sm font-bold uppercase tracking-[0.1em] text-[#2563eb]">Read lesson <ArrowRight size={15} /></span></Link>)}</div></div>
      </SimpleSection>
    </SimpleLayout>
  );
}

export function SimpleGameMap() {
  const phases = [
    { number: "01", label: "Assess", title: "Know the starting point.", body: "Look clearly at credit, cash flow, insurance needs, and the goals behind your next financial decision.", icon: <Target size={24} /> },
    { number: "02", label: "Build", title: "Make intentional moves.", body: "Strengthen the habits, organization, and decision-making process that support long-term progress.", icon: <Lightbulb size={24} /> },
    { number: "03", label: "Protect", title: "Prepare for what continues.", body: "Consider coverage, beneficiaries, and strategies that help your family carry forward what you build.", icon: <HeartHandshake size={24} /> },
  ];
  return <SimpleLayout><section className="relative overflow-hidden bg-[#0b1f3a] px-5 pb-20 pt-36 text-white sm:px-7 sm:pt-44"><div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_20%,rgba(37,99,235,0.45),transparent_28%)]" /><SevenPointMark className="absolute right-[12%] top-28 h-24 w-24 text-[#b8892e]/65 sm:h-36 sm:w-36" /><div className="relative mx-auto max-w-5xl text-center"><SimpleKicker>Your Financial Roadmap</SimpleKicker><h1 className="font-display text-4xl font-black leading-[1.05] sm:text-6xl">A plan becomes useful when you know <span className="text-[#9bc4ff]">your next move.</span></h1><p className="mx-auto mt-7 max-w-3xl font-body text-lg leading-relaxed text-white/70">The 7Band approach is about education, sequence, and honest conversations — not trying to solve every part of life in one sitting.</p></div></section><SimpleSection className="bg-[#f8fbff]"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><SimpleKicker>Three conversations</SimpleKicker><h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-5xl">A clearer way to see the bigger picture.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-3">{phases.map((phase) => <SimpleCard key={phase.number} className="p-7"><div className="flex items-center justify-between"><span className="font-tactical text-xs font-bold tracking-[0.14em] text-[#2563eb]">{phase.number} / {phase.label}</span><span className="text-[#b8892e]">{phase.icon}</span></div><h3 className="mt-8 font-display text-2xl font-bold text-[#0b1f3a]">{phase.title}</h3><p className="mt-4 font-body leading-relaxed text-[#526b86]">{phase.body}</p></SimpleCard>)}</div></div></SimpleSection><SimpleSection className="bg-white"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><SimpleKicker>Where 7Band can help</SimpleKicker><h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-5xl">Keep the focus on the next right decision.</h2><p className="mt-6 font-body text-lg leading-relaxed text-[#526b86]">For many people, that begins by improving their credit foundation or taking a closer look at life insurance and cash-value strategies. The larger roadmap remains useful, but the next move matters most.</p></div><div className="border-l-2 border-[#b8892e] pl-7"><p className="font-display text-2xl font-bold leading-snug text-[#0b1f3a]">“Imagine sitting down with someone who gives you the game — not a shortcut, but the rules, the choices, and the questions to ask next.”</p><p className="mt-6 font-body leading-relaxed text-[#526b86]">Credit. Structure. Access to capital. Protection. Ownership. The outcome is not a promise; it is more agency in the decisions that shape your future.</p></div></div></SimpleSection><SimpleSection className="bg-[#edf5ff]"><div className="mx-auto max-w-4xl text-center"><SimpleKicker>Choose your starting point</SimpleKicker><h2 className="font-display text-3xl font-black text-[#0b1f3a] sm:text-5xl">You do not have to do everything at once.</h2><p className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-[#526b86]">Start with the area that has the most impact on your life right now. We will help you get clear on the rest.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0b1f3a] px-6 py-4 font-tactical text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-[#2563eb]">Talk through the roadmap <ArrowRight size={16} /></a><Link href="/lifetime-loc" className="inline-flex items-center justify-center gap-2 border border-[#91a8c0] bg-white px-6 py-4 font-tactical text-sm font-bold uppercase tracking-[0.12em] text-[#0b1f3a]">Explore Lifetime LOC <ArrowRight size={16} /></Link></div></div></SimpleSection></SimpleLayout>;
}

function LegacySimpleAbout() {
  return <SimpleLayout><section className="relative overflow-hidden bg-[#edf5ff] px-5 pb-16 pt-36 sm:px-7 sm:pt-44"><SevenPointMark className="absolute right-[13%] top-28 h-24 w-24 text-[#b8892e]/40 sm:h-32 sm:w-32" /><div className="relative mx-auto max-w-7xl"><SimpleKicker>About 7Band Financial Agency</SimpleKicker><h1 className="max-w-4xl font-display text-4xl font-black leading-[1.05] text-[#0b1f3a] sm:text-6xl">A conversation built around <span className="text-[#2563eb]">the whole picture.</span></h1></div></section><SimpleSection className="bg-white"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start"><div className="border border-[#dbe7f5] p-2"><img src="/manus-storage/malik-east-profile_3cae5a2a.jpg" alt="Malik East, founder of 7Band Financial Agency" className="w-full object-cover" /><div className="p-5"><p className="font-display text-xl font-bold text-[#0b1f3a]">Malik East</p><p className="mt-1 font-tactical text-xs font-bold uppercase tracking-[0.12em] text-[#2563eb]">Founder · Licensed Life Insurance Agent</p></div></div><div><SimpleKicker>Meet Malik</SimpleKicker><h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-5xl">Clear explanations. Long-term perspective.</h2><div className="mt-7 space-y-5 font-body text-lg leading-relaxed text-[#526b86]"><p>Malik East is the founder and owner of 7Band Financial Agency. His work is rooted in a simple belief: people deserve to understand the products and strategies that affect their family before they are asked to make a decision.</p><p>His approach is the whole picture before the policy. That means discussing how a product works, what it costs, what can change, and where it may or may not fit in a broader plan.</p><p>The name 7Band comes from music — the idea that each instrument has a role and the full composition works better when every part is intentional. That is how Malik approaches financial conversations: listen first, then help organize the next move.</p></div><a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 bg-[#0b1f3a] px-6 py-4 font-tactical text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-[#2563eb]">Schedule a conversation <ArrowRight size={16} /></a></div></div></SimpleSection><SimpleSection className="bg-[#f2f7fc]"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><SimpleKicker>What you can expect</SimpleKicker><h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-5xl">A better kind of financial conversation.</h2></div><div className="mt-12 grid gap-5 md:grid-cols-3">{[{ icon: <BadgeCheck size={25} />, title: "A licensed perspective", body: "A professional review of life insurance options, with the facts needed to make an informed choice." },{ icon: <Sparkles size={25} />, title: "Plain language", body: "No pressure to pretend you already know the terminology. Questions are part of the process." },{ icon: <HeartHandshake size={25} />, title: "Long-term care", body: "A relationship-first approach that stays focused on your life, goals, and changing circumstances." }].map((item) => <SimpleCard key={item.title} className="p-7"><div className="text-[#2563eb]">{item.icon}</div><h3 className="mt-6 font-display text-xl font-bold text-[#0b1f3a]">{item.title}</h3><p className="mt-3 font-body text-sm leading-relaxed text-[#526b86]">{item.body}</p></SimpleCard>)}</div></div></SimpleSection></SimpleLayout>;
}

export function SimpleLesson({ lessonPath }: { lessonPath: keyof typeof lessonDetails }) {
  const lesson = lessonDetails[lessonPath];
  const currentIndex = Object.keys(lessonDetails).indexOf(lessonPath);
  const nextPath = Object.keys(lessonDetails)[currentIndex + 1] as keyof typeof lessonDetails | undefined;
  const previousPath = Object.keys(lessonDetails)[currentIndex - 1] as keyof typeof lessonDetails | undefined;
  return <SimpleLayout><section className="relative overflow-hidden bg-[#edf5ff] px-5 pb-16 pt-36 sm:px-7 sm:pt-44"><SevenPointMark className="absolute right-[14%] top-28 h-20 w-20 text-[#b8892e]/35 sm:h-28 sm:w-28" /><div className="relative mx-auto max-w-4xl"><SimpleKicker>The Lifetime LOC learning series · Lesson {lesson.number} of 4</SimpleKicker><h1 className="font-display text-4xl font-black leading-[1.05] text-[#0b1f3a] sm:text-6xl">{lesson.title}</h1><p className="mt-6 max-w-3xl font-body text-lg leading-relaxed text-[#526b86]">{lesson.subtitle}</p></div></section><SimpleSection className="bg-white"><div className="mx-auto max-w-4xl"><SimpleKicker>Key points</SimpleKicker><h2 className="font-display text-3xl font-black leading-tight text-[#0b1f3a] sm:text-4xl">Questions and context matter.</h2><div className="mt-10 space-y-4">{lesson.points.map((point, index) => <div key={point} className="flex gap-5 border-l-2 border-[#2563eb] bg-[#f8fbff] p-6"><span className="font-tactical text-sm font-bold text-[#b8892e]">0{index + 1}</span><p className="font-body leading-relaxed text-[#425b78]">{point}</p></div>)}</div><div className="mt-10 border border-[#dbe7f5] bg-[#edf5ff] p-7"><BookOpen className="text-[#2563eb]" size={24} /><p className="mt-5 font-display text-xl font-bold leading-snug text-[#0b1f3a]">Education is the beginning, not the recommendation.</p><p className="mt-3 font-body text-sm leading-relaxed text-[#526b86]">This lesson is a general overview. A licensed conversation can help you apply the right questions to your own needs, budget, goals, and risk considerations.</p><a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-tactical text-sm font-bold uppercase tracking-[0.1em] text-[#2563eb] hover:text-[#0b1f3a]">Talk with Malik <ArrowRight size={16} /></a></div><div className="mt-12 flex items-center justify-between gap-4 border-t border-[#dbe7f5] pt-7 font-tactical text-sm font-bold uppercase tracking-[0.09em]">{previousPath ? <Link href={previousPath} className="text-[#526b86] hover:text-[#2563eb]">← Previous lesson</Link> : <Link href="/lifetime-loc" className="text-[#526b86] hover:text-[#2563eb]">← Lifetime LOC</Link>}{nextPath ? <Link href={nextPath} className="inline-flex items-center gap-2 text-[#2563eb]">Next lesson <ArrowRight size={16} /></Link> : <Link href="/lifetime-loc" className="inline-flex items-center gap-2 text-[#2563eb]">Back to overview <ArrowRight size={16} /></Link>}</div></div></SimpleSection></SimpleLayout>;
}
