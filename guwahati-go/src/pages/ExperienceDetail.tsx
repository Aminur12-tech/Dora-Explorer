import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Clock, Star, MapPin, Check,
  Share2, Heart, BadgeCheck, Users, Loader2
} from 'lucide-react';
import Map from '@/components/Map';
import { TimeSlotPicker } from '@/components/TimeSlotPicker';
import { Button } from '@/components/ui/button';
import { fetchExperienceById, requestBooking } from '@/api/experience.api';

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [participants, setParticipants] = useState(1);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        if (!id) throw new Error('Missing id');
        const data = await fetchExperienceById(id);
        setExperience(data);
        setTimeSlots(data.timeSlots && data.timeSlots.length ? data.timeSlots : generateSlots());
      } catch (err: any) {
        setError(err.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

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
      const payload = {
        experienceId: experience._id || experience.id,
        slot: selectedSlot,
        participants,
        amount: experience.price * participants,
        name: 'Demo User',
        email: 'demo@example.com',
        phone: '9999999999'
      };
      const resp = await requestBooking(payload);
      navigate(`/booking-confirmed/${resp.bookingId || resp._id}?slot=${encodeURIComponent(selectedSlot)}`);
    } catch (err: any) {
      setError(err.message || 'Booking failed');
    } finally {
      setIsBooking(false);
    }
  };

  const generateSlots = (start = 9, end = 18, stepHours = 2) => {
    const slots: string[] = [];
    for (let h = start; h <= end; h += stepHours) {
      const hh = String(h).padStart(2, '0');
      slots.push(`${hh}:00`);
    }
    return slots;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  if (error || !experience) return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">{error || 'Experience not found'}</p></div>;

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="relative h-[40vh] min-h-[260px]">
        <motion.img initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }} src={experience.image} alt={experience.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-foreground/10" />
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card/90 flex items-center justify-center shadow-lg">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <div className="flex gap-2">
            <motion.button whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full bg-card/90 flex items-center justify-center shadow-lg"><Share2 className="w-5 h-5 text-foreground" /></motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsLiked(!isLiked)} className="w-10 h-10 rounded-full bg-card/90 flex items-center justify-center shadow-lg">
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-destructive text-destructive' : 'text-foreground'}`} />
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="px-5 -mt-8 relative">
        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-2">{experience.title}</h1>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground"><Clock className="w-4 h-4" />{formatDuration(experience.duration)}</span>
                <span className="flex items-center gap-1 text-success"><Star className="w-4 h-4 fill-current" />{experience.rating}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">₹{experience.price}</p>
              <p className="text-xs text-muted-foreground">per person</p>
            </div>
          </div>
          <div className="verified-badge flex items-center gap-2 text-sm text-muted-foreground"><BadgeCheck className="w-4 h-4" /> <span>Verified Local Host</span></div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <h3 className="font-semibold text-foreground mb-4">Meet Your Host</h3>
          <div className="flex items-start gap-4">
            <img src={experience.merchant?.image || experience.hostImage || ''} alt={experience.merchant?.businessName || experience.hostName} className="w-16 h-16 rounded-full bg-muted" />
            <div className="flex-1">
              <p className="font-semibold text-foreground">{experience.merchant?.businessName || experience.hostName}</p>
              <p className="text-sm text-muted-foreground italic mb-2">"{experience.merchant?.tagline || 'Local expert'}"</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{experience.merchant?.bio || experience.hostBio}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <h3 className="font-semibold text-foreground mb-3">About This Experience</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">{experience.description}</p>
          {experience.highlights?.length > 0 && <>
            <h4 className="font-semibold text-foreground mb-2">Highlights</h4>
            <ul className="space-y-2">
              {experience.highlights.map((h: string, i: number) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center"><Check className="w-3 h-3 text-success" /></div>
                  {h}
                </li>
              ))}
            </ul>
          </>}
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <h3 className="font-semibold text-foreground mb-3">Meeting Point</h3>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"><MapPin className="w-5 h-5 text-primary" /></div>
            <div>
              <p className="text-foreground font-medium">{experience.meetingPoint}</p>
              <p className="text-sm text-muted-foreground mt-1">Exact location shared after booking</p>
            </div>
          </div>
          <div className="mt-4">
            <Map latitude={experience.location?.lat || 26.1445} longitude={experience.location?.lng || 91.7362} title={experience.meetingPoint} />
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 shadow-card mb-5">
          <TimeSlotPicker slots={timeSlots} selectedSlot={selectedSlot} onSelectSlot={setSelectedSlot} spotsLeft={experience.spotsLeft || 10} />
        </div>
      </motion.div>

      <AnimatePresence>
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-area-inset-bottom">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-2xl font-bold text-primary">₹{(experience.price * participants).toFixed(0)}</p>
              <p className="text-xs text-muted-foreground">for {participants} participant(s)</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground"><Users className="w-4 h-4" /><span>{experience.spotsLeft || 10} spots left</span></div>
          </div>

          <Button onClick={handleBookNow} disabled={!selectedSlot || isBooking} className="w-full btn-hero h-14 text-base disabled:opacity-50 disabled:cursor-not-allowed">
            {isBooking ? (<><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Booking...</>) : selectedSlot ? `Book for ${selectedSlot}` : 'Select a time slot'}
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExperienceDetail;
