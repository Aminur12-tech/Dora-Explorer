import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Users, MapPin, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import brahmaputraSunset from '@/assets/brahmaputra-sunset.jpg';
import heroVideo from '@/assets/WhatsApp Video 2026-02-03 at 11.12.57 AM.mp4';
import gallery1 from '@/assets/kamakhya-temple.jpg';
import gallery2 from '@/assets/silk-weaving.jpg';
import gallery3 from '@/assets/spice-market.jpg';
import gallery4 from '@/assets/tea-tasting.jpg';
import gallery5 from '@/assets/tribal-art.jpg';
import gallery6 from '@/assets/Brahma2.jpeg';
const Landing = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: Compass,
            title: 'Discover Experiences',
            description: 'Explore 2-4 hour curated heritage & neighborhood experiences',
            image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop'
        },
        {
            icon: Users,
            title: 'Meet Local Hosts',
            description: 'Connect with verified local artisans and guides',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
        },
        {
            icon: MapPin,
            title: 'Safe Meeting Points',
            description: 'Clear locations with language support and safety briefings',
            image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop'
        },
        {
            icon: Star,
            title: 'Community Verified',
            description: 'Rated & reviewed by real travelers like you',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
        }
    ];

    const experiences = [
        {
            title: 'Kamakhya Temple Heritage Walk',
            duration: '90 mins',
            price: '₹499',
            rating: 4.8,
            image: gallery1,
            icon: '🏛️'
        },
        {
            title: 'Assam Tea Café Trail',
            duration: '120 mins',
            price: '₹599',
            rating: 4.9,
            image: gallery4,
            icon: '☕'
        },
        {
            title: 'Local Craft Workshop',
            duration: '180 mins',
            price: '₹799',
            rating: 4.7,
            image: gallery2,
            icon: '🎨'
        },
        {
            title: 'Street Food Adventure',
            duration: '150 mins',
            price: '₹549',
            rating: 4.9,
            image: gallery3,
            icon: '🍜'
        },
        {
            title: 'Brahmaputra River Cruise',
            duration: '180 mins',
            price: '₹899',
            rating: 4.8,
            image: brahmaputraSunset,
            icon: '🚤'
        },
        {
            title: 'Sunset Photography Tour',
            duration: '120 mins',
            price: '₹449',
            rating: 4.6,
            image: gallery6,
            icon: '📸'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted">
            {/* Hero Section with Image Background */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        preload="auto"
                        poster={brahmaputraSunset}
                        onError={(e) => console.error('Hero video error:', e)}
                        className="w-full h-full object-cover object-[center_75%]"
                    >
                        <source src={heroVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden z-0">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                        className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-4xl text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/40 mb-6 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-white">Explore Guwahati Like a Local</span>
                    </motion.div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                        Discover Hidden Gems in{' '}
                        <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                            Guwahati
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow">
                        Experience authentic heritage walks, local craft demos, and neighborhood adventures guided by verified local experts. Safe, curated, and unforgettable.
                    </p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button
                            onClick={() => navigate('/discover')}
                            className="h-14 px-8 text-lg"
                        >
                            Explore Experiences <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                        <Button
                            onClick={() => navigate('/merchant/onboard')}
                            variant="outline"
                            className="h-14 px-8 text-lg bg-white/10 text-white border-white/30 hover:bg-white/20"
                        >
                            Become a Host
                        </Button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20"
                    >
                        {[
                            { label: '8+', value: 'Experiences' },
                            { label: '10+', value: 'Local Hosts' },
                            { label: '4.8★', value: 'Avg Rating' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <p className="text-3xl md:text-4xl font-bold text-yellow-300">{stat.label}</p>
                                <p className="text-gray-200 mt-2">{stat.value}</p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section with Images */}
            <section className="relative py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Why Choose Dora Explorer?
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            We make it easy, safe, and authentic
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                className="bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:border-primary/50 transition"
                            >
                                {/* Feature Image */}
                                <div className="relative h-48 overflow-hidden bg-muted">
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-cover hover:scale-110 transition duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <feature.icon className="w-12 h-12 text-primary mb-3" />
                                    <h3 className="text-xl font-bold text-foreground mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Experiences Section */}
            <section className="relative py-20 px-4 bg-card/50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Featured Experiences
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Start your journey with these popular local adventures
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                    >
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -15, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                                className="bg-card rounded-2xl overflow-hidden shadow-card border border-border hover:border-primary/50 transition cursor-pointer"
                                onClick={() => navigate('/discover')}
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden bg-muted group">
                                    <img
                                        src={exp.image}
                                        alt={exp.title}
                                        className="w-full h-full object-cover group-hover:scale-125 transition duration-500"
                                    />

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                                    {/* Icon Badge */}
                                    <div className="absolute top-4 left-4 text-4xl bg-white/20 backdrop-blur-md px-3 py-2 rounded-full">
                                        {exp.icon}
                                    </div>

                                    {/* Price Badge */}
                                    <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md px-4 py-2 rounded-full">
                                        <p className="text-sm font-bold text-white">{exp.price}</p>
                                    </div>

                                    {/* Duration Badge */}
                                    <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                                        <p className="text-xs font-semibold text-white">{exp.duration}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="font-bold text-foreground mb-3 line-clamp-2 text-lg">
                                        {exp.title}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold">{exp.rating}</span>
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-center"
                    >
                        <Button
                            onClick={() => navigate('/discover')}
                            size="lg"
                            className="h-14 px-8 text-lg"
                        >
                            View All Experiences <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="relative py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                            Moments from Guwahati
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            A few snapshots of the city, local craft, and flavors.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                        {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6].map((src, i) => (
                            <div key={i} className="rounded-2xl overflow-hidden bg-muted shadow-card">
                                <img
                                    src={src}
                                    alt={`Guwahati ${i + 1}`}
                                    className="w-full h-48 object-cover hover:scale-105 transition duration-300"
                                    onError={(e) => { (e.target as any).src = brahmaputraSunset }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section with Images */}
            <section className="relative py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Traveler Stories
                        </h2>
                        <p className="text-xl text-muted-foreground">
                            Real experiences from real travelers
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-6"
                    >
                        {[
                            {
                                name: 'Sarah Johnson',
                                role: 'Travel Blogger',
                                text: 'The most authentic experience I\'ve had in any city!',
                                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
                                rating: 5
                            },
                            {
                                name: 'Amit Patel',
                                role: 'Software Engineer',
                                text: 'Incredible guides and amazing stories about local culture.',
                                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
                                rating: 5
                            },
                            {
                                name: 'Emma Wilson',
                                role: 'Student',
                                text: 'Best use of my weekend! Felt like a local for a day.',
                                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
                                rating: 5
                            }
                        ].map((testimonial, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="bg-card rounded-2xl p-6 shadow-card border border-border"
                            >
                                {/* Avatar & Info */}
                                <div className="flex items-center gap-4 mb-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        <div className="flex gap-1 mt-1">
                                            {Array(testimonial.rating).fill(0).map((_, j) => (
                                                <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Quote */}
                                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 px-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=600&fit=crop"
                        alt="Guwahati"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Ready to Explore?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8">
                            Discover authentic experiences and support local communities today.
                        </p>
                        <Button
                            onClick={() => navigate('/discover')}
                            className="h-14 px-8 text-lg"
                        >
                            Start Exploring <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-card border-t border-border py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src="/doraexplorer1.png"
                            alt="Dora Explorer"
                            className="w-12 h-12 rounded-lg object-cover shadow-md"
                        />
                        <div>
                            <span className="font-bold text-foreground text-lg">Dora Explorer</span>
                            <p className="text-xs text-muted-foreground">Authentic Local Experiences</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;