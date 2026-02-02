const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    // User & Experience Info
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    experienceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
      required: true
    },
    experienceName: {
      type: String,
      required: true
    },

    // Booking Details
    travelDate: {
      type: Date,
      required: true
    },
    slot: {
      type: String
    },
    numberOfPeople: {
      type: Number,
      required: true
    },

    // Pricing
    pricePerPerson: {
      type: Number
    },
    totalAmount: {
      type: Number,
      required: true
    },

    // Customer Details
    customerName: {
      type: String,
      required: true
    },
    customerEmail: {
      type: String
    },
    customerPhone: {
      type: String,
      required: true
    },

    // Payment & Status
    paymentMethod: {
      type: String,
      enum: ["UPI", "CARD", "NET_BANKING", "CASH"]
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending"
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending"
    },

    // System-generated
    bookingToken: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", BookingSchema);
