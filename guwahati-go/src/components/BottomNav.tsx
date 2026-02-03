import { Home, Search, Briefcase, User, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import { navItems } from './navItems';

export const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      {navItems.filter(i => i.mobile).map((item) => {
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
