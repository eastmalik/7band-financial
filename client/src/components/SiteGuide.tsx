import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  ExternalLink,
  LayoutPanelTop,
  Map as MapIcon,
  MousePointerClick,
  Sparkles,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useViewMode, type ViewMode } from "@/contexts/ViewModeContext";
import { EVENT_URL } from "@/lib/links";
import {
  GUIDE_BUTTONS,
  GUIDE_PAGES,
  GUIDE_WELCOME,
  HOME_TOUR,
  VIEW_INFO,
  type GuideStep,
} from "@/lib/siteGuide";

const WELCOME_KEY = "7band-guide-welcomed";

function readFlag(key: string) {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function writeFlag(key: string) {
  try {
    window.localStorage.setItem(key, "1");
  } catch {
    /* storage unavailable: the welcome simply shows again next visit */
  }
}

/** True when the element sits in a fixed layer (header, floating button) that never scrolls. */
function inFixedLayer(el: HTMLElement) {
  for (let node: HTMLElement | null = el; node; node = node.parentElement) {
    if (getComputedStyle(node).position === "fixed") return true;
  }
  return false;
}

/** First element tagged with one of the ids that is actually on screen. */
function findTarget(targets: string[]): HTMLElement | null {
  for (const id of targets) {
    const nodes = document.querySelectorAll<HTMLElement>(`[data-tour="${id}"]`);
    for (const node of Array.from(nodes)) {
      const rect = node.getBoundingClientRect();
      if (
        rect.width > 0 &&
        rect.height > 0 &&
        getComputedStyle(node).visibility !== "hidden"
      )
        return node;
    }
  }
  return null;
}

const theme = {
  player: {
    card: "border border-[#c9a84c]/45 bg-[#0a0800] text-white shadow-[0_18px_60px_rgba(0,0,0,0.6)]",
    title: "font-display text-[#f0d58a]",
    body: "font-body text-white/75",
    label: "font-tactical text-[#c9a84c]",
    muted: "text-white/45",
    primary: "bg-[#c9a84c] text-black hover:bg-[#e8c97a]",
    secondary: "border border-white/20 text-white/80 hover:bg-white/10",
    ring: "#c9a84c",
    fab: "border border-[#c9a84c]/60 bg-[#0a0800]/95 text-[#f0d58a] hover:bg-[#1a1405]",
    sheet: "bg-[#0a0800] text-white border-[#c9a84c]/30",
    row: "border-white/10 hover:bg-white/5",
  },
  simple: {
    card: "border border-[#dbe7f5] bg-white text-[#0b1f3a] shadow-[0_18px_60px_rgba(11,31,58,0.28)]",
    title: "font-display text-[#0b1f3a]",
    body: "font-body text-[#526b86]",
    label: "font-tactical text-[#2563eb]",
    muted: "text-[#7a8ea6]",
    primary: "bg-[#0b1f3a] text-white hover:bg-[#2563eb]",
    secondary: "border border-[#cbd8e8] text-[#0b1f3a] hover:bg-[#f2f7fc]",
    ring: "#2563eb",
    fab: "border border-[#cbd8e8] bg-white/95 text-[#0b1f3a] hover:bg-[#f2f7fc]",
    sheet: "bg-white text-[#0b1f3a] border-[#dbe7f5]",
    row: "border-[#e3ecf6] hover:bg-[#f5f9fe]",
  },
} satisfies Record<ViewMode, Record<string, string>>;

type Box = { top: number; left: number; width: number; height: number };

function ButtonList({
  buttons,
  mode,
}: {
  buttons: { label: string; does: string }[];
  mode: ViewMode;
}) {
  const t = theme[mode];
  return (
    <ul className="mt-4 space-y-2.5">
      {buttons.map(b => (
        <li key={b.label} className="flex gap-2.5 text-sm leading-snug">
          <MousePointerClick
            size={15}
            className={`mt-0.5 shrink-0 ${mode === "player" ? "text-[#c9a84c]" : "text-[#2563eb]"}`}
          />
          <span className={t.body}>
            <strong
              className={mode === "player" ? "text-white" : "text-[#0b1f3a]"}
            >
              {b.label}:
            </strong>{" "}
            {b.does}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Tour({
  steps,
  mode,
  onClose,
}: {
  steps: GuideStep[];
  mode: ViewMode;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [box, setBox] = useState<Box | null>(null);
  const [cardPos, setCardPos] = useState<{ top: number; left: number } | null>(
    null
  );
  // On phones the card docks to an edge; it moves to the top when the spotlight is low on screen.
  const [dockTop, setDockTop] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const t = theme[mode];
  const step = steps[index];
  const last = index === steps.length - 1;

  const measure = useCallback(() => {
    const el = findTarget(step.targets);
    if (!el) {
      setBox(null);
      return;
    }
    const r = el.getBoundingClientRect();
    const pad = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const top = Math.max(r.top - pad, 4);
    const left = Math.max(r.left - pad, 4);
    const bottom = Math.min(r.bottom + pad, vh - 4);
    const right = Math.min(r.right + pad, vw - 4);
    setBox({
      top,
      left,
      width: Math.max(right - left, 0),
      height: Math.max(bottom - top, 0),
    });
  }, [step]);

  // Bring the step's element into view, then keep the spotlight on it.
  useEffect(() => {
    const el = findTarget(step.targets);
    if (el) {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const tall = el.getBoundingClientRect().height > window.innerHeight * 0.6;
      if (!inFixedLayer(el))
        el.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: tall ? "start" : "center",
        });
    }
    measure();
    const timer = window.setTimeout(measure, 450);
    let frame = 0;
    const onMove = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
    };
  }, [step, measure]);

  // Place the card beside the spotlight on wide screens; dock it at the bottom on phones.
  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (vw < 640 || !box) {
      setCardPos(null);
      setDockTop(!!box && box.top > vh / 2);
      return;
    }
    const ch = card.offsetHeight;
    const cw = card.offsetWidth;
    const gap = 14;
    let top: number;
    if (box.top + box.height + gap + ch <= vh - 12)
      top = box.top + box.height + gap;
    else if (box.top - gap - ch >= 12) top = box.top - gap - ch;
    else top = vh - ch - 24;
    const left = Math.min(
      Math.max(box.left + box.width / 2 - cw / 2, 16),
      vw - cw - 16
    );
    setCardPos({ top, left });
  }, [box, index]);

  useEffect(() => {
    cardRef.current?.focus();
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setIndex(i => (i < steps.length - 1 ? i + 1 : i));
      if (e.key === "ArrowLeft") setIndex(i => (i > 0 ? i - 1 : i));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, steps.length]);

  return createPortal(
    <div className="site-guide-tour fixed inset-0 z-[90]">
      {/* Click shield: the page stays still while the tour is open. */}
      <div
        className="absolute inset-0"
        onClick={e => e.stopPropagation()}
        aria-hidden="true"
      />
      {box ? (
        <div
          aria-hidden="true"
          className="site-guide-spotlight pointer-events-none fixed rounded-md"
          style={{
            top: box.top,
            left: box.left,
            width: box.width,
            height: box.height,
            boxShadow: `0 0 0 3px ${t.ring}, 0 0 0 9999px rgba(3, 6, 15, 0.66)`,
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          className="fixed inset-0 bg-[rgba(3,6,15,0.66)]"
        />
      )}
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-guide-step-title"
        aria-describedby="site-guide-step-body"
        tabIndex={-1}
        className={`fixed w-[min(26rem,calc(100vw-2rem))] p-5 outline-none sm:p-6 ${t.card} ${
          cardPos
            ? ""
            : `left-1/2 -translate-x-1/2 ${dockTop ? "top-4" : "bottom-4"}`
        }`}
        style={cardPos ? { top: cardPos.top, left: cardPos.left } : undefined}
      >
        <div className="flex items-start justify-between gap-4">
          <p
            className={`text-[11px] font-bold uppercase tracking-[0.16em] ${t.label}`}
          >
            Step {index + 1} of {steps.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close the tour"
            className={`-m-1 p-1 ${t.muted} hover:opacity-80`}
          >
            <X size={18} />
          </button>
        </div>
        <h2
          id="site-guide-step-title"
          className={`mt-2 text-xl font-bold leading-tight ${t.title}`}
        >
          {step.title}
        </h2>
        <p
          id="site-guide-step-body"
          className={`mt-2 text-sm leading-relaxed ${t.body}`}
        >
          {step.body}
        </p>
        {step.buttons && step.buttons.length > 0 && (
          <>
            <p
              className={`mt-4 text-[11px] font-bold uppercase tracking-[0.14em] ${t.label}`}
            >
              What the buttons do
            </p>
            <ButtonList buttons={step.buttons} mode={mode} />
          </>
        )}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIndex(i => i - 1)}
            disabled={index === 0}
            className={`inline-flex items-center gap-1.5 px-3 py-2 font-tactical text-xs font-bold uppercase tracking-[0.12em] disabled:opacity-30 ${t.secondary}`}
          >
            <ArrowLeft size={14} /> Back
          </button>
          <button
            type="button"
            onClick={() => (last ? onClose() : setIndex(i => i + 1))}
            className={`inline-flex items-center gap-1.5 px-4 py-2 font-tactical text-xs font-bold uppercase tracking-[0.12em] ${t.primary}`}
          >
            {last ? "Finish" : "Next"} {!last && <ArrowRight size={14} />}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function SiteGuide() {
  const { mode, setMode, isTransitioning } = useViewMode();
  const [location, navigate] = useLocation();
  const [welcomeOpen, setWelcomeOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [tourSteps, setTourSteps] = useState<GuideStep[] | null>(null);
  const [pendingTour, setPendingTour] = useState(false);
  const t = theme[mode];

  // First visit: a short welcome that explains the two views.
  useEffect(() => {
    if (readFlag(WELCOME_KEY)) return;
    const timer = window.setTimeout(() => setWelcomeOpen(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  const dismissWelcome = () => {
    writeFlag(WELCOME_KEY);
    setWelcomeOpen(false);
  };

  const beginTour = useCallback(() => {
    const steps = HOME_TOUR[mode].filter(
      s => !s.optional || findTarget(s.targets)
    );
    window.scrollTo({ top: 0 });
    setTourSteps(steps);
  }, [mode]);

  const startTour = () => {
    writeFlag(WELCOME_KEY);
    setWelcomeOpen(false);
    setPanelOpen(false);
    if (location !== "/") {
      navigate("/");
      setPendingTour(true);
    } else {
      window.setTimeout(beginTour, 250);
    }
  };

  // After navigating home for the tour, wait for the page to render.
  useEffect(() => {
    if (!pendingTour || location !== "/") return;
    const timer = window.setTimeout(() => {
      setPendingTour(false);
      beginTour();
    }, 400);
    return () => window.clearTimeout(timer);
  }, [pendingTour, location, beginTour]);

  // Switching views mid-tour would point at the wrong page; end it.
  useEffect(() => {
    setTourSteps(null);
  }, [mode]);

  const otherMode: ViewMode = mode === "player" ? "simple" : "player";

  return (
    <>
      <button
        type="button"
        data-tour="guide-button"
        onClick={() => setPanelOpen(true)}
        aria-label="Open the site guide"
        className={`site-guide-fab fixed bottom-4 right-4 z-[75] inline-flex items-center gap-2 rounded-full px-4 py-3 font-tactical text-xs font-bold uppercase tracking-[0.14em] shadow-lg backdrop-blur transition-colors sm:bottom-6 sm:right-6 ${t.fab} ${
          isTransitioning || welcomeOpen || panelOpen
            ? "pointer-events-none opacity-0"
            : ""
        }`}
      >
        <Compass size={16} /> Guide
      </button>

      {tourSteps && (
        <Tour
          steps={tourSteps}
          mode={mode}
          onClose={() => setTourSteps(null)}
        />
      )}

      {/* Welcome card for first-time visitors */}
      <Sheet
        open={welcomeOpen}
        onOpenChange={open => (open ? setWelcomeOpen(true) : dismissWelcome())}
      >
        <SheetContent
          side="bottom"
          className={`mx-auto max-w-2xl border p-6 sm:bottom-6 sm:rounded-lg sm:p-8 ${t.sheet}`}
        >
          <SheetHeader className="shrink-0 p-0 text-left">
            <SheetTitle className={`text-2xl font-bold ${t.title}`}>
              {GUIDE_WELCOME.title}
            </SheetTitle>
            <SheetDescription className={`text-sm leading-relaxed ${t.body}`}>
              {GUIDE_WELCOME.body}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {(["simple", "player"] as ViewMode[]).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                aria-pressed={mode === m}
                className={`flex flex-col items-start gap-1.5 border p-4 text-left transition-colors ${t.row} ${
                  mode === m
                    ? m === "player"
                      ? "border-[#c9a84c]"
                      : "border-[#2563eb]"
                    : ""
                }`}
              >
                <span
                  className={`inline-flex items-center gap-2 font-tactical text-sm font-bold uppercase tracking-[0.12em] ${t.label}`}
                >
                  {m === "simple" ? (
                    <LayoutPanelTop size={15} />
                  ) : (
                    <Sparkles size={15} />
                  )}{" "}
                  {VIEW_INFO[m].name}
                  {mode === m && (
                    <span className={`text-[10px] ${t.muted}`}>
                      · you're here
                    </span>
                  )}
                </span>
                <span className={`text-sm leading-snug ${t.body}`}>
                  {VIEW_INFO[m].summary}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={startTour}
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 font-tactical text-xs font-bold uppercase tracking-[0.14em] ${t.primary}`}
            >
              <Compass size={15} /> Show me around
            </button>
            <button
              type="button"
              onClick={dismissWelcome}
              className={`px-5 py-3 font-tactical text-xs font-bold uppercase tracking-[0.14em] ${t.secondary}`}
            >
              I'll explore on my own
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* The Guide panel: views, tour, pages, buttons */}
      <Sheet open={panelOpen} onOpenChange={setPanelOpen}>
        <SheetContent
          side="right"
          className={`w-full overflow-y-auto border-l p-0 sm:max-w-md ${t.sheet}`}
        >
          <SheetHeader className="shrink-0 p-6 pb-2 text-left">
            <SheetTitle
              className={`flex items-center gap-2 text-2xl font-bold ${t.title}`}
            >
              <Compass size={20} /> Site guide
            </SheetTitle>
            <SheetDescription className={`text-sm leading-relaxed ${t.body}`}>
              Where everything is, and what every button does.
            </SheetDescription>
          </SheetHeader>

          <div className="shrink-0 space-y-8 px-6 pb-10 pt-4">
            <section>
              <h3
                className={`text-[11px] font-bold uppercase tracking-[0.16em] ${t.label}`}
              >
                Two ways to see this site
              </h3>
              <div className="mt-3 space-y-2">
                {(["simple", "player"] as ViewMode[]).map(m => (
                  <div key={m} className={`border p-4 ${t.row}`}>
                    <p
                      className={`font-tactical text-sm font-bold uppercase tracking-[0.12em] ${mode === "player" ? "text-white" : "text-[#0b1f3a]"}`}
                    >
                      {VIEW_INFO[m].name}{" "}
                      {mode === m && (
                        <span className={`ml-1 text-[10px] ${t.muted}`}>
                          · you're here
                        </span>
                      )}
                    </p>
                    <p className={`mt-1 text-sm leading-snug ${t.body}`}>
                      {VIEW_INFO[m].summary}
                    </p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setPanelOpen(false);
                  setMode(otherMode);
                }}
                className={`mt-3 w-full px-4 py-2.5 font-tactical text-xs font-bold uppercase tracking-[0.14em] ${t.secondary}`}
              >
                Switch to {VIEW_INFO[otherMode].name}
              </button>
            </section>

            <section>
              <h3
                className={`text-[11px] font-bold uppercase tracking-[0.16em] ${t.label}`}
              >
                Take the tour
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${t.body}`}>
                A one-minute walk through the home page: each section, and what
                each button does.
              </p>
              <button
                type="button"
                onClick={startTour}
                className={`mt-3 inline-flex w-full items-center justify-center gap-2 px-4 py-3 font-tactical text-xs font-bold uppercase tracking-[0.14em] ${t.primary}`}
              >
                <MapIcon size={15} /> Start the tour
              </button>
            </section>

            <section>
              <h3
                className={`text-[11px] font-bold uppercase tracking-[0.16em] ${t.label}`}
              >
                Pages on this site
              </h3>
              <ul
                className="mt-3 divide-y border-y"
                style={{ borderColor: "inherit" }}
              >
                {GUIDE_PAGES[mode].map(page => (
                  <li key={page.path} className={t.row}>
                    <Link
                      href={page.path}
                      onClick={() => setPanelOpen(false)}
                      className="block px-1 py-3"
                    >
                      <span
                        className={`font-tactical text-sm font-bold uppercase tracking-[0.1em] ${mode === "player" ? "text-white" : "text-[#0b1f3a]"}`}
                      >
                        {page.name}{" "}
                        {location === page.path && (
                          <span className={`ml-1 text-[10px] ${t.muted}`}>
                            · you're here
                          </span>
                        )}
                      </span>
                      <span className={`mt-0.5 block text-sm ${t.body}`}>
                        {page.what}
                      </span>
                    </Link>
                  </li>
                ))}
                <li className={t.row}>
                  <a
                    href={EVENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-1 py-3"
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 font-tactical text-sm font-bold uppercase tracking-[0.1em] ${mode === "player" ? "text-white" : "text-[#0b1f3a]"}`}
                    >
                      Event <ExternalLink size={12} />
                    </span>
                    <span className={`mt-0.5 block text-sm ${t.body}`}>
                      THE FLOW, the free weekly webinar. Opens in a new tab.
                    </span>
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h3
                className={`text-[11px] font-bold uppercase tracking-[0.16em] ${t.label}`}
              >
                What the buttons do
              </h3>
              <ButtonList buttons={GUIDE_BUTTONS[mode]} mode={mode} />
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
