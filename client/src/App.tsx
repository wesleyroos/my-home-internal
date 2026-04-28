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
import DocVault from "./pages/DocVault";
import Exco from "./pages/Exco";
import Landscape from "./pages/Landscape";
import BetterBondDirectGrants from "./pages/BetterBondDirectGrants";
import BuyerFlow from "./pages/BuyerFlow";
import StandardBankNotes from "./pages/StandardBankNotes";
import LoomMeeting from "./pages/LoomMeeting";
import BBDirectMeeting from "./pages/BBDirectMeeting";
import LCPresentation from "./pages/LCPresentation";
import ExcoPresentation from "./pages/ExcoPresentation";
import ExcoMeeting from "./pages/ExcoMeeting";
import ConnellsLloyds from "./pages/ConnellsLloyds";
import ZooplaMyHome from "./pages/ZooplaMyHome";
import SuburbReportSurvey from "./pages/SuburbReportSurvey";
import BankAgreements from "./pages/BankAgreements";
import MarketStats from "./pages/MarketStats";
import Personas from "./pages/Personas";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={BetterHomeJourney} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/report"} component={Home} />
      <Route path={"/email"} component={EmailPreview} />
      <Route path={"/fi"} component={FIComparison} />
      <Route path={"/deal"} component={ChooseMyDeal} />
      <Route path={"/vault"} component={DocVault} />
      <Route path={"/exco"} component={Exco} />
      <Route path={"/landscape"} component={Landscape} />
      <Route path={"/bb-direct-grants"} component={BetterBondDirectGrants} />
      <Route path={"/buyer-flow"} component={BuyerFlow} />
      <Route path={"/standard-bank"} component={StandardBankNotes} />
      <Route path={"/loom-meeting"} component={LoomMeeting} />
      <Route path={"/bb-direct-meeting"} component={BBDirectMeeting} />
      <Route path={"/lc-presentation"} component={LCPresentation} />
      <Route path={"/exco-presentation"} component={ExcoPresentation} />
      <Route path={"/exco-meeting"} component={ExcoMeeting} />
      <Route path={"/connells-lloyds"} component={ConnellsLloyds} />
      <Route path={"/zoopla-myhome"} component={ZooplaMyHome} />
      <Route path={"/suburb-report-survey"} component={SuburbReportSurvey} />
      <Route path={"/bank-agreements"} component={BankAgreements} />
      <Route path={"/market-stats"} component={MarketStats} />
      <Route path={"/personas"} component={Personas} />
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
