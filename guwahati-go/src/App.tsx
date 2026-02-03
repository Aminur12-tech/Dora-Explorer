import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Landing from "@/pages/Landing";
import Discover from "@/pages/Discover";
import ExperienceDetail from "@/pages/ExperienceDetail";
import BookingConfirmation from "@/pages/BookingConfirmation";
import MyBookings from "@/pages/MyBookings";
import MerchantProfile from "@/pages/MerchantProfile";
import MerchantOnboarding from "@/pages/MerchantOnboarding";
import FeedbackPage from "@/pages/FeedbackPage";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import VendorProfile from '@/pages/VendorProfile';
import TravelerToolkit from '@/pages/TravelerToolkit';
import Profile from '@/pages/Profile';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
          <Route path="/booking-confirmed/:bookingId" element={<BookingConfirmation />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/merchant/:id" element={<MerchantProfile />} />
          <Route path="/vendor/:id" element={<VendorProfile />} />
          <Route path="/merchant/onboard" element={<MerchantOnboarding />} />
          <Route path="/feedback/:bookingId" element={<FeedbackPage />} />
          <Route path="/toolkit" element={<TravelerToolkit />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
