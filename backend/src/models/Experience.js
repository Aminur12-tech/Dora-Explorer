const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    image: {
      type: String, // image URL or uploaded file path
      default: ""
    },

    duration: {
      type: Number, // minutes
      required: true
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Temple",
        "Nature",
        "Culture",
        "Food",
        "Adventure",
        "Riverfront",
        "Wellness",
        "Other"
      ]
    },

    area: {
      type: String,
      required: true
    },

    meetingPoint: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    rating: {
      type: Number,
      default: 4.5
    },

    highlights: {
      type: [String],
      default: []
    },

    included: {
      type: [String],
      default: []
    },

    notIncluded: {
      type: [String],
      default: []
    },

    minParticipants: {
      type: Number,
      default: 1
    },

    maxParticipants: {
      type: Number,
      default: 10
    },

    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active'
    },

    reviewCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", ExperienceSchema);
