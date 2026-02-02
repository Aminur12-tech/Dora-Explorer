import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Shield, ThumbsUp, ThumbsDown } from 'lucide-react';
import { experiences } from '@/data/experiences';
import { StarRating } from '@/components/StarRating';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const Feedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [feltSafe, setFeltSafe] = useState<boolean | null>(null);
  const [review, setReview] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const experience = experiences.find((exp) => exp.id === id);

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Experience not found</p>
      </div>
    );
  }

  const handleSubmit = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-success mx-auto mb-6 flex items-center justify-center"
          >
            <CheckCircle className="w-10 h-10 text-success-foreground" />
          </motion.div>

          <h1 className="text-2xl font-bold text-foreground mb-3">
            Thank You!
          </h1>
          <p className="text-muted-foreground mb-6">
            Your feedback helps us improve and supports local hosts in Guwahati.
          </p>

          <Button onClick={() => navigate('/')} className="w-full btn-hero">
            Explore More Experiences
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground px-5 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-2xl font-bold">Share Feedback</h1>
        </div>

        <p className="text-primary-foreground/80">
          Your experience with {experience.hostName}
        </p>
      </div>

      {/* Content */}
      <div className="px-5 py-6 space-y-6">
        {/* Experience Card */}
        <div className="bg-card rounded-2xl p-4 shadow-card flex items-center gap-4">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div>
            <h3 className="font-semibold text-foreground">{experience.title}</h3>
            <p className="text-sm text-muted-foreground">{experience.hostName}</p>
          </div>
        </div>

        {/* Star Rating */}
        <div className="bg-card rounded-2xl p-6 shadow-card text-center">
          <h3 className="font-semibold text-foreground mb-4">
            How was your experience?
          </h3>
          <div className="flex justify-center">
            <StarRating rating={rating} onRatingChange={setRating} />
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            {rating === 0 && 'Tap to rate'}
            {rating === 1 && 'Poor'}
            {rating === 2 && 'Fair'}
            {rating === 3 && 'Good'}
            {rating === 4 && 'Very Good'}
            {rating === 5 && 'Excellent!'}
          </p>
        </div>

        {/* Safety Question */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <h3 className="font-semibold text-foreground">
              Did you feel safe?
            </h3>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFeltSafe(true)}
              className={`flex-1 py-4 rounded-xl border-2 flex items-center justify-center gap-2 font-medium transition-all ${
                feltSafe === true 
                  ? 'border-success bg-success/10 text-success' 
                  : 'border-border text-muted-foreground hover:border-success/50'
              }`}
            >
              <ThumbsUp className="w-5 h-5" />
              Yes
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFeltSafe(false)}
              className={`flex-1 py-4 rounded-xl border-2 flex items-center justify-center gap-2 font-medium transition-all ${
                feltSafe === false 
                  ? 'border-destructive bg-destructive/10 text-destructive' 
                  : 'border-border text-muted-foreground hover:border-destructive/50'
              }`}
            >
              <ThumbsDown className="w-5 h-5" />
              No
            </motion.button>
          </div>
        </div>

        {/* Written Review */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-3">
            Tell us more (optional)
          </h3>
          <Textarea
            placeholder="Share details about your experience..."
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={rating === 0 || feltSafe === null}
          className="w-full btn-hero h-14 disabled:opacity-50"
        >
          Submit Feedback
        </Button>
      </div>
    </div>
  );
};

export default Feedback;
