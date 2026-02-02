import { motion } from 'framer-motion';
import { Clock, Palette, Utensils } from 'lucide-react';

interface FilterChipsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: 'all', label: 'All', icon: null },
  { id: '60', label: '< 60 mins', icon: Clock },
  { id: '120', label: '2 Hours', icon: Clock },
  { id: '240', label: '4 Hours', icon: Clock },
  { id: 'culture', label: 'Culture', icon: Palette },
  { id: 'food', label: 'Food', icon: Utensils },
];

export const FilterChips = ({ activeFilter, onFilterChange }: FilterChipsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide py-2 px-1">
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(filter.id)}
          className={`filter-chip flex items-center gap-1.5 ${
            activeFilter === filter.id ? 'active' : ''
          }`}
        >
          {filter.icon && <filter.icon className="w-3.5 h-3.5" />}
          {filter.label}
        </motion.button>
      ))}
    </div>
  );
};
