import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Calendar, Clock, MapPin, 
  QrCode, Download, Share2, MessageCircle 
} from 'lucide-react';
import { experiences } from '@/data/experiences';
import { Button } from '@/components/ui/button';

const BookingConfirmed = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const slot = searchParams.get('slot') || '10:00 AM';
  
  const experience = experiences.find((exp) => exp.id === id);

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Booking not found</p>
      </div>
    );
  }

  const bookingId = `GHY${Date.now().toString().slice(-6)}`;
  const today = new Date();
  const bookingDate = today.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Success Header */}
      <div className="bg-gradient-hero text-primary-foreground px-6 pt-12 pb-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex justify-center mb-4"
        >
          <div className="w-20 h-20 rounded-full bg-success flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-success-foreground" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-primary-foreground/80">
            Your authentic experience awaits
          </p>
        </motion.div>
      </div>

      {/* Booking Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="px-5 -mt-8"
      >
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          {/* Experience Image */}
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-40 object-cover"
          />

          <div className="p-5">
            <h2 className="text-xl font-bold text-foreground mb-4">
              {experience.title}
            </h2>

            {/* Booking Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium text-foreground">{bookingDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium text-foreground">{slot}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Meeting Point</p>
                  <p className="font-medium text-foreground">{experience.meetingPoint}</p>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="border-t border-dashed border-border pt-5">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground mb-1">Your Booking Token</p>
                <p className="text-lg font-bold text-primary">{bookingId}</p>
              </div>

              <div className="flex justify-center mb-4">
                <div className="w-40 h-40 bg-foreground rounded-xl flex items-center justify-center p-3">
                  <QrCode className="w-full h-full text-background" />
                </div>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Show this QR code to your host at the meeting point
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-5">
          <Button variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Contact Host */}
        <div className="bg-card rounded-2xl p-5 shadow-card mt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={experience.hostImage}
                alt={experience.hostName}
                className="w-12 h-12 rounded-full bg-muted"
              />
              <div>
                <p className="font-semibold text-foreground">{experience.hostName}</p>
                <p className="text-sm text-muted-foreground">Your Host</p>
              </div>
            </div>
            <Button className="btn-hero">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>
        </div>

        {/* Safety Tip */}
        <div className="bg-secondary/10 rounded-2xl p-4 mt-5">
          <p className="text-sm text-foreground">
            💡 <strong>Tip:</strong> Arrive 10 minutes early. Your host will identify you using the booking token.
          </p>
        </div>

        {/* Back to Home */}
        <Link to="/" className="block mt-6">
          <Button variant="ghost" className="w-full">
            Explore More Experiences
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default BookingConfirmed;
