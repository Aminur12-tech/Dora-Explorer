import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, X, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ExperienceCard } from '@/components/ExperienceCard';
import { BottomNav } from '@/components/BottomNav';
import { experiences } from '@/data/experiences';

const recentSearches = [
  'Brahmaputra sunset',
  'Silk weaving',
  'Temple visit',
  'Food tour'
];

const Search = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredExperiences = query.length > 0
    ? experiences.filter(exp => 
        exp.title.toLowerCase().includes(query.toLowerCase()) ||
        exp.description.toLowerCase().includes(query.toLowerCase()) ||
        exp.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Search Header */}
      <div className="sticky top-0 z-40 bg-background border-b border-border">
        <div className="p-4">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search experiences, hosts, places..."
              className="pl-12 pr-10 h-12 rounded-full bg-muted border-0 text-base"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Recent Searches */}
        {!query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Recent Searches
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {recentSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => setQuery(search)}
                  className="px-4 py-2 bg-muted rounded-full text-sm text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>

            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              Popular in Guwahati
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experiences.slice(0, 4).map((exp, index) => (
                <ExperienceCard key={exp.id} experience={exp} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Search Results */}
        {query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground mb-4">
              {filteredExperiences.length} results for "{query}"
            </p>
            
            {filteredExperiences.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredExperiences.map((exp, index) => (
                  <ExperienceCard key={exp.id} experience={exp} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-2">No experiences found</p>
                <p className="text-sm text-muted-foreground">
                  Try searching for "sunset", "tea", or "silk"
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Search;
