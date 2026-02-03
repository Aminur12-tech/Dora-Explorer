import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Settings, Heart, Calendar,
  Bell, HelpCircle, LogOut, ChevronRight,
  Star, MapPin, Edit2, Mail, Phone, Share2, MessageCircle
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { TopNav } from '@/components/TopNav';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const menuItems = [
  { icon: Heart, label: 'Saved Experiences', path: '#' },
  { icon: Calendar, label: 'My Bookings', path: '/bookings' },
  { icon: Bell, label: 'Notifications', path: '#' },
  { icon: Settings, label: 'Settings', path: '#' },
  { icon: HelpCircle, label: 'Help & Support', path: '#' },
];

const Profile = () => {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Traveler User',
    bio: 'Exploring the hidden gems of Guwahati 🌍',
    email: 'user@example.com',
    phone: '+91 98765 43210',
    location: 'Guwahati, India',
    joined: 'Feb 2026'
  });

  const [editedData, setEditedData] = useState(userData);

  const handleSaveProfile = () => {
    setUserData(editedData);
    setIsEditMode(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <TopNav />
      {/* Header with cover */}
      <div className="relative">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40" />

        {/* Profile Info (Instagram Style) */}
        <div className="px-5 relative">
          <div className="flex flex-col items-center -mt-16 text-center">
            {/* Avatar */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/80 to-primary/40 border-4 border-background flex items-center justify-center shadow-lg"
            >
              <User className="w-14 h-14 text-white" />
            </motion.div>

            {/* Name & Bio */}
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-foreground">{userData.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{userData.bio}</p>
              <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3" />
                {userData.location}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 w-full justify-center">
              {!isEditMode ? (
                <>
                  <Button
                    onClick={() => setIsEditMode(true)}
                    variant="outline"
                    className="gap-2 flex-1 max-w-xs"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleSaveProfile}
                    className="flex-1 max-w-xs"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => {
                      setIsEditMode(false);
                      setEditedData(userData);
                    }}
                    variant="outline"
                    className="flex-1 max-w-xs"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-5 mt-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card rounded-2xl p-4 text-center shadow-card">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground mt-1">Experiences</p>
            </div>
            <div className="bg-card rounded-2xl p-4 text-center shadow-card">
              <p className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                4.8
              </p>
              <p className="text-xs text-muted-foreground mt-1">Avg Rating</p>
            </div>
            <div className="bg-card rounded-2xl p-4 text-center shadow-card">
              <p className="text-2xl font-bold text-primary">28</p>
              <p className="text-xs text-muted-foreground mt-1">Reviews</p>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-5 mt-6"
          >
            <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <input
                  type="text"
                  value={editedData.name}
                  onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                  className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Bio</label>
                <textarea
                  value={editedData.bio}
                  onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                  className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tell about yourself"
                  rows={3}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <input
                  type="email"
                  value={editedData.email}
                  onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                  className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </label>
                <input
                  type="tel"
                  value={editedData.phone}
                  onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                  className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </label>
                <input
                  type="text"
                  value={editedData.location}
                  onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                  className="w-full mt-2 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Contact Info Section */}
        {!isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-5 mt-6"
          >
            <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{userData.email}</p>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{userData.phone}</p>
                </div>
              </div>
              <div className="h-px bg-border" />
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="font-medium text-foreground">{userData.joined}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Menu Items */}
        <div className="px-5 py-6">
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
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
          <button className="w-full mt-4 flex items-center justify-center gap-2 py-4 text-destructive font-medium hover:bg-destructive/5 rounded-lg transition">
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
      </div>
    </div>
  );
};

export default Profile;
