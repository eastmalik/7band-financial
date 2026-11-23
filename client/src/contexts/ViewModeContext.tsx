import { createContext, useContext, useEffect, useMemo } from "react";

/**
 * The hub used to offer two views: Simple and Player 1 (a game version).
 * Player 1 and its quest storyline moved to THE FLOW site, so the hub is
 * always in Simple View now. The context stays so components that style by
 * mode keep working; "player" is kept in the type for those style maps.
 */
export type ViewMode = "simple" | "player";

type ViewModeContextValue = {
  mode: ViewMode;
  isTransitioning: boolean;
};

const ViewModeContext = createContext<ViewModeContextValue | undefined>(undefined);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.viewMode = "simple";
    try {
      window.localStorage.removeItem("7band-view-mode");
    } catch {
      /* storage blocked: nothing to clean up */
    }
    // Old links may carry ?view=player; drop it so the address is clean.
    const url = new URL(window.location.href);
    if (url.searchParams.has("view")) {
      url.searchParams.delete("view");
      window.history.replaceState({}, "", url);
    }
  }, []);

  const value = useMemo<ViewModeContextValue>(() => ({ mode: "simple", isTransitioning: false }), []);
  return <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>;
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (!context) throw new Error("useViewMode must be used within ViewModeProvider");
  return context;
}
