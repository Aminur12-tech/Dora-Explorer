const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema({
  title: String,
  duration: Number,
  category: String,
  area: String,
  price: Number,
  rating: Number,
  meetingPoint: String,
  merchantId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("Experience", ExperienceSchema);
