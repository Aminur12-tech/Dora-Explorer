import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Clock, Star, MapPin, Check, 
  Share2, Heart, BadgeCheck, Users, Loader2 
} from 'lucide-react';
import { experiences } from '@/data/experiences';
import { TimeSlotPicker } from '@/components/TimeSlotPicker';
import { Button } from '@/components/ui/button';

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const experience = experiences.find((exp) => exp.id === id);

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Experience not found</p>
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
    
    setIsBooking(true);
    // Simulate booking API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate(`/booking-confirmed/${experience.id}?slot=${encodeURIComponent(selectedSlot)}`);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[350px]">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={experience.image}
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
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {experience.title}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {formatDuration(experience.duration)}
                </span>
                <span className="flex items-center gap-1 text-success">
                  <Star className="w-4 h-4 fill-current" />
                  {experience.rating} ({experience.reviewCount})
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

        {/* Host Section */}
        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <h3 className="font-semibold text-foreground mb-4">Meet Your Host</h3>
          <div className="flex items-start gap-4">
            <img
              src={experience.hostImage}
              alt={experience.hostName}
              className="w-16 h-16 rounded-full bg-muted"
            />
            <div className="flex-1">
              <p className="font-semibold text-foreground">{experience.hostName}</p>
              <p className="text-sm text-muted-foreground italic mb-2">
                "Why I love GHY"
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {experience.hostBio}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <h3 className="font-semibold text-foreground mb-3">About This Experience</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {experience.description}
          </p>

          <h4 className="font-semibold text-foreground mb-2">Highlights</h4>
          <ul className="space-y-2">
            {experience.highlights.map((highlight, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-success" />
                </div>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Meeting Point */}
        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <h3 className="font-semibold text-foreground mb-3">Meeting Point</h3>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium">{experience.meetingPoint}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Exact location shared after booking
              </p>
            </div>
          </div>
          
          {/* Map Placeholder */}
          <div className="mt-4 h-32 bg-muted rounded-xl flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Map preview</p>
          </div>
        </div>

        {/* Time Slot Picker */}
        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <TimeSlotPicker
            slots={experience.timeSlots}
            selectedSlot={selectedSlot}
            onSelectSlot={setSelectedSlot}
            spotsLeft={experience.spotsLeft}
          />
        </div>
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
              <p className="text-2xl font-bold text-primary">₹{experience.price}</p>
              <p className="text-xs text-muted-foreground">per person</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{experience.spotsLeft} spots left</span>
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
                Booking...
              </>
            ) : selectedSlot ? (
              `Book for ${selectedSlot}`
            ) : (
              'Select a time slot'
            )}
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExperienceDetail;
