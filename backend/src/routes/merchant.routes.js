const express = require('express');
const router = express.Router();
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

module.exports = router;