import { Home, User, Globe, Compass, Users } from 'lucide-react';

export const navItems = [
    { path: '/', icon: Home, label: 'Home', mobile: true, desktop: true },
    { path: '/discover', icon: Compass, label: 'Explore', mobile: true, desktop: true },
    { path: '/toolkit', icon: Globe, label: 'Toolkit', mobile: true, desktop: true },
    { path: '/bookings', icon: Users, label: 'Bookings', mobile: true, desktop: false },
    { path: '/profile', icon: User, label: 'Profile', mobile: true, desktop: true },
];
