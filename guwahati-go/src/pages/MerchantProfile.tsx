import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, BadgeCheck, Mail, Phone, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MerchantProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [merchant, setMerchant] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadMerchant = async () => {
            if (!id) {
                setError('Missing merchant id');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const res = await fetch(`http://localhost:5000/api/merchant/${id}`);
                if (!res.ok) throw new Error('Merchant not found');
                const data = await res.json();
                setMerchant(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load merchant');
            } finally {
                setLoading(false);
            }
        };

        loadMerchant();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !merchant) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <p className="text-destructive mb-4">{error || 'Merchant not found'}</p>
                    <Button onClick={() => navigate('/discover')}>Back to Discover</Button>
                </div>
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
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-bold text-foreground">Host Profile</h1>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto p-4 pt-8"
            >
                {/* Profile Card */}
                <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
                    <div className="flex items-start gap-6 mb-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-4xl font-bold text-primary">
                                {merchant.businessName?.charAt(0) || 'H'}
                            </span>
                        </div>

                        {/* Name & Status */}
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
                                {merchant.businessName}
                                {merchant.isVerified && (
                                    <BadgeCheck className="w-8 h-8 text-success" />
                                )}
                            </h2>
                            <p className="text-muted-foreground mb-2">by {merchant.ownerName}</p>
                            {merchant.tagline && (
                                <p className="text-sm italic text-foreground mb-3">
                                    "{merchant.tagline}"
                                </p>
                            )}
                            <div className="flex gap-4">
                                {merchant.isVerified && (
                                    <span className="text-xs bg-success/10 text-success px-3 py-1 rounded-full font-semibold">
                                        ✓ Verified Host
                                    </span>
                                )}
                                {merchant.businessType && (
                                    <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold">
                                        {merchant.businessType}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    {merchant.bio && (
                        <div className="mb-6 pb-6 border-b border-border">
                            <h3 className="font-semibold text-foreground mb-2">About</h3>
                            <p className="text-muted-foreground leading-relaxed">{merchant.bio}</p>
                        </div>
                    )}

                    {/* Contact Information */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>

                        <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Email</p>
                                <p className="font-medium text-foreground">{merchant.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-primary" />
                            <div>
                                <p className="text-xs text-muted-foreground">Phone</p>
                                <p className="font-medium text-foreground">{merchant.phone}</p>
                            </div>
                        </div>

                        {merchant.address && (
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary mt-1" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Address</p>
                                    <p className="font-medium text-foreground">
                                        {merchant.address.street && `${merchant.address.street}, `}
                                        {merchant.address.city}, {merchant.address.state}, {merchant.address.country}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                {merchant.description && (
                    <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
                        <h3 className="font-semibold text-foreground mb-3">Details</h3>
                        <p className="text-muted-foreground leading-relaxed">{merchant.description}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                    <Button
                        onClick={() => navigate('/discover')}
                        className="flex-1 h-12"
                    >
                        View Experiences
                    </Button>
                    <Button
                        onClick={() => {
                            navigator.clipboard.writeText(merchant.email);
                            alert('Email copied!');
                        }}
                        variant="outline"
                        className="flex-1 h-12"
                    >
                        Contact Host
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default MerchantProfile;