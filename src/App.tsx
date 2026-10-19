import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

// Code Splitting / Lazy Loading par Route pour diviser le payload JS initial par 3
const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Projets = lazy(() => import("./pages/Projets"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MentionsLegales = lazy(() => import("./pages/Legal").then((m) => ({ default: m.MentionsLegales })));
const Confidentialite = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Confidentialite })));

const RedirectProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  return <Navigate to={`/projets/${projectId}`} replace />;
};

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Le routeur est fourni par l'appelant : BrowserRouter dans main.tsx, StaticRouter dans entry-server.tsx (pré-rendu)
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      {/* Seul le toaster Sonner lit le thème : le ThemeProvider ne doit pas englober les pages, car sa mise à jour
          au montage (thème système) empêcherait React d'hydrater le HTML pré-rendu (erreur #421). */}
      <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false} enableColorScheme={false}>
        <Sonner />
      </ThemeProvider>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />

            {/* Routes Projets en Français */}
            <Route path="/projets" element={<Projets />} />
            <Route path="/projets/:projectId" element={<ProjectDetail />} />

            {/* Redirections de compatibilité pour /projects (côté serveur : 308 dans vercel.json ; ici pour la navigation interne) */}
            <Route path="/projects" element={<Navigate to="/projets" replace />} />
            <Route path="/projects/:projectId" element={<RedirectProjectDetail />} />

            {/* Route À Propos en Français avec redirection (/about : 308 dans vercel.json) */}
            <Route path="/a-propos" element={<About />} />
            <Route path="/about" element={<Navigate to="/a-propos" replace />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
