const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');

// Get all itineraries
router.get('/', async (req, res) => {
  try {
    const itineraries = await Itinerary.find()
      .populate('experiences.experienceId')
      .sort({ createdAt: -1 });
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get itinerary by ID
router.get('/:id', async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id)
      .populate('experiences.experienceId');
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new itinerary
router.post('/add', async (req, res) => {
  const itinerary = new Itinerary(req.body);

  try {
    const newItinerary = await itinerary.save();
    res.status(201).json(newItinerary);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update itinerary
router.put('/:id', async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    Object.assign(itinerary, req.body);
    itinerary.updatedAt = Date.now();
    const updated = await itinerary.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete itinerary
router.delete('/:id', async (req, res) => {
  try {
    await Itinerary.findByIdAndDelete(req.params.id);
    res.json({ message: 'Itinerary deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get itineraries by difficulty
router.get('/filter/difficulty/:level', async (req, res) => {
  try {
    const level =
      req.params.level.charAt(0).toUpperCase() +
      req.params.level.slice(1).toLowerCase();

    const itineraries = await Itinerary.find({ difficulty: level })
      .populate('experiences.experienceId');

    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;