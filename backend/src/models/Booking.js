const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', required: true },
    slot: String,
    participants: Number,
    amount: Number,
    name: String,
    email: String,
    phone: String,
    bookingToken: {
      type: String,
      default: null,
      sparse: true,
      unique: true
    },
    status: { type: String, enum: ['pending', 'confirmed', 'rejected'], default: 'pending' }
  },
  { timestamps: true }
);

// Create sparse unique index on bookingToken
bookingSchema.index({ bookingToken: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model('Booking', bookingSchema);