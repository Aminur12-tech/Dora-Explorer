const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Experience = require('../models/Experience');

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const { bookingId, rating, feedback } = req.body;

    if (!bookingId || !rating) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find booking and update feedback
    const booking = await Booking.findOneAndUpdate(
      { bookingId },
      { feedback, rating },
      { new: true }
    ).populate('experienceId');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Update experience ratings (simple average)
    const allRatings = await Booking.find({ experienceId: booking.experienceId._id, rating: { $exists: true, $ne: null } });
    const avgRating = allRatings.reduce((sum, b) => sum + b.rating, 0) / allRatings.length;

    await Experience.findByIdAndUpdate(booking.experienceId._id, { rating: avgRating });

    res.json({ success: true, message: 'Feedback submitted', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;