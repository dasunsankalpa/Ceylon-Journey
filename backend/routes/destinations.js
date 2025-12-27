const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');

// @route   GET /api/destinations
// @desc    Get all destinations
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, popular } = req.query;

    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (popular === 'true') {
      query.isPopular = true;
    }

    const destinations = await Destination.find(query).sort({ 'ratings.average': -1 });

    res.json({
      success: true,
      count: destinations.length,
      destinations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/destinations/:id
// @desc    Get single destination
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found'
      });
    }

    res.json({
      success: true,
      destination
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
