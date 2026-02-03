const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const Merchant = require('../models/Merchant');

// Get all experiences (Discover)
router.get('/discover', async (req, res) => {
  try {
    const experiences = await Experience.find({ status: 'active' })
      .populate('merchantId', 'businessName ownerName isVerified')
      .sort({ createdAt: -1 });

    // Format response to match frontend expectations
    const formattedExperiences = experiences.map((exp) => ({
      _id: exp._id,
      id: exp._id.toString(), // Include id field for compatibility
      title: exp.title,
      description: exp.description,
      image: exp.image,
      price: exp.price,
      duration: exp.duration,
      rating: exp.rating,
      reviewCount: exp.reviewCount || 0,
      area: exp.area,
      meetingPoint: exp.meetingPoint,
      category: exp.category,
      highlights: exp.highlights || [],
      included: exp.included || [],
      notIncluded: exp.notIncluded || [],
      minParticipants: exp.minParticipants,
      maxParticipants: exp.maxParticipants,
      merchantId: exp.merchantId?._id || exp.merchantId,
      merchant: {
        _id: exp.merchantId?._id,
        businessName: exp.merchantId?.businessName,
        ownerName: exp.merchantId?.ownerName,
        isVerified: exp.merchantId?.isVerified
      },
      createdAt: exp.createdAt,
      updatedAt: exp.updatedAt
    }));

    res.json(formattedExperiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get experience by ID
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id)
      .populate('merchantId', 'businessName ownerName isVerified email phone');

    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // Format single experience response
    const formattedExp = {
      _id: experience._id,
      id: experience._id.toString(),
      title: experience.title,
      description: experience.description,
      image: experience.image,
      price: experience.price,
      duration: experience.duration,
      rating: experience.rating,
      reviewCount: experience.reviewCount || 0,
      area: experience.area,
      meetingPoint: experience.meetingPoint,
      category: experience.category,
      highlights: experience.highlights || [],
      included: experience.included || [],
      notIncluded: experience.notIncluded || [],
      minParticipants: experience.minParticipants,
      maxParticipants: experience.maxParticipants,
      merchantId: experience.merchantId?._id || experience.merchantId,
      merchant: {
        _id: experience.merchantId?._id,
        businessName: experience.merchantId?.businessName,
        ownerName: experience.merchantId?.ownerName,
        isVerified: experience.merchantId?.isVerified,
        email: experience.merchantId?.email,
        phone: experience.merchantId?.phone
      },
      createdAt: experience.createdAt,
      updatedAt: experience.updatedAt
    };

    res.json(formattedExp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new experience (merchant)
router.post('/add', async (req, res) => {
  try {
    const experience = new Experience(req.body);
    await experience.save();
    res.status(201).json({
      message: 'Experience created successfully',
      experience
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update experience
router.put('/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json({
      message: 'Experience updated successfully',
      experience
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete experience
router.delete('/:id', async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get experience statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Experience.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          avgRating: { $avg: '$rating' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      total: await Experience.countDocuments(),
      byCategory: stats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Filter experiences by difficulty/category
router.get('/filter/difficulty/:level', async (req, res) => {
  try {
    const experiences = await Experience.find({ category: req.params.level })
      .populate('merchantId', 'businessName ownerName isVerified')
      .sort({ rating: -1 });

    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;