const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    amount: { type: Number, required: true }, // in main currency units (e.g. 150)
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['pending', 'created', 'paid', 'failed', 'cancelled'],
      default: 'pending'
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', BookingSchema);
