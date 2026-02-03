import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gallery1 from '@/assets/kamakhya-temple.jpg';
import gallery2 from '@/assets/silk-weaving.jpg';
import gallery3 from '@/assets/spice-market.jpg';
import { Loader2, MapPin, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Discover = () => {
    const navigate = useNavigate();
    const [experiences, setExperiences] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const loadExperiences = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch('http://localhost:5000/api/experience/discover');
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setExperiences(Array.isArray(data) ? data : []);
            } catch (err: any) {
                setError(err.message || 'Failed to load experiences');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        loadExperiences();
    }, []);

    const categories = ['All', 'Temple', 'Food', 'Culture', 'Wellness', 'Riverfront'];

    const filteredExperiences = selectedCategory && selectedCategory !== 'All'
        ? experiences.filter(exp => exp.category === selectedCategory)
        : experiences;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20 md:pt-24">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border p-4"
            >
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-foreground">Discover</h1>
                    <Button
                        onClick={() => navigate('/merchant/onboard')}
                        variant="outline"
                        size="sm"
                    >
                        Become a Host
                    </Button>
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap transition ${selectedCategory === cat || (cat === 'All' && !selectedCategory)
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground hover:bg-muted/80'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </motion.div>

            {error && (
                <div className="m-4 p-4 bg-destructive/10 border border-destructive rounded-lg">
                    <p className="text-sm text-destructive">{error}</p>
                </div>
            )}

            {/* Experiences Grid */}
            {/* Small Gallery */}
            <div className="p-4">
                <div className="max-w-6xl mx-auto">
                    <h3 className="text-xl font-semibold text-foreground mb-4">Gallery</h3>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        {[gallery1, gallery2, gallery3].map((src, i) => (
                            <div key={i} className="rounded-lg overflow-hidden bg-muted">
                                <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-28 object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="p-4">
                {filteredExperiences.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground">No experiences found</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {filteredExperiences.map((experience, index) => (
                            <motion.div
                                key={experience._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => navigate(`/experience/${experience._id}`)}
                                className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition cursor-pointer"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden bg-muted">
                                    <img
                                        src={experience.image}
                                        alt={experience.title}
                                        className="w-full h-full object-cover hover:scale-105 transition"
                                        onError={(e) => {
                                            (e.target as any).src = 'https://via.placeholder.com/300x200?text=Experience';
                                        }}
                                    />
                                    <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full">
                                        <p className="text-sm font-semibold text-primary">₹{experience.price}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                                        {experience.title}
                                    </h3>

                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {experience.duration}m
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-current text-yellow-500" />
                                            {experience.rating?.toFixed(1) || 'N/A'}
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-2 text-xs text-muted-foreground mb-3">
                                        <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                        <span className="line-clamp-1">{experience.area}</span>
                                    </div>
                                </div>

                                {/* Merchant Info - Clickable */}
                                <div className="flex items-center justify-between pt-3 border-t border-border">
                                    <button
                                        onClick={() => {
                                            console.log('Vendor ID:', experience.merchant?._id);
                                            navigate(`/vendor/${experience.merchant?._id}`);
                                        }}
                                        className="text-xs font-medium text-foreground hover:text-primary transition cursor-pointer flex-1 text-left"
                                    >
                                        {experience.merchant?.businessName || 'Local Host'}
                                    </button>
                                    {experience.merchant?.isVerified && (
                                        <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">
                                            ✓ Verified
                                        </span>
                                    )}
                                </div>

                                {/* Button */}
                                <div className="p-4 pt-0">
                                    <Button
                                        className="w-full h-10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/experience/${experience._id}`);
                                        }}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Discover;