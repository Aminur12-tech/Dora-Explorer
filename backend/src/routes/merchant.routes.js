const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Experience = require('../models/Experience');
const Booking = require('../models/Booking');
const Merchant = require('../models/Merchant');

// Submit merchant onboarding form
router.post('/onboard', async (req, res) => {
  try {
    const {
      businessName,
      ownerName,
      email,
      phone,
      businessType,
      description,
      address,
      bankDetails,
      documents
    } = req.body;

    // Check if merchant already exists
    const existingMerchant = await Merchant.findOne({ email });
    if (existingMerchant) {
      return res.status(400).json({ message: 'Merchant with this email already exists' });
    }

    // Validate required fields
    if (!businessName || !ownerName || !email || !phone || !businessType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const merchant = new Merchant({
      businessName,
      ownerName,
      email,
      phone,
      businessType,
      description,
      address,
      bankDetails,
      documents,
      status: 'pending'
    });

    await merchant.save();

    res.status(201).json({
      message: 'Onboarding form submitted successfully',
      merchantId: merchant._id,
      status: merchant.status,
      nextStep: 'Your application is under review. You will be notified once approved.'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get merchant by ID
router.get('/:id', async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) return res.status(404).json({ message: 'Merchant not found' });
    res.json(merchant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all merchants (admin only)
router.get('/', async (req, res) => {
  try {
    const merchants = await Merchant.find().sort({ createdAt: -1 });
    res.json(merchants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve merchant (admin)
router.put('/:id/approve', async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) return res.status(404).json({ message: 'Merchant not found' });

    merchant.status = 'approved';
    merchant.isVerified = true;
    merchant.approvedAt = new Date();
    await merchant.save();

    res.json({
      message: 'Merchant approved successfully',
      merchant
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject merchant (admin)
router.put('/:id/reject', async (req, res) => {
  try {
    const { reason } = req.body;
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) return res.status(404).json({ message: 'Merchant not found' });

    merchant.status = 'rejected';
    merchant.rejectionReason = reason || 'Documents do not meet requirements';
    merchant.rejectedAt = new Date();
    await merchant.save();

    res.json({
      message: 'Merchant rejected',
      merchant
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update merchant profile
router.put('/:id', async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) return res.status(404).json({ message: 'Merchant not found' });

    Object.assign(merchant, req.body);
    await merchant.save();
    res.json({ message: 'Merchant updated', merchant });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// simple disk storage for merchant documents
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/merchants'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}_${Date.now()}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Public merchant profile (safe fields only)
router.get('/public/:id', async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id).select(
      '-bankDetails -documents.identityProof -documents.panCard -documents.gstCertificate -documents.businessLicense -email -phone'
    );
    if (!merchant) return res.status(404).json({ message: 'Merchant not found' });
    res.json(merchant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload merchant documents
router.post('/:id/upload-docs', upload.fields([
  { name: 'panCard', maxCount: 1 },
  { name: 'gstCertificate', maxCount: 1 },
  { name: 'businessLicense', maxCount: 1 },
  { name: 'identityProof', maxCount: 1 }
]), async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) return res.status(404).json({ message: 'Merchant not found' });

    const files = req.files || {};
    if (files.panCard) merchant.documents.panCard = `/uploads/merchants/${files.panCard[0].filename}`;
    if (files.gstCertificate) merchant.documents.gstCertificate = `/uploads/merchants/${files.gstCertificate[0].filename}`;
    if (files.businessLicense) merchant.documents.businessLicense = `/uploads/merchants/${files.businessLicense[0].filename}`;
    if (files.identityProof) merchant.documents.identityProof = `/uploads/merchants/${files.identityProof[0].filename}`;

    await merchant.save();
    res.json({ message: 'Documents uploaded', documents: merchant.documents });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add experience for merchant
router.post('/:id/experience', async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) return res.status(404).json({ message: 'Merchant not found' });

    const experience = new Experience({
      ...req.body,
      merchantId: merchant._id
    });

    await experience.save();
    res.status(201).json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// List merchant experiences
router.get('/:id/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find({ merchantId: req.params.id }).sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Merchant stats: earnings and bookings
router.get('/:id/stats', async (req, res) => {
  try {
    const expDocs = await Experience.find({ merchantId: req.params.id }, { _id: 1 });
    const expIds = expDocs.map(e => e._id);

    const agg = await Booking.aggregate([
      { $match: { experienceId: { $in: expIds }, status: { $in: ['paid', 'completed'] } } },
      { $group: { _id: null, totalEarnings: { $sum: '$amount' }, bookingsCount: { $sum: 1 } } }
    ]);

    const result = agg[0] || { totalEarnings: 0, bookingsCount: 0 };
    res.json({
      merchantId: req.params.id,
      totalEarnings: result.totalEarnings,
      bookingsCount: result.bookingsCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;