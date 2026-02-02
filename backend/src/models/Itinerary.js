const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  experiences: [
    {
      experienceId: mongoose.Schema.Types.ObjectId,
      order: Number,
      duration: Number,
      notes: String
    }
  ],
  totalDuration: Number,
  startDate: Date,
  endDate: Date,
  category: String,
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard']
  },
  rating: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Itinerary", ItinerarySchema);