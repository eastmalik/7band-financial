import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LifetimeLOC from "./pages/LifetimeLOC";
import About from "./pages/About";
import GameMap from "./pages/GameMap";
import Lesson1 from "./pages/Lesson1";
import Lesson2 from "./pages/Lesson2";
import Lesson3 from "./pages/Lesson3";
import Lesson4 from "./pages/Lesson4";
import ViewModeToggle from "./components/ViewModeToggle";
import { useViewMode, ViewModeProvider } from "./contexts/ViewModeContext";
import { SimpleAbout, SimpleGameMap, SimpleHome, SimpleLesson, SimpleLifetimeLOC } from "./pages/SimpleViews";

function Router() {
  const { mode } = useViewMode();
  if (mode === "simple") {
    return (
      <Switch>
        <Route path={"/"} component={SimpleHome} />
        <Route path={"/lifetime-loc"} component={SimpleLifetimeLOC} />
        <Route path={"/about"} component={SimpleAbout} />
        <Route path={"/game-map"} component={SimpleGameMap} />
        <Route path={"/lesson-1"} component={() => <SimpleLesson lessonPath="/lesson-1" />} />
        <Route path={"/lesson-2"} component={() => <SimpleLesson lessonPath="/lesson-2" />} />
        <Route path={"/lesson-3"} component={() => <SimpleLesson lessonPath="/lesson-3" />} />
        <Route path={"/lesson-4"} component={() => <SimpleLesson lessonPath="/lesson-4" />} />
        <Route component={SimpleHome} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/lifetime-loc"} component={LifetimeLOC} />
      <Route path={"/about"} component={About} />
      <Route path={"/game-map"} component={GameMap} />
      <Route path={"/lesson-1"} component={Lesson1} />
      <Route path={"/lesson-2"} component={Lesson2} />
      <Route path={"/lesson-3"} component={Lesson3} />
      <Route path={"/lesson-4"} component={Lesson4} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function PlayerModeToggle() {
  const { mode } = useViewMode();
  return mode === "player" ? <ViewModeToggle /> : null;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <ViewModeProvider>
          <TooltipProvider>
            <Toaster />
            <PlayerModeToggle />
            <Router />
          </TooltipProvider>
        </ViewModeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
