import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { FilterChips } from '@/components/FilterChips';
import { TopNav } from '../components/TopNav';
import { LocalHosts } from '../components/LocalHosts';
import { MapDownloadSection } from '@/components/MapDownload';
import { Footer } from '../components/Footer';
import { experiences } from '@/data/experiences';
import heroImage from '@/assets/Brahma2.jpeg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Discover from '@/pages/Discover';
import ExperienceDetail from '@/pages/ExperienceDetail';
import BookingConfirmation from '@/pages/BookingConfirmation';
import MerchantOnboarding from '@/pages/MerchantOnboarding';
import FeedbackPage from '@/pages/FeedbackPage';
import AdminDashboard from '@/pages/AdminDashboard';

const Index = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredExperiences = experiences.filter((exp) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '60') return exp.duration <= 60;
    if (activeFilter === '120') return exp.duration <= 120;
    if (activeFilter === '240') return exp.duration <= 240;
    return exp.category === activeFilter;
  });

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background pt-20">
        <TopNav />
        {/* Hero Section */}
        <div className="relative h-[75vh] min-h-[500px] overflow-hidden">
          <img
            src={heroImage}
            alt="Brahmaputra River at sunset"
            className="w-full h-full object-cover object-[center_75%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-foreground/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              {/* Location Tag */}
              <div className="inline-flex items-center gap-1.5 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-foreground">Guwahati, Assam</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-black leading-tight mb-2">
                Discover Guwahati in Minutes
              </h1>
              <p className="text-base text-black md:text-lg max-w-md">
                Short-stay heritage and neighborhood experiences curated by locals. Perfect for layovers and quick breaks.
              </p>
            </motion.div>
          </div>
        </div>

        <Discover />

        <LocalHosts />

        <MapDownloadSection />

        <Footer />
      </div>

      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/experience/:id" element={<ExperienceDetail />} />
        <Route path="/booking-confirmed/:bookingId" element={<BookingConfirmation />} />
        <Route path="/merchant/onboard" element={<MerchantOnboarding />} />
        <Route path="/feedback/:bookingId" element={<FeedbackPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Index;
