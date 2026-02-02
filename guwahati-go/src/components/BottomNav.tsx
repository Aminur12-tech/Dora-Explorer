import { Home, Search, Briefcase, User, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/toolkit', icon: Globe, label: 'Toolkit' },
  { path: '/merchant', icon: Briefcase, label: 'Host' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link key={item.path} to={item.path}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                  transition={{ type: 'spring', duration: 0.5 }}
                />
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
};
