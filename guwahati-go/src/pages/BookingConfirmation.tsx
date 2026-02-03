import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Users, DollarSign, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchBookingConfirmation } from '@/api/booking.api';

const BookingConfirmation = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBooking = async () => {
            try {
                setLoading(true);
                if (bookingId) {
                    const data = await fetchBookingConfirmation(bookingId);
                    setBooking(data);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to load booking');
            } finally {
                setLoading(false);
            }
        };

        loadBooking();
    }, [bookingId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !booking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">{error || 'Booking not found'}</p>
                    <Button onClick={() => navigate('/discover')}>Back to Discover</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto p-4 pt-8"
            >
                {/* Success Badge */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Booking Requested!</h1>
                    <p className="text-muted-foreground">
                        The merchant will review and confirm your booking shortly.
                    </p>
                </div>

                {/* Confirmation Card */}
                <div className="bg-card rounded-2xl p-6 shadow-card mb-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Confirmation Number</p>
                            <p className="font-semibold text-foreground break-all">{booking.confirmationNumber}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Booking Date</p>
                            <p className="font-semibold text-foreground">
                                {new Date(booking.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Experience Details */}
                <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
                    <h2 className="font-semibold text-foreground mb-4">Experience Details</h2>
                    <div className="space-y-3">
                        <div className="flex items-start justify-between">
                            <span className="text-muted-foreground">Experience</span>
                            <span className="font-medium text-foreground text-right">
                                {booking.experience.title}
                            </span>
                        </div>
                        <div className="flex items-start justify-between">
                            <span className="text-muted-foreground">Area</span>
                            <span className="font-medium text-foreground">{booking.experience.area}</span>
                        </div>
                        <div className="flex items-start justify-between">
                            <span className="text-muted-foreground">Duration</span>
                            <span className="font-medium text-foreground">
                                {booking.experience.duration} minutes
                            </span>
                        </div>
                        <div className="flex items-start justify-between">
                            <span className="text-muted-foreground">Meeting Point</span>
                            <span className="font-medium text-foreground text-right">
                                {booking.experience.meetingPoint}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Booking Summary */}
                <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
                    <h2 className="font-semibold text-foreground mb-4">Booking Summary</h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Name</span>
                            <span className="font-medium text-foreground">{booking.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Email</span>
                            <span className="font-medium text-foreground">{booking.email}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Phone</span>
                            <span className="font-medium text-foreground">{booking.phone}</span>
                        </div>
                        <div className="border-t border-border pt-3 mt-3 flex items-center justify-between">
                            <span className="font-semibold text-foreground">Total Amount</span>
                            <span className="text-2xl font-bold text-primary">
                                ₹{booking.amount}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="bg-primary/10 border border-primary rounded-lg p-4 mb-6">
                    <p className="text-sm text-primary font-medium">
                        📋 Status: <span className="capitalize">{booking.status}</span>
                    </p>
                    <p className="text-xs text-primary/80 mt-1">
                        You'll receive a confirmation email once the merchant approves your booking.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Button
                        onClick={() => navigate('/discover')}
                        variant="outline"
                        className="flex-1 h-12"
                    >
                        Continue Exploring
                    </Button>
                    <Button
                        onClick={() => navigate('/bookings')}
                        className="flex-1 h-12"
                    >
                        View My Bookings
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default BookingConfirmation;