import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronRight } from 'lucide-react';
import { FilterChips } from '@/components/FilterChips';
import { ExperienceCard } from '@/components/ExperienceCard';
import { TopNav } from '../components/TopNav';
import { LocalHosts } from '../components/LocalHosts';
import { MapDownloadSection } from '@/components/MapDownload';
import { Footer } from '../components/Footer';
import { experiences } from '@/data/experiences';
import heroImage from '@/assets/Brahma2.jpeg';

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

      {/* Filter Section */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <FilterChips activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* Experiences Grid */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">
            {activeFilter === 'all' ? 'All Experiences' : 'Filtered Experiences'}
          </h2>
          <button className="flex items-center gap-1 text-sm text-primary font-medium">
            View Map
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredExperiences.map((experience, index) => (
            <ExperienceCard key={experience.id} experience={experience} index={index} />
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No experiences match your filter.</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="text-primary font-medium mt-2"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>

      <LocalHosts />

      <MapDownloadSection />

      <Footer />


    </div>
  );
};

export default Index;
