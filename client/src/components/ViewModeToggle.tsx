import { LayoutPanelTop, Sparkles } from "lucide-react";
import { useViewMode } from "@/contexts/ViewModeContext";

export default function ViewModeToggle({ embedded = false }: { embedded?: boolean }) {
  const { mode, setMode } = useViewMode();

  return (
    <div className={`view-mode-dock flex items-center gap-1 rounded-full border border-white/20 bg-[#071020]/92 p-1.5 shadow-[0_12px_34px_rgba(2,8,23,0.28)] backdrop-blur-xl transition-all duration-200 ${embedded ? "" : "fixed top-20 right-3 sm:right-5 z-[70]"}`}>
      <span className="sr-only" id="view-mode-label">Choose the website display style</span>
      <button
        type="button"
        aria-labelledby="view-mode-label simple-view-label"
        aria-pressed={mode === "simple"}
        onClick={() => setMode("simple")}
        className={`flex items-center gap-1.5 rounded-full px-3 py-2 font-tactical text-[11px] font-bold uppercase tracking-[0.11em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] ${
          mode === "simple" ? "bg-white text-[#0b1f3a] shadow-sm" : "text-white/70 hover:bg-white/10 hover:text-white"
        }`}
      >
        <LayoutPanelTop size={13} strokeWidth={2.2} />
        <span id="simple-view-label">Simple View</span>
      </button>
      <button
        type="button"
        aria-labelledby="view-mode-label player-view-label"
        aria-pressed={mode === "player"}
        onClick={() => setMode("player")}
        className={`flex items-center gap-1.5 rounded-full px-3 py-2 font-tactical text-[11px] font-bold uppercase tracking-[0.11em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a84c] ${
          mode === "player" ? "bg-[#c9a84c] text-[#100d03] shadow-[0_0_18px_rgba(201,168,76,0.36)]" : "text-white/70 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Sparkles size={13} strokeWidth={2.2} />
        <span id="player-view-label">Player 1</span>
      </button>
    </div>
  );
}
