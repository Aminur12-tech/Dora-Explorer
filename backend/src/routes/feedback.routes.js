const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const Booking = require('../models/Booking');

// Create feedback for an experience
router.post('/submit', async (req, res) => {
  try {
    const { bookingId, experienceId, userId, rating, title, comment, highlights, improvements, wouldRecommend } = req.body;

    // Check if booking exists and is completed
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.status !== 'paid') {
      return res.status(400).json({ message: 'Only completed bookings can have feedback' });
    }

    // Check if feedback already exists for this booking
    const existingFeedback = await Feedback.findOne({ bookingId });
    if (existingFeedback) {
      return res.status(400).json({ message: 'Feedback already submitted for this booking' });
    }

    const feedback = new Feedback({
      bookingId,
      experienceId,
      userId,
      rating,
      title,
      comment,
      highlights: highlights || [],
      improvements: improvements || [],
      wouldRecommend,
      status: 'submitted'
    });

    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get feedback by booking ID
router.get('/booking/:bookingId', async (req, res) => {
  try {
    const feedback = await Feedback.findOne({ bookingId: req.params.bookingId })
      .populate('experienceId')
      .populate('userId', 'name email');
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all feedback for an experience
router.get('/experience/:experienceId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ experienceId: req.params.experienceId })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    
    // Calculate average rating
    const avgRating = feedbacks.length > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : 0;

    res.json({
      totalFeedbacks: feedbacks.length,
      averageRating: parseFloat(avgRating),
      feedbacks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update feedback
router.put('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });

    Object.assign(feedback, req.body);
    await feedback.save();
    res.json({ message: 'Feedback updated', feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete feedback
router.delete('/:id', async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;