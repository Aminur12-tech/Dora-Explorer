import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, Calendar, Users, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MyBookings = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                setLoading(true);
                // For demo, fetch all bookings (in production, filter by user)
                const res = await fetch('http://localhost:5000/api/booking');
                if (!res.ok) throw new Error('Failed to fetch bookings');
                const data = await res.json();
                setBookings(Array.isArray(data) ? data : []);
            } catch (err: any) {
                setError(err.message || 'Failed to load bookings');
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, []);

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
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
                </div>
            </motion.div>

            {error && (
                <div className="m-4 p-4 bg-destructive/10 border border-destructive rounded-lg">
                    <p className="text-sm text-destructive">{error}</p>
                </div>
            )}

            <div className="p-4">
                {bookings.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12"
                    >
                        <p className="text-muted-foreground mb-4">No bookings yet</p>
                        <Button onClick={() => navigate('/discover')}>Explore Experiences</Button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                    >
                        {bookings.map((booking, index) => (
                            <motion.div
                                key={booking._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card rounded-2xl p-4 shadow-card"
                            >
                                {/* Booking Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-bold text-foreground text-lg">
                                            {booking.experienceId?.title || 'Experience'}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Ref: {booking.bookingId}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed'
                                                ? 'bg-success/10 text-success'
                                                : booking.status === 'rejected'
                                                    ? 'bg-destructive/10 text-destructive'
                                                    : 'bg-yellow-500/10 text-yellow-600'
                                            }`}
                                    >
                                        {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || 'Pending'}
                                    </span>
                                </div>

                                {/* Booking Details */}
                                <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border">
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
                                        <p className="font-semibold text-foreground flex items-center gap-2">
                                            <Calendar className="w-4 h-4" /> {booking.slot}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Participants</p>
                                        <p className="font-semibold text-foreground flex items-center gap-2">
                                            <Users className="w-4 h-4" /> {booking.participants}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Guest Name</p>
                                        <p className="font-semibold text-foreground">{booking.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                                        <p className="font-bold text-primary text-lg">₹{booking.amount}</p>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="mb-4 pb-4 border-b border-border">
                                    <p className="text-xs text-muted-foreground mb-2">Contact</p>
                                    <p className="text-sm text-foreground">{booking.email}</p>
                                    <p className="text-sm text-foreground">{booking.phone}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    {booking.status === 'confirmed' && (
                                        <Button
                                            onClick={() => navigate(`/feedback/${booking.bookingId}`)}
                                            className="flex-1"
                                        >
                                            Leave Feedback
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => navigate(`/experience/${booking.experienceId?._id}`)}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        View Experience
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

export default MyBookings;