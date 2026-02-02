
import { Facebook, Instagram } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">

                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img src="/doraexplorer1.png" alt="Dora Explorer Logo" className="w-8 h-8 rounded-lg object-cover" />
                            <span className="font-bold text-xl text-gray-900">Dora Explorer</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Connecting travelers with the soul of Guwahati through short, authentic, and affordable local experiences.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-300 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Discover Column */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Discover</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-gray-900">Temples & Heritage</a></li>
                            <li><a href="#" className="hover:text-gray-900">River Cruises</a></li>
                            <li><a href="#" className="hover:text-gray-900">Local Markets</a></li>
                            <li><a href="#" className="hover:text-gray-900">Food Tours</a></li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
                            <li><a href="#" className="hover:text-gray-900">Safety Information</a></li>
                            <li><a href="#" className="hover:text-gray-900">Cancellation Options</a></li>
                            <li><a href="#" className="hover:text-gray-900">Become a Host</a></li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-gray-900">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-gray-900">Sitemap</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© 2024 Guwahati Micro-Tours. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-gray-900">Privacy</a>
                        <a href="#" className="hover:text-gray-900">Terms</a>
                        <a href="#" className="hover:text-gray-900">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
