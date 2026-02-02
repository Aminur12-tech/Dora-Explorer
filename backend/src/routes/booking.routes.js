const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const Booking = require('../models/Booking');
const Experience = require('../models/Experience');

// Create booking + mock Razorpay order
router.post('/create', async (req, res) => {
  try {
    const { experienceId, name, email, phone, amount } = req.body;
    const experience = await Experience.findById(experienceId);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });

    const payAmount = typeof amount === 'number' ? amount : (experience.price || 0);
    const booking = new Booking({
      experienceId,
      name,
      email,
      phone,
      amount: payAmount,
      currency: 'INR',
      status: 'created'
    });

    // Mock Razorpay order creation
    const razorpayOrderId = 'order_' + crypto.randomBytes(10).toString('hex');
    booking.razorpayOrderId = razorpayOrderId;
    await booking.save();

    // Return order info that frontend will use to complete payment
    res.status(201).json({
      bookingId: booking._id,
      order: {
        id: razorpayOrderId,
        amount: Math.round(payAmount * 100), // paise
        currency: booking.currency,
        key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock'
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify payment (mock). Frontend posts payment_id, order_id, signature and bookingId.
router.post('/verify', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !bookingId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Mock verification: compute HMAC using RAZORPAY_KEY_SECRET if present, else accept a simple mock scheme
    const secret = process.env.RAZORPAY_KEY_SECRET || 'rzp_mock_secret';
    const expected = crypto.createHmac('sha256', secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expected === razorpay_signature) {
      booking.status = 'paid';
      booking.razorpayPaymentId = razorpay_payment_id;
      booking.razorpaySignature = razorpay_signature;
      await booking.save();
      return res.json({ message: 'Payment verified', booking });
    } else {
      booking.status = 'failed';
      await booking.save();
      return res.status(400).json({ message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('experienceId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get booking confirmation
router.get('/confirmed/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('experienceId');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.status !== 'paid') {
      return res.status(400).json({ message: 'Booking not confirmed. Payment pending.' });
    }

    // Return confirmation details
    res.json({
      success: true,
      bookingId: booking._id,
      confirmationNumber: 'CONF_' + booking._id.toString().slice(-8).toUpperCase(),
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      experience: {
        title: booking.experienceId.title,
        area: booking.experienceId.area,
        meetingPoint: booking.experienceId.meetingPoint,
        duration: booking.experienceId.duration
      },
      amount: booking.amount,
      currency: booking.currency,
      status: booking.status,
      createdAt: booking.createdAt,
      razorpayPaymentId: booking.razorpayPaymentId,
      message: 'Your booking is confirmed! Check your email for details.'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('experienceId')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel booking
router.put('/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

// Request a booking (user initiates)
router.post('/request', async (req, res) => {
  try {
    const { experienceId, userId, name, email, phone, amount, participants, notes } = req.body;
    const experience = await Experience.findById(experienceId);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });

    const booking = new Booking({
      experienceId,
      userId,
      merchantId: experience.merchantId,
      name,
      email,
      phone,
      amount: amount || experience.price,
      currency: 'INR',
      status: 'requested',
      participants,
      notes,
      requestedAt: new Date()
    });

    await booking.save();
    res.status(201).json({
      message: 'Booking requested successfully',
      bookingId: booking._id,
      status: 'requested',
      experience: {
        title: experience.title,
        area: experience.area
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Merchant confirms booking
router.put('/:id/confirm', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.status !== 'requested') {
      return res.status(400).json({ message: 'Only requested bookings can be confirmed' });
    }

    booking.status = 'confirmed';
    booking.confirmedAt = new Date();
    await booking.save();

    res.json({
      message: 'Booking confirmed by merchant',
      bookingId: booking._id,
      status: 'confirmed',
      confirmedAt: booking.confirmedAt,
      nextStep: 'User will proceed to payment'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;