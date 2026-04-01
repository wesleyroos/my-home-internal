import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { RegistrationProvider } from "./contexts/RegistrationContext";
import { RegistrationModal } from "./components/RegistrationModal";
import Home from "./pages/Home";
import EmailPreview from "./pages/EmailPreview";
import FIComparison from "./pages/FIComparison";
import ChooseMyDeal from "./pages/ChooseMyDeal";
import Dashboard from "./pages/Dashboard";
import BetterHomeJourney from "./pages/BetterHomeJourney";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={BetterHomeJourney} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/report"} component={Home} />
      <Route path={"/email"} component={EmailPreview} />
      <Route path={"/fi"} component={FIComparison} />
      <Route path={"/deal"} component={ChooseMyDeal} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <RegistrationProvider>
          <TooltipProvider>
            <Toaster />
            <RegistrationModal />
            <Router />
          </TooltipProvider>
        </RegistrationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
