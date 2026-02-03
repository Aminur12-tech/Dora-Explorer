import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeedbackPage = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('http://localhost:5000/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bookingId, rating, feedback })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setSuccess(true);
            setTimeout(() => navigate('/discover'), 2000);
        } catch (err: any) {
            alert('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-foreground mb-2">Thank You!</h1>
                    <p className="text-muted-foreground">Your feedback helps us improve</p>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto p-4 pt-8">
                <h1 className="text-2xl font-bold text-foreground mb-6 text-center">How was your experience?</h1>

                <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl p-6 shadow-card">
                    {/* Star Rating */}
                    <div className="text-center">
                        <div className="flex justify-center gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="transition transform hover:scale-110"
                                >
                                    <Star
                                        className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{rating > 0 ? `You rated ${rating} stars` : 'Select your rating'}</p>
                    </div>

                    {/* Feedback Text */}
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Tell us more (optional)</label>
                        <textarea
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            placeholder="What did you enjoy most? Any suggestions?"
                        />
                    </div>

                    <Button type="submit" disabled={rating === 0 || loading} className="w-full h-12">
                        {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</> : 'Submit Feedback'}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
};

export default FeedbackPage;