const mongoose = require("mongoose");

const MerchantSchema = new mongoose.Schema({
  name: String,
  bio: String,
  languages: [String],
  verified: Boolean
});

module.exports = mongoose.model("Merchant", MerchantSchema);
