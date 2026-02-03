import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Plus, Settings } from 'lucide-react';
import { navItems } from './navItems';
import { Button } from '@/components/ui/button';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const mainNavItems = navItems.filter(i => i.mobile).map(i => ({ icon: i.icon, label: i.label, path: i.path, mobile: true }));

    const secondaryNavItems = [
        { icon: Plus, label: 'Become Host', path: '/merchant/onboard', mobile: false },
        { icon: Settings, label: 'Admin', path: '/admin', mobile: false },
    ];

    const isActive = (path: string) => location.pathname === path;

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <>
            {/* Mobile Navigation - Bottom Bar */}
            <motion.nav
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border shadow-lg"
            >
                <div className="flex items-center justify-around px-2 py-2 gap-1">
                    {mainNavItems.map((item) => (
                        <motion.button
                            key={item.path}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                navigate(item.path);
                                closeMobileMenu();
                            }}
                            className={`flex flex-col items-center justify-center gap-0.5 px-3 py-2.5 rounded-lg transition flex-1 ${isActive(item.path)
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="text-xs font-medium leading-tight">{item.label}</span>
                        </motion.button>
                    ))}

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="flex flex-col items-center justify-center gap-0.5 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition flex-1"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                        <span className="text-xs font-medium">More</span>
                    </motion.button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeMobileMenu}
                            className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="md:hidden fixed bottom-20 left-3 right-3 z-40 bg-card rounded-2xl shadow-xl p-3 border border-border"
                        >
                            <div className="space-y-1.5">
                                {secondaryNavItems.map((item) => (
                                    <motion.button
                                        key={item.path}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            navigate(item.path);
                                            closeMobileMenu();
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive(item.path)
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-foreground hover:bg-muted'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Navigation - Top Bar */}
            <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border"
            >
                <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3.5 flex items-center justify-between">
                    {/* Logo Section */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate('/')}
                        className="cursor-pointer flex items-center gap-2 min-w-fit"
                    >
                        <img
                            src="/doraexplorer1.png"
                            alt="Dora Explorer"
                            className="w-12 h-12 rounded-lg object-cover shadow-md"
                        />
                        <div className="hidden sm:block">
                            <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                Dora
                            </span>
                            <span className="hidden lg:inline text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                                {' '}Explorer
                            </span>
                        </div>
                    </motion.div>

                    {/* Center Navigation Items */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navItems.filter(i => i.desktop).map((item) => (
                            <motion.button
                                key={item.path}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(item.path)}
                                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition ${isActive(item.path)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-foreground hover:bg-muted'
                                    }`}>
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Right Section - Profile Avatar (Instagram Style) */}
                    <div className="flex items-center gap-4">
                        {/* Desktop Profile Avatar */}
                        <div className="hidden lg:block relative">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary/40 flex items-center justify-center border-2 border-primary/20 hover:border-primary/50 transition"
                            >
                                <span className="text-sm font-bold text-white">U</span>
                            </motion.button>

                            {/* Profile Dropdown */}
                            <AnimatePresence>
                                {profileMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-48 bg-card rounded-2xl shadow-xl border border-border p-2 z-50"
                                    >
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                navigate('/profile');
                                                setProfileMenuOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-foreground hover:bg-muted transition font-medium"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                                <span className="text-xs font-bold">U</span>
                                            </div>
                                            <span>My Profile</span>
                                        </motion.button>
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                navigate('/merchant/onboard');
                                                setProfileMenuOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-foreground hover:bg-muted transition font-medium"
                                        >
                                            <Plus className="w-5 h-5 text-primary" />
                                            <span>Become a Host</span>
                                        </motion.button>
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                navigate('/admin');
                                                setProfileMenuOpen(false);
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-foreground hover:bg-muted transition font-medium"
                                        >
                                            <Settings className="w-5 h-5" />
                                            <span>Admin</span>
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Tablet Navigation Toggle */}
                        <div className="lg:hidden">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg hover:bg-muted transition"
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Tablet Menu Dropdown */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="lg:hidden bg-card/95 backdrop-blur-sm border-b border-border p-3 space-y-2"
                        >
                            {navItems.filter(i => i.mobile).map((item) => (
                                <motion.button
                                    key={item.path}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        navigate(item.path);
                                        closeMobileMenu();
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition ${isActive(item.path)
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-foreground hover:bg-muted'
                                        }`}>
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </motion.button>
                            ))}
                            <div className="border-t border-border pt-2 mt-2">
                                {secondaryNavItems.map((item) => (
                                    <motion.button
                                        key={item.path}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            navigate(item.path);
                                            closeMobileMenu();
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition ${isActive(item.path)
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-foreground hover:bg-muted'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Spacer for fixed navbar */}
            <div className="hidden md:block h-16" />
        </>
    );
};

export default Navbar;