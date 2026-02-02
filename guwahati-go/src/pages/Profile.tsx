import { motion } from 'framer-motion';
import { 
  User, Settings, Heart, Calendar, 
  Bell, HelpCircle, LogOut, ChevronRight,
  Star, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';

const menuItems = [
  { icon: Heart, label: 'Saved Experiences', path: '#' },
  { icon: Calendar, label: 'My Bookings', path: '#' },
  { icon: Bell, label: 'Notifications', path: '#' },
  { icon: Settings, label: 'Settings', path: '#' },
  { icon: HelpCircle, label: 'Help & Support', path: '#' },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Profile Header */}
      <div className="bg-gradient-hero text-primary-foreground px-5 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <User className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Guest User</h1>
            <p className="text-primary-foreground/80 text-sm flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Exploring Guwahati
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-primary-foreground/70">Experiences</p>
          </div>
          <div className="text-center border-x border-primary-foreground/20">
            <p className="text-2xl font-bold">0</p>
            <p className="text-xs text-primary-foreground/70">Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold flex items-center justify-center gap-1">
              <Star className="w-4 h-4" />--
            </p>
            <p className="text-xs text-primary-foreground/70">Avg Rating</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 -mt-4">
        <div className="bg-card rounded-2xl shadow-card p-4 flex gap-3">
          <Link to="/merchant" className="flex-1">
            <Button className="w-full btn-hero h-12 text-sm">
              Become a Host
            </Button>
          </Link>
          <Button variant="outline" className="flex-1 h-12 text-sm">
            Sign In
          </Button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-5 py-6">
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={item.path}>
                <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <span className="font-medium text-foreground">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </Link>
              {index < menuItems.length - 1 && (
                <div className="h-px bg-border mx-4" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 py-4 text-destructive font-medium">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>

      {/* App Info */}
      <div className="px-5 text-center">
        <p className="text-sm text-muted-foreground">
          GHY-Go v1.0.0
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Made with ❤️ in Guwahati
        </p>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
