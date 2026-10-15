import { useEffect } from "react";
import { Switch, Route, Redirect, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Programs from "./pages/Programs";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import FeeGrant from "./pages/FeeGrant";
import Forms from "./pages/Forms";
import Sponsors from "./pages/Sponsors";
import MailingList from "./pages/MailingList";
import NotFound from "@/pages/not-found";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutUs} />
      <Route path="/programs" component={Programs} />
      <Route path="/adventures" component={Events} />
      <Route path="/adventures/:slug" component={EventDetail} />
      <Route path="/events">
        <Redirect to="/adventures" replace />
      </Route>
      <Route path="/events/:slug">
        {(params) => <Redirect to={`/adventures/${params.slug}`} replace />}
      </Route>
      <Route path="/fee-grant" component={FeeGrant} />
      <Route path="/forms" component={Forms} />
      <Route path="/sponsors" component={Sponsors} />
      <Route path="/mailing-list" component={MailingList} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Remount the error boundary on navigation so one page's error doesn't stick.
function Page() {
  const [location] = useLocation();
  return (
    <ErrorBoundary key={location}>
      <Router />
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop />
          <Nav />
          <main>
            <Page />
          </main>
          <Footer />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
