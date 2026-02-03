import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, BadgeCheck, Mail, Phone, MapPin, Star, DollarSign, Globe, AlertCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const translations = {
    en: {
        aboutVendor: 'About Vendor',
        pricing: 'Pricing',
        safetyInfo: 'Safety & Meeting Points',
        languages: 'Languages',
        contact: 'Contact Information',
        experience: 'Experience',
        years: 'years',
        rating: 'Rating',
        reviews: 'reviews',
        mobileMenu: 'Menu',
        bookNow: 'Book Now',
        contactVendor: 'Contact Vendor',
        safetyBriefing: 'Safety Briefing Included',
        meetingPoint: 'Meeting Point',
        languages: 'Languages Spoken',
        responseTime: 'Response Time',
        cancellation: 'Cancellation Policy',
        phrasebook: 'Local Phrasebook'
    },
    as: {
        aboutVendor: 'বিক্রেতাৰ বিষয়ে',
        pricing: 'মূল্য নির্ধারণ',
        safetyInfo: 'নিৰাপত্তা আৰু মিলন পয়েন্ট',
        languages: 'ভাষা',
        contact: 'যোগাযোগ তথ্য',
        experience: 'অভিজ্ঞতা',
        years: 'বছর',
        rating: 'রেটিং',
        reviews: 'মতামত',
        mobileMenu: 'মেনু',
        bookNow: 'এখনই বুক করুন',
        contactVendor: 'বিক্রেতাক যোগাযোগ কৰক',
        safetyBriefing: 'নিৰাপত্তা ব্রিফিং অন্তর্ভুক্ত',
        meetingPoint: 'মিলন পয়েন্ট',
        languages: 'কথ্য ভাষা',
        responseTime: 'প্রতিক্রিয়া সময়',
        cancellation: 'বাতিলকরণ নীতি',
        phrasebook: 'স্থানীয় বাক্যাংশ বই'
    },
    hi: {
        aboutVendor: 'विक्रेता के बारे में',
        pricing: 'मूल्य निर्धारण',
        safetyInfo: 'सुरक्षा और मीटिंग प्वाइंट',
        languages: 'भाषाएं',
        contact: 'संपर्क जानकारी',
        experience: 'अनुभव',
        years: 'साल',
        rating: 'रेटिंग',
        reviews: 'समीक्षा',
        mobileMenu: 'मेनू',
        bookNow: 'अभी बुक करें',
        contactVendor: 'विक्रेता से संपर्क करें',
        safetyBriefing: 'सुरक्षा ब्रीफिंग शामिल',
        meetingPoint: 'मिलन स्थान',
        languages: 'बोली जाने वाली भाषाएं',
        responseTime: 'प्रतिक्रिया समय',
        cancellation: 'रद्दीकरण नीति',
        phrasebook: 'स्थानीय वाक्यांश पुस्तक'
    }
};

const phrasebook = {
    en: {
        greeting: 'Hello! Nice to meet you.',
        thanks: 'Thank you very much.',
        water: 'May I have some water?',
        help: 'Can you help me?',
        photo: 'Can I take a photo?',
        toilet: 'Where is the toilet?'
    },
    as: {
        greeting: 'নমস্কাৰ! আপোনাক লগ পাই আনন্দিত।',
        thanks: 'আপোনালৈ ধন্যবাদ।',
        water: 'মোক পানী দিব পাৰিবনে?',
        help: 'আপনি মোক সহায়তা কৰিব পাৰিবেন?',
        photo: 'মই ছবি তুলিব পাৰোনে?',
        toilet: 'শৌচালয় কত?'
    },
    hi: {
        greeting: 'नमस्ते! आपसे मिलकर खुशी हुई।',
        thanks: 'आपको बहुत धन्यवाद।',
        water: 'क्या मुझे पानी मिल सकता है?',
        help: 'क्या आप मेरी मदद कर सकते हैं?',
        photo: 'क्या मैं फोटो ले सकता हूँ?',
        toilet: 'शौचालय कहाँ है?'
    }
};

const VendorProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vendor, setVendor] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [language, setLanguage] = useState<'en' | 'as' | 'hi'>('en');
    const [activeTab, setActiveTab] = useState<'about' | 'safety' | 'phrasebook'>('about');

    const t = translations[language];

    useEffect(() => {
        const loadVendor = async () => {
            if (!id) {
                setError('Missing vendor id');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const res = await fetch(`http://localhost:5000/api/merchant/${id}`);
                if (!res.ok) throw new Error('Vendor not found');
                const data = await res.json();
                setVendor(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load vendor');
            } finally {
                setLoading(false);
            }
        };

        loadVendor();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background pt-16 md:pt-20 pb-24 md:pb-0">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !vendor) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background pt-16 md:pt-20 pb-24 md:pb-0">
                <div className="text-center px-4">
                    <p className="text-destructive mb-4">{error || 'Vendor not found'}</p>
                    <Button onClick={() => navigate('/discover')}>Back to Discover</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-16 md:pt-20 pb-24 md:pb-0">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-16 md:top-20 z-40 bg-card/95 backdrop-blur-sm border-b border-border p-4"
            >
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold text-foreground">{t.aboutVendor}</h1>
                    <div className="w-10" />
                </div>

                {/* Language Selector */}
                <div className="flex gap-2 overflow-x-auto">
                    {(['en', 'as', 'hi'] as const).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition ${language === lang
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-foreground hover:bg-muted/80'
                                }`}
                        >
                            {lang === 'en' ? '🇬🇧 English' : lang === 'as' ? '🇮🇳 অসমীয়া' : '🇮🇳 हिंदी'}
                        </button>
                    ))}
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto p-4 space-y-6"
            >
                {/* Profile Header Card */}
                <div className="bg-card rounded-2xl p-6 shadow-card">
                    <div className="flex items-start gap-6 mb-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-5xl">
                                {vendor.businessName?.charAt(0).toUpperCase() || '🏘️'}
                            </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2 mb-2">
                                {vendor.businessName}
                                {vendor.isVerified && <BadgeCheck className="w-6 h-6 text-success" />}
                            </h2>
                            <p className="text-muted-foreground mb-3">{vendor.ownerName}</p>

                            {/* Rating & Reviews */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold text-foreground">4.8</span>
                                    <span className="text-muted-foreground text-sm">(24 {t.reviews})</span>
                                </div>
                                <div className="h-5 w-px bg-border" />
                                <div className="flex items-center gap-1">
                                    <span className="font-bold text-foreground">5+ {t.years}</span>
                                    <span className="text-muted-foreground text-sm">{t.experience}</span>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {vendor.isVerified && (
                                    <span className="text-xs bg-success/10 text-success px-3 py-1 rounded-full font-semibold">
                                        ✓ {t.aboutVendor}
                                    </span>
                                )}
                                {vendor.businessType && (
                                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                                        {vendor.businessType}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Price Info */}
                    {vendor.price && (
                        <div className="flex items-center gap-3 pt-6 border-t border-border">
                            <DollarSign className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">{t.pricing}</p>
                                <p className="text-2xl font-bold text-primary">₹{vendor.price}/person</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-border">
                    {(['about', 'safety', 'phrasebook'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 font-medium transition border-b-2 ${activeTab === tab
                                    ? 'text-primary border-primary'
                                    : 'text-muted-foreground hover:text-foreground border-transparent'
                                }`}
                        >
                            {tab === 'about' && t.aboutVendor}
                            {tab === 'safety' && t.safetyInfo}
                            {tab === 'phrasebook' && t.phrasebook}
                        </button>
                    ))}
                </div>

                {/* Tab Content - About */}
                {activeTab === 'about' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        {/* Bio */}
                        {vendor.bio && (
                            <div className="bg-card rounded-2xl p-6 shadow-card">
                                <h3 className="font-bold text-foreground mb-3">About</h3>
                                <p className="text-muted-foreground leading-relaxed">{vendor.bio}</p>
                            </div>
                        )}

                        {/* Description */}
                        {vendor.description && (
                            <div className="bg-card rounded-2xl p-6 shadow-card">
                                <h3 className="font-bold text-foreground mb-3">Details</h3>
                                <p className="text-muted-foreground leading-relaxed">{vendor.description}</p>
                            </div>
                        )}

                        {/* Contact Info */}
                        <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
                            <h3 className="font-bold text-foreground">{t.contact}</h3>

                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Email</p>
                                    <p className="font-medium text-foreground">{vendor.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Phone</p>
                                    <p className="font-medium text-foreground">{vendor.phone}</p>
                                </div>
                            </div>

                            {vendor.address && (
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-primary mt-1" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">{t.meetingPoint}</p>
                                        <p className="font-medium text-foreground">
                                            {vendor.address.street && `${vendor.address.street}, `}
                                            {vendor.address.city}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Tab Content - Safety */}
                {activeTab === 'safety' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                        {/* Safety Brief */}
                        <div className="bg-success/10 border border-success/20 rounded-2xl p-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-6 h-6 text-success mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-foreground mb-2">{t.safetyBriefing}</h3>
                                    <ul className="text-sm text-muted-foreground space-y-2">
                                        <li>✓ Safety orientation before experience starts</li>
                                        <li>✓ Emergency contact provided</li>
                                        <li>✓ Group size limited for safety</li>
                                        <li>✓ Weather-dependent experiences have backup plans</li>
                                        <li>✓ Insurance covered for all participants</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Meeting Point */}
                        <div className="bg-card rounded-2xl p-6 shadow-card">
                            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary" />
                                {t.meetingPoint}
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm font-medium text-foreground">Kamakhya Temple Main Gate</p>
                                    <p className="text-sm text-muted-foreground">Nilachal Hill, Guwahati</p>
                                    <p className="text-xs text-muted-foreground mt-1">Parking available • Wheelchair accessible</p>
                                </div>
                                <Button variant="outline" className="w-full gap-2">
                                    <MapPin className="w-4 h-4" />
                                    View on Map
                                </Button>
                            </div>
                        </div>

                        {/* Languages Spoken */}
                        <div className="bg-card rounded-2xl p-6 shadow-card">
                            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-primary" />
                                {t.languages}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['English', 'Assamese', 'Hindi', 'Bengali'].map((lang) => (
                                    <span
                                        key={lang}
                                        className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
                                    >
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Policies */}
                        <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
                            <div>
                                <h4 className="font-bold text-foreground mb-2">Response Time</h4>
                                <p className="text-sm text-muted-foreground">Usually replies within 2 hours</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground mb-2">{t.cancellation}</h4>
                                <p className="text-sm text-muted-foreground">
                                    Free cancellation up to 48 hours before experience
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Tab Content - Phrasebook */}
                {activeTab === 'phrasebook' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 text-primary" />
                                {t.phrasebook}
                            </h3>
                            <div className="space-y-4">
                                {Object.entries(phrasebook[language]).map(([key, phrase]) => (
                                    <div key={key} className="bg-card rounded-lg p-4">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </p>
                                        <p className="text-base font-medium text-foreground">{phrase}</p>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(phrase);
                                                alert('Copied!');
                                            }}
                                            className="text-xs text-primary mt-2 hover:underline"
                                        >
                                            Copy to clipboard
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* CTA Buttons */}
                <div className="flex gap-3 sticky bottom-0 bg-background p-4 rounded-t-2xl border-t border-border md:relative md:bottom-auto md:bg-transparent md:p-0 md:border-0">
                    <Button
                        onClick={() => navigate('/discover')}
                        variant="outline"
                        className="flex-1 h-12"
                    >
                        Back to Experiences
                    </Button>
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(vendor.email);
                            alert('Email copied to clipboard!');
                        }}
                        className="flex-1 h-12 gap-2"
                    >
                        <Mail className="w-4 h-4" />
                        Contact
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default VendorProfile;