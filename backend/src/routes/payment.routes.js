const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getPaymentDetails } = require('../controllers/payment');

// Create Razorpay order
router.post('/create-order', createOrder);

// Verify payment signature
router.post('/verify', verifyPayment);

// Get payment details
router.get('/:paymentId', getPaymentDetails);

module.exports = router;
