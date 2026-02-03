const express = require('express');
const router = express.Router();
const Merchant = require('../models/Merchant');
const Booking = require('../models/Booking');
const Experience = require('../models/Experience');

// GET all merchants
router.get('/merchants', async (req, res) => {
    try {
        const merchants = await Merchant.find();
        res.json(merchants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all bookings
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('experienceId');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET experience stats
router.get('/stats', async (req, res) => {
    try {
        const total = await Experience.countDocuments();
        const byCategory = await Experience.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    avgPrice: { $avg: '$price' },
                    avgRating: { $avg: '$rating' }
                }
            }
        ]);

        res.json({ total, byCategory });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT approve merchant
router.put('/merchant/:id/approve', async (req, res) => {
    try {
        console.log('Approving merchant:', req.params.id);
        const merchant = await Merchant.findByIdAndUpdate(
            req.params.id,
            { isVerified: true, status: 'approved' },
            { new: true }
        );

        if (!merchant) {
            return res.status(404).json({ success: false, message: 'Merchant not found' });
        }

        res.json({ success: true, message: 'Merchant approved', merchant });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// PUT confirm booking
router.put('/booking/:id/confirm', async (req, res) => {
    try {
        console.log('Confirming booking:', req.params.id);
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: 'confirmed' },
            { new: true }
        ).populate('experienceId');

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.json({ success: true, message: 'Booking confirmed', booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// PUT reject booking
router.put('/booking/:id/reject', async (req, res) => {
    try {
        console.log('Rejecting booking:', req.params.id);
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected' },
            { new: true }
        ).populate('experienceId');

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.json({ success: true, message: 'Booking rejected', booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;