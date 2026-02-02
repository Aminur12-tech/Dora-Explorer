const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    experienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Experience', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: String,
    comment: String,
    highlights: [String], // e.g. ["Great Guide", "Beautiful Views"]
    improvements: [String], // e.g. ["Better timing", "More snacks"]
    wouldRecommend: Boolean,
    status: {
      type: String,
      enum: ['pending', 'submitted', 'reviewed'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', FeedbackSchema);