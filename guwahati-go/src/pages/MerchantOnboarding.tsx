import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MerchantOnboarding = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [merchantId, setMerchantId] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    businessType: 'Culture',
    description: '',
    address: {
      street: '',
      city: 'Guwahati',
      state: 'Assam',
      country: 'India'
    },
    bio: '',
    tagline: '',
    price: 0
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/merchant/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMerchantId(data.merchant._id || data.merchant.id);
      setSuccess(true);
      setTimeout(() => navigate(`/merchant/${data.merchant._id || data.merchant.id}`), 2000);
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Dora Explorer!</h1>
          <p className="text-muted-foreground mb-6">Your merchant profile has been created.</p>
          <Button onClick={() => navigate(`/merchant/${merchantId}`)}>View Your Profile</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto p-4 pt-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Become a Local Host</h1>
        <p className="text-muted-foreground mb-6">Share your passion and earn with Dora Explorer</p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-card rounded-2xl p-6 shadow-card">
          {/* Business Name */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Business Name *</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Assam Heritage Walks"
            />
          </div>

          {/* Owner Name */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Your Name *</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Priyanka Das"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="9876543210"
              />
            </div>
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Business Type *</label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>Culture</option>
              <option>Adventure</option>
              <option>Food</option>
              <option>Wellness</option>
              <option>Craft</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Street Address</label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="123 Temple Road"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Short Bio *</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Tell us about your experience and passion..."
            />
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Tagline</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., 'Certified local heritage guide'"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Detailed description of your services..."
            />
          </div>

          {/* Price per Person */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Price per Person (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
              required
              className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., 499"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full h-12 text-base">
            {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating Profile...</> : 'Create Profile'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default MerchantOnboarding;
