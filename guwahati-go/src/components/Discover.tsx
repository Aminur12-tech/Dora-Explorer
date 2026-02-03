import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, MapPin, Star, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchDiscoverExperiences } from '@/api/experience.api';

interface Experience {
    _id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    duration: number;
    rating: number;
    area: string;
    category: string;
    merchant: {
        businessName: string;
        isVerified: boolean;
    };
}

export const Discover = () => {
    const navigate = useNavigate();
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const loadExperiences = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchDiscoverExperiences();
                setExperiences(data);
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
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border p-4"
            >
                <h1 className="text-2xl font-bold text-foreground mb-4">Discover Experiences</h1>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
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
                                key={experience._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => navigate(`/experience/${experience._id}`)}
                                className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition cursor-pointer"
                            >
                                {/* Image */}
                                <div className="relative h-60 overflow-hidden bg-muted">
                                    <img
                                        src={experience.image}
                                        alt={experience.title}
                                        className="w-full h-full object-cover hover:scale-105 transition"
                                    />
                                    <div className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full">
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
                                            {experience.rating.toFixed(1)}
                                        </span>
                                    </div>

                                    <div className="flex items-start gap-2 text-xs text-muted-foreground mb-3">
                                        <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                                        <span className="line-clamp-1">{experience.area}</span>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-border">
                                        <span className="text-xs font-medium text-foreground">
                                            {experience.merchant.businessName}
                                        </span>
                                        {experience.merchant.isVerified && (
                                            <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">
                                                ✓ Verified
                                            </span>
                                        )}
                                    </div>
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