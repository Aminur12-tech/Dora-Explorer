import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Clock, Star, MapPin, Check,
  Share2, Heart, BadgeCheck, Users, Loader2, Calendar, DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchExperienceById } from '@/api/experience.api';
import { requestBooking } from '@/api/booking.api';

interface Experience {
  _id: string;
  title: string;
  description: string;
  image?: string;
  price: number;
  duration: number;
  rating: number;
  area: string;
  meetingPoint: string;
  merchantId: string;
  category?: string;
  highlights?: string[];
  included?: string[];
  notIncluded?: string[];
  maxParticipants?: number;
  minParticipants?: number;
  createdAt?: string;
  updatedAt?: string;
}

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [participants, setParticipants] = useState(1);

  // Fetch experience data
  useEffect(() => {
    const loadExperience = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await fetchExperienceById(id);
          setExperience(data);
          setParticipants(data.minParticipants || 1);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load experience');
      } finally {
        setLoading(false);
      }
    };

    loadExperience();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">{error || 'Experience not found'}</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours} hours`;
  };

  const handleBookNow = async () => {
    if (!selectedSlot) return;

    try {
      setIsBooking(true);
      const bookingData = {
        experienceId: experience._id,
        merchantId: experience.merchantId,
        name: 'User Name', // Get from auth/user context
        email: 'user@example.com', // Get from auth/user context
        phone: '9876543210', // Get from auth/user context
        amount: experience.price * participants,
        participants,
        notes: `Booking for ${selectedSlot}`
      };

      const response = await requestBooking(bookingData);
      navigate(`/booking-confirmed/${response.bookingId}?slot=${encodeURIComponent(selectedSlot)}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to request booking');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[350px]">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={experience.image || 'https://via.placeholder.com/400'}
          alt={experience.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-foreground/10" />

        {/* Top Navigation */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>

          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
            >
              <Share2 className="w-5 h-5 text-foreground" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-destructive text-destructive' : 'text-foreground'}`} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="px-5 -mt-8 relative"
      >
        {/* Title Card */}
        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-foreground">
                  {experience.title}
                </h1>
                {experience.category && (
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {experience.category}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm flex-wrap">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {formatDuration(experience.duration)}
                </span>
                <span className="flex items-center gap-1 text-success">
                  <Star className="w-4 h-4 fill-current" />
                  {experience.rating.toFixed(1)}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {experience.area}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">₹{experience.price}</p>
              <p className="text-xs text-muted-foreground">per person</p>
            </div>
          </div>

          <div className="verified-badge">
            <BadgeCheck className="w-4 h-4" />
            <span>Verified Local Host</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <h3 className="font-semibold text-foreground mb-3">About This Experience</h3>
          <p className="text-muted-foreground leading-relaxed">
            {experience.description}
          </p>
        </div>

        {/* What's Included & Not Included */}
        {(experience.included || experience.notIncluded) && (
          <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experience.included && experience.included.length > 0 && (
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5 text-success" />
                    What's Included
                  </h4>
                  <ul className="space-y-2">
                    {experience.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {experience.notIncluded && experience.notIncluded.length > 0 && (
                <div>
                  <h4 className="font-semibold text-foreground mb-3">What's Not Included</h4>
                  <ul className="space-y-2">
                    {experience.notIncluded.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Highlights */}
        {experience.highlights && experience.highlights.length > 0 && (
          <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
            <h3 className="font-semibold text-foreground mb-3">Highlights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {experience.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Meeting Point */}
        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <h3 className="font-semibold text-foreground mb-3">Meeting Point</h3>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium">{experience.meetingPoint}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Area: {experience.area}
              </p>
            </div>
          </div>
        </div>

        {/* Participants Selector */}
        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <h3 className="font-semibold text-foreground mb-3">Number of Participants</h3>
          <p className="text-xs text-muted-foreground mb-3">
            {experience.minParticipants && `Min: ${experience.minParticipants}`}
            {experience.maxParticipants && ` | Max: ${experience.maxParticipants}`}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setParticipants(Math.max(experience.minParticipants || 1, participants - 1))}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
            >
              −
            </button>
            <span className="text-xl font-semibold text-foreground w-8 text-center">
              {participants}
            </span>
            <button
              onClick={() => setParticipants(Math.min(experience.maxParticipants || 999, participants + 1))}
              className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
            >
              +
            </button>
            <span className="text-sm text-muted-foreground ml-auto">
              Total: ₹{(experience.price * participants).toFixed(0)}
            </span>
          </div>
        </div>

        {/* Date Selector */}
        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select Date
          </h3>
          <input
            type="date"
            value={selectedSlot || ''}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="w-full p-3 bg-muted rounded-lg border border-border focus:border-primary outline-none"
          />
        </div>

        {/* Experience Info */}
        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <h3 className="font-semibold text-foreground mb-3">Experience Details</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Duration</p>
              <p className="font-semibold text-foreground">{formatDuration(experience.duration)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Price per Person</p>
              <p className="font-semibold text-primary">₹{experience.price}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Rating</p>
              <p className="font-semibold text-foreground">{experience.rating.toFixed(1)} ⭐</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Category</p>
              <p className="font-semibold text-foreground">{experience.category || 'N/A'}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-3 mb-5">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </motion.div>

      {/* Fixed Book Now Button */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-area-inset-bottom"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-2xl font-bold text-primary">
                ₹{(experience.price * participants).toFixed(0)}
              </p>
              <p className="text-xs text-muted-foreground">for {participants} participant(s)</p>
            </div>
          </div>

          <Button
            onClick={handleBookNow}
            disabled={!selectedSlot || isBooking}
            className="w-full btn-hero h-14 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isBooking ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Requesting...
              </>
            ) : selectedSlot ? (
              `Request Booking`
            ) : (
              'Select a date'
            )}
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExperienceDetail;
