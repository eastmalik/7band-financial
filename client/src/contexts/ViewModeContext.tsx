import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type ViewMode = "simple" | "player";

type ViewModeContextValue = {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  toggleMode: () => void;
  isTransitioning: boolean;
};

const ViewModeContext = createContext<ViewModeContextValue | undefined>(undefined);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setActiveMode] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "player";
    const requestedMode = new URLSearchParams(window.location.search).get("view");
    if (requestedMode === "simple" || requestedMode === "player") return requestedMode;
    return window.localStorage.getItem("7band-view-mode") === "simple" ? "simple" : "player";
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<ViewMode>(mode);

  useEffect(() => {
    window.localStorage.setItem("7band-view-mode", mode);
    document.documentElement.dataset.viewMode = mode;
  }, [mode]);

  const setMode = useCallback((nextMode: ViewMode) => {
    if (nextMode === mode) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const commitMode = () => {
      setActiveMode(nextMode);
      const nextUrl = new URL(window.location.href);
      nextUrl.searchParams.set("view", nextMode);
      window.history.replaceState({}, "", nextUrl);
    };

    if (prefersReducedMotion) {
      commitMode();
      return;
    }

    setTransitionTarget(nextMode);
    setIsTransitioning(true);
    window.setTimeout(commitMode, 220);
    window.setTimeout(() => setIsTransitioning(false), 680);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode(mode === "player" ? "simple" : "player"),
      isTransitioning,
    }),
    [isTransitioning, mode, setMode],
  );

  return (
    <ViewModeContext.Provider value={value}>
      {children}
      <div aria-hidden="true" className={`mode-shift-overlay ${isTransitioning ? "is-active" : ""} mode-shift-${transitionTarget}`}>
        <span className="mode-shift-line" />
        <span className="mode-shift-core" />
      </div>
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (!context) throw new Error("useViewMode must be used within ViewModeProvider");
  return context;
}
