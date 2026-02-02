import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ExperienceDetail from "./pages/ExperienceDetail";
import BookingConfirmed from "./pages/BookingConfirmed";
import TravelerToolkit from "./pages/TravelerToolkit";
import MerchantOnboarding from "./pages/MerchantOnboarding";
import Feedback from "./pages/Feedback";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
          <Route path="/booking-confirmed/:id" element={<BookingConfirmed />} />
          <Route path="/toolkit" element={<TravelerToolkit />} />
          <Route path="/merchant" element={<MerchantOnboarding />} />
          <Route path="/feedback/:id" element={<Feedback />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
