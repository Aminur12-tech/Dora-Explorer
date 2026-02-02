const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    merchantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' },
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['requested', 'confirmed', 'paid', 'completed', 'cancelled', 'rejected'],
      default: 'requested'
    },
    requestedAt: { type: Date, default: Date.now },
    confirmedAt: Date,
    rejectedAt: Date,
    rejectionReason: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    notes: String,
    participants: Number // number of people
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', BookingSchema);