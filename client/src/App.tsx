import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import SiteGuide from "./components/SiteGuide";
import { ViewModeProvider } from "./contexts/ViewModeContext";
import { SimpleGameMap, SimpleHome, SimpleLesson, SimpleLifetimeLOC } from "./pages/SimpleViews";
import SimpleAbout from "./pages/SimpleAboutReplacement";
import SimpleBook from "./pages/SimpleBook";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

/**
 * The hub is the 7Band Financial Agency life insurance site, in one plain
 * view. The game version (Player 1) and its quest storyline moved to THE
 * FLOW site: theflow.7bandfinancialagency.com/map.
 */
function Router() {
  return (
    <Switch>
      <Route path={"/"} component={SimpleHome} />
      <Route path={"/lifetime-loc"} component={SimpleLifetimeLOC} />
      <Route path={"/about"} component={SimpleAbout} />
      <Route path={"/the-book"} component={SimpleBook} />
      <Route path={"/game-map"} component={SimpleGameMap} />
      <Route path={"/lesson-1"} component={() => <SimpleLesson lessonPath="/lesson-1" />} />
      <Route path={"/lesson-2"} component={() => <SimpleLesson lessonPath="/lesson-2" />} />
      <Route path={"/lesson-3"} component={() => <SimpleLesson lessonPath="/lesson-3" />} />
      <Route path={"/lesson-4"} component={() => <SimpleLesson lessonPath="/lesson-4" />} />
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route path={"/privacy"} component={PrivacyPolicy} />
      <Route path={"/terms-and-conditions"} component={TermsAndConditions} />
      <Route path={"/terms"} component={TermsAndConditions} />
      <Route component={SimpleHome} />
    </Switch>
  );
}

/** Legal pages stay plain: no welcome guide on top of them. */
const LEGAL_PATHS = ["/privacy-policy", "/privacy", "/terms-and-conditions", "/terms"];

function SiteChrome() {
  const [location] = useLocation();
  if (LEGAL_PATHS.includes(location.replace(/\/$/, ""))) return null;
  return (
    <SiteGuide />
  );
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
            <SiteChrome />
            <Router />
          </TooltipProvider>
        </ViewModeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
