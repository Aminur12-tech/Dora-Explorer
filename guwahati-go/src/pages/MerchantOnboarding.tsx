import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, User, Sparkles, 
  Shield, Wallet, Camera, Upload, CheckCircle,
  Phone, ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MerchantStepper } from '@/components/MerchantStepper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const stepLabels = ['Identity', 'Experience', 'Verify', 'Payout'];
const categories = [
  'Cultural Experience',
  'Food & Beverage',
  'Art & Craft',
  'Nature & Adventure',
  'Spiritual & Wellness',
  'Photography Tour'
];

const MerchantOnboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    language: 'Assamese',
    experienceTitle: '',
    category: '',
    duration: '',
    pricePerPerson: '',
    description: '',
    upiId: ''
  });

  const handleNext = async () => {
    if (currentStep === 4) {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsComplete(true);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate(-1);
    }
  };

  if (isComplete) {
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
            className="w-24 h-24 rounded-full bg-success mx-auto mb-6 flex items-center justify-center"
          >
            <CheckCircle className="w-12 h-12 text-success-foreground" />
          </motion.div>

          <h1 className="text-2xl font-bold text-foreground mb-3">
            Application Submitted!
          </h1>
          <p className="text-muted-foreground mb-6">
            Our local team will visit you for verification within 24 hours. 
            You'll receive an SMS confirmation shortly.
          </p>

          <div className="bg-secondary/10 rounded-2xl p-5 mb-6 text-left">
            <p className="text-sm text-muted-foreground mb-2">What happens next?</p>
            <ul className="space-y-2 text-sm text-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                Team verification visit (24-48 hours)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                Profile setup & photography
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary" />
                Go live & start hosting!
              </li>
            </ul>
          </div>

          <Button onClick={() => navigate('/')} className="w-full btn-hero">
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <div className="bg-gradient-hero text-primary-foreground px-5 pt-12 pb-8">
        <div className="flex items-center gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold">Join the Tribe</h1>
            <p className="text-primary-foreground/80 text-sm">
              Become a GHY-Go Local Host
            </p>
          </div>
        </div>

        <MerchantStepper 
          currentStep={currentStep} 
          totalSteps={4} 
          stepLabels={stepLabels}
        />
      </div>

      {/* Form Content */}
      <div className="px-5 py-6">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Your Identity</h2>
                  <p className="text-sm text-muted-foreground">Tell us about yourself</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <Button variant="outline" size="sm" className="whitespace-nowrap">
                      <Phone className="w-4 h-4 mr-1" />
                      Get OTP
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="language">Primary Language</Label>
                  <div className="relative">
                    <select
                      id="language"
                      value={formData.language}
                      onChange={(e) => setFormData({...formData, language: e.target.value})}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground appearance-none cursor-pointer"
                    >
                      <option>Assamese</option>
                      <option>Bengali</option>
                      <option>Hindi</option>
                      <option>English</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Your Experience</h2>
                  <p className="text-sm text-muted-foreground">What will you offer?</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Experience Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Authentic Assamese Cooking Class"
                    value={formData.experienceTitle}
                    onChange={(e) => setFormData({...formData, experienceTitle: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <div className="relative">
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground appearance-none cursor-pointer"
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <div className="relative">
                      <select
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground appearance-none cursor-pointer"
                      >
                        <option value="">Select</option>
                        <option value="60">1 Hour</option>
                        <option value="90">1.5 Hours</option>
                        <option value="120">2 Hours</option>
                        <option value="180">3 Hours</option>
                        <option value="240">4 Hours</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="price">Price per person</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                      <Input
                        id="price"
                        type="number"
                        placeholder="850"
                        className="pl-8"
                        value={formData.pricePerPerson}
                        onChange={(e) => setFormData({...formData, pricePerPerson: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Brief Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what guests will experience..."
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Verification</h2>
                  <p className="text-sm text-muted-foreground">For trust & safety</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Government ID (Aadhaar/PAN/Voter ID)</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Tap to upload or drag & drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG or PDF (max 5MB)
                    </p>
                  </div>
                </div>

                <div>
                  <Label>Profile Selfie</Label>
                  <div className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-secondary/50 transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Take a clear selfie
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Good lighting, face clearly visible
                    </p>
                  </div>
                </div>

                <div className="bg-secondary/10 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground">
                    🔒 Your documents are encrypted and only used for verification. 
                    We never share your personal information.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Payout Details</h2>
                  <p className="text-sm text-muted-foreground">How you'll get paid</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="upi">UPI ID</Label>
                  <Input
                    id="upi"
                    placeholder="yourname@okicici"
                    value={formData.upiId}
                    onChange={(e) => setFormData({...formData, upiId: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Earnings deposited within 24 hours of experience completion
                  </p>
                </div>

                <div className="bg-card rounded-xl p-5 shadow-card">
                  <h4 className="font-semibold text-foreground mb-3">Payout Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Your price</span>
                      <span className="text-foreground">₹{formData.pricePerPerson || '0'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform fee (10%)</span>
                      <span className="text-foreground">-₹{Math.round(Number(formData.pricePerPerson || 0) * 0.1)}</span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2 flex justify-between font-semibold">
                      <span className="text-foreground">You receive</span>
                      <span className="text-success">₹{Math.round(Number(formData.pricePerPerson || 0) * 0.9)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4">
                  <p className="text-sm text-foreground">
                    ✨ <strong>Bonus:</strong> Complete 10 experiences in your first month 
                    and get ₹1,000 bonus!
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="px-5 pt-4">
        <Button 
          onClick={handleNext} 
          disabled={isSubmitting}
          className="w-full btn-hero h-14"
        >
          {isSubmitting ? (
            'Submitting...'
          ) : currentStep === 4 ? (
            'Submit Application'
          ) : (
            <>
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MerchantOnboarding;
