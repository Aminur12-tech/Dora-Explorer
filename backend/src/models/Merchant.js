const mongoose = require('mongoose');

const MerchantSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true
    },
    ownerName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      required: true
    },
    businessType: {
      type: String,
      enum: ['Adventure', 'Food', 'Culture', 'Wellness', 'Sports', 'Other'],
      required: true
    },
    description: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    bankDetails: {
      accountHolderName: String,
      accountNumber: String,
      ifscCode: String,
      bankName: String
    },
    documents: {
      panCard: String, // file path or URL
      gstCertificate: String,
      businessLicense: String,
      identityProof: String
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'suspended'],
      default: 'pending'
    },
    commissionRate: {
      type: Number,
      default: 15 // percentage
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    rejectionReason: String,
    approvedAt: Date,
    rejectedAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model('Merchant', MerchantSchema);