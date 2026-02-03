import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navItems } from './navItems';

export const TopNav = () => {
    const location = useLocation();


    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/doraexplorer1.png"
                            alt="Dora Explorer"
                            className="w-8 h-8 rounded-lg object-cover"
                        />
                        <span className="font-bold text-xl text-gray-900 tracking-tight">Dora Explorer</span>
                    </Link>

                    {/* Navigation Icons */}
                    <div className="flex items-center gap-1 sm:gap-4">
                        {navItems.filter(i => i.desktop).map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link key={item.path} to={item.path}>
                                    <motion.div
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors duration-200 ${isActive
                                            ? 'text-primary'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                            }`}>
                                        <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                                        <span className="text-[10px] font-medium hidden sm:block">{item.label}</span>

                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-primary/5 rounded-xl -z-10"
                                                transition={{ type: 'spring', duration: 0.5 }}
                                            />
                                        )}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};

