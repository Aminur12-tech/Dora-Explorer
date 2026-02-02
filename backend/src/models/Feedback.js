const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  bookingId: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
