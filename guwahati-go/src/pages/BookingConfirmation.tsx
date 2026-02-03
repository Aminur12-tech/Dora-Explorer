import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchBookingConfirmation } from '@/api/booking.api';
import { initiateRazorpayPayment, generateOrderId, verifyPayment } from '@/utils/razorpay';
import { toast } from 'sonner';

const BookingConfirmation = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    useEffect(() => {
        const load = async () => {
            if (!bookingId) {
                setError('Missing booking id');
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const data = await fetchBookingConfirmation(bookingId);
                setBooking(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load booking');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [bookingId]);

    const handlePayment = async () => {
        if (!booking || !booking.amount) {
            toast.error('Invalid booking amount');
            return;
        }

        try {
            setIsProcessingPayment(true);
            console.log('[BookingConfirmation] Starting payment process for booking:', booking._id);

            // Generate order ID from backend
            const orderId = await generateOrderId(booking.amount);
            console.log('[BookingConfirmation] Order ID generated:', orderId);

            // Prepare Razorpay options
            const razorpayOptions = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1DP5MMOk9HrDPG',
                amount: booking.amount * 100, // Amount in paise
                currency: 'INR',
                name: 'Dora Explorer',
                description: `Booking for ${booking.experienceId?.title || 'Experience'}`,
                order_id: orderId,
                prefill: {
                    name: booking.travellerName || 'Guest',
                    email: booking.travellerEmail || 'user@example.com',
                    contact: booking.travellerPhone || '+91 9876543210',
                },
                notes: {
                    bookingId: booking._id,
                    experienceId: booking.experienceId?._id,
                },
                handler: async (response: any) => {
                    try {
                        console.log('[BookingConfirmation] Payment response received:', response);

                        // Verify payment with backend
                        const verified = await verifyPayment(
                            orderId,
                            response.razorpay_payment_id,
                            response.razorpay_signature
                        );

                        if (verified) {
                            setPaymentCompleted(true);
                            toast.success('Payment successful! Your booking is confirmed.');
                            console.log('[BookingConfirmation] Payment verified, redirecting to bookings');
                            setTimeout(() => {
                                navigate('/bookings');
                            }, 2000);
                        } else {
                            toast.error('Payment verification failed');
                            console.error('[BookingConfirmation] Payment verification returned false');
                        }
                    } catch (err: any) {
                        console.error('[BookingConfirmation] Error during payment verification:', err);
                        toast.error('Error verifying payment: ' + err.message);
                    }
                },
            };

            console.log('[BookingConfirmation] Razorpay options prepared:', {
                ...razorpayOptions,
                key: razorpayOptions.key.substring(0, 10) + '****',
            });

            // Initiate Razorpay payment
            await initiateRazorpayPayment(razorpayOptions);
        } catch (err: any) {
            console.error('[BookingConfirmation] Payment error:', err);
            toast.error('Error processing payment: ' + (err.message || 'Unknown error'));
        } finally {
            setIsProcessingPayment(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>;
    if (error || !booking) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <p className="text-destructive mb-4">{error || 'Booking not found'}</p>
                <Button onClick={() => navigate('/discover')}>Back to Discover</Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background pb-20">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto p-4 pt-8">
                <div className="text-center mb-8">
                    <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-foreground mb-2">Booking Requested!</h1>
                    <p className="text-muted-foreground">Booking reference: <span className="font-mono">{booking.bookingId || booking.bookingId}</span></p>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
                    <h2 className="font-semibold text-foreground mb-4">Booking Summary</h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Experience</span>
                            <span className="font-medium text-foreground">{booking.experienceId?.title || booking.experience?.title}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Slot</span>
                            <span className="font-medium text-foreground">{booking.slot}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Participants</span>
                            <span className="font-medium text-foreground">{booking.participants}</span>
                        </div>
                        <div className="border-t border-border pt-3 mt-3 flex items-center justify-between">
                            <span className="font-semibold text-foreground">Total Amount</span>
                            <span className="text-2xl font-bold text-primary">₹{booking.amount}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        onClick={() => navigate('/discover')}
                        variant="outline"
                        className="flex-1 h-12"
                    >
                        Continue Exploring
                    </Button>
                    <Button
                        onClick={handlePayment}
                        disabled={isProcessingPayment || paymentCompleted}
                        className="flex-1 h-12 gap-2"
                    >
                        {isProcessingPayment ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Processing...
                            </>
                        ) : paymentCompleted ? (
                            'Payment Done'
                        ) : (
                            <>
                                <CreditCard className="w-4 h-4" />
                                Pay ₹{booking.amount}
                            </>
                        )}
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default BookingConfirmation;