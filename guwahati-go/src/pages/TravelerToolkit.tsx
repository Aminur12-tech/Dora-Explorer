import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Globe, Shield, AlertTriangle,
  MapPin, Phone, Siren
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LanguageCard } from '@/components/LanguageCard';
import { TopNav } from '@/components/TopNav';
import { languagePhrases } from '@/data/experiences';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const TravelerToolkit = () => {
  const navigate = useNavigate();
  const [shareLocation, setShareLocation] = useState(false);
  const [activeTab, setActiveTab] = useState<'language' | 'safety'>('language');
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const handleLocationToggle = (checked: boolean) => {
    if (checked) {
      if (!('geolocation' in navigator)) {
        toast.error('Geolocation is not supported by your browser');
        return;
      }

      toast.loading('Starting live location sharing...', { id: 'location-toast' });

      const id = navigator.geolocation.watchPosition(
        (position) => {
          // In a real app, we would emit this to a socket/backend
          const { latitude, longitude } = position.coords;
          console.log('Sending location:', { latitude, longitude });

          if (!watchIdRef.current) {
            // Toast only on initial success to avoid spam, or update existing loading toast
            toast.success('Live location enabled! Sharing with your guide.', { id: 'location-toast' });
          }
          setShareLocation(true);
        },
        (error) => {
          console.error('Location error:', error);
          toast.error('Failed to get location. Please check permissions.', { id: 'location-toast' });
          setShareLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
      watchIdRef.current = id;
    } else {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      setShareLocation(false);
      toast.info('Stopped sharing live location');
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <Navbar/>
      <div className="bg-gradient-hero text-primary-foreground px-5 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h1 className="text-2xl font-bold">Traveler Toolkit</h1>
        </div>

        <p className="text-primary-foreground/80">
          Essential tools for a safe and enriching Guwahati experience
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="px-5 py-4">
        <div className="flex gap-2 p-1 bg-muted rounded-xl">
          <button
            onClick={() => setActiveTab('language')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${activeTab === 'language'
              ? 'bg-card shadow-sm text-foreground'
              : 'text-muted-foreground'
              }`}
          >
            <Globe className="w-4 h-4" />
            Language
          </button>
          <button
            onClick={() => setActiveTab('safety')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${activeTab === 'safety'
              ? 'bg-card shadow-sm text-foreground'
              : 'text-muted-foreground'
              }`}
          >
            <Shield className="w-4 h-4" />
            Safety
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5">
        {activeTab === 'language' ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="mb-4">
              <h2 className="text-lg font-bold text-foreground mb-1">
                Essential Assamese Phrases
              </h2>
              <p className="text-sm text-muted-foreground">
                Tap the expand button to show your host
              </p>
            </div>

            {languagePhrases.map((phrase, index) => (
              <motion.div
                key={phrase.english}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <LanguageCard
                  english={phrase.english}
                  assamese={phrase.assamese}
                  phonetic={phrase.phonetic}
                  audio={phrase.audio}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
          >
            {/* SOS Button */}
            <div className="text-center py-6">
              <h2 className="text-lg font-bold text-foreground mb-4">
                Emergency Assistance
              </h2>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="sos-button mx-auto flex items-center gap-3"
              >
                <Siren className="w-6 h-6" />
                SOS Emergency
              </motion.button>
              <p className="text-sm text-muted-foreground mt-3">
                Tap to alert local emergency contacts
              </p>
            </div>

            {/* Share Location */}
            <div className="bg-card rounded-2xl p-5 shadow-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Share Live Location</p>
                    <p className="text-sm text-muted-foreground">
                      Share with your host during experience
                    </p>
                  </div>
                </div>
                <Switch
                  checked={shareLocation}
                  onCheckedChange={handleLocationToggle}
                />
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-card rounded-2xl p-5 shadow-card">
              <h3 className="font-semibold text-foreground mb-4">
                Emergency Contacts
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Police</p>
                      <p className="text-sm text-muted-foreground">100</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Call</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Ambulance</p>
                      <p className="text-sm text-muted-foreground">108</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Call</Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">GHY-Go Support</p>
                      <p className="text-sm text-muted-foreground">+91 987 654 3210</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Call</Button>
                </div>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-secondary/10 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-2">Safety Tips</p>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Always verify host identity with booking token</li>
                    <li>• Share your plans with family/friends</li>
                    <li>• Keep valuables secure during market visits</li>
                    <li>• Stay hydrated and carry sunscreen</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>


    </div>
  );
};

export default TravelerToolkit;
