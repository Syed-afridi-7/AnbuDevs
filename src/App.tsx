import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import CodeLab from "./pages/CodeLab";
import AptitudeHub from "./pages/AptitudeHub";
import Communication from "./pages/Communication";
import RolePaths from "./pages/RolePaths";
import ProblemEditorPage from "./pages/ProblemEditorPage";
import Tutorials from "./pages/Tutorials";
import TutorialViewer from "./pages/TutorialViewer";
import Articles from "./pages/Articles";
import ArticleView from "./pages/ArticleView";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Code editor pages - NO sidebar layout */}
          <Route path="/codelab/problem/:id" element={<ProblemEditorPage />} />

          {/* All other pages - WITH sidebar layout */}
          <Route
            path="/*"
            element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/codelab" element={<CodeLab />} />
                  <Route path="/aptitude" element={<AptitudeHub />} />
                  <Route path="/communication" element={<Communication />} />
                  <Route path="/path/:role" element={<RolePaths />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/tutorials/:topicId" element={<TutorialViewer />} />
                  <Route path="/articles" element={<Articles />} />
                  <Route path="/articles/:id" element={<ArticleView />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
