const express = require('express');
const router = express.Router();
const Experience  = require('../models/Experience');

// Get all activities (Discover)
router.get('/discover', async (req, res) => {
  try {
    const experiences = await Experience.find()
      .sort({ date: -1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get experience by ID
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Create new experience (Use My Time)
router.post('/add', async (req, res) => {
  const experience = new Experience(req.body);

  try {
    const newExperience = await experience.save();
    res.status(201).json(newExperience);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update experience
router.put('/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    Object.assign(experience, req.body);
    const updated = await experience.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete experience
router.delete('/:id', async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get experience statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Experience.aggregate([
      { $group: { _id: '$category', total: { $sum: '$duration' }, count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;