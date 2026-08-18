import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ViewMode = "simple" | "player";

type ViewModeContextValue = {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  toggleMode: () => void;
};

const ViewModeContext = createContext<ViewModeContextValue | undefined>(undefined);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "player";
    const requestedMode = new URLSearchParams(window.location.search).get("view");
    if (requestedMode === "simple" || requestedMode === "player") return requestedMode;
    return window.localStorage.getItem("7band-view-mode") === "simple" ? "simple" : "player";
  });

  useEffect(() => {
    window.localStorage.setItem("7band-view-mode", mode);
    document.documentElement.dataset.viewMode = mode;
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode((current) => (current === "player" ? "simple" : "player")),
    }),
    [mode],
  );

  return <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>;
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (!context) throw new Error("useViewMode must be used within ViewModeProvider");
  return context;
}
