const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/hotels
// @desc    Get all hotels with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { city, minPrice, maxPrice, rating, page = 1, limit = 10 } = req.query;

    // Build query
    let query = { isActive: true };
    
    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }
    
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    // Execute query with pagination
    const hotels = await Hotel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ rating: -1 });

    const count = await Hotel.countDocuments(query);

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      hotels
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/hotels/:id
// @desc    Get single hotel
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    res.json({
      success: true,
      hotel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/hotels
// @desc    Create a new hotel
// @access  Private (hotel_partner, admin)
router.post('/', protect, authorize('hotel_partner', 'admin'), async (req, res) => {
  try {
    const hotelData = {
      ...req.body,
      partnerId: req.user.id
    };

    const hotel = await Hotel.create(hotelData);

    res.status(201).json({
      success: true,
      hotel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/hotels/:id
// @desc    Update hotel
// @access  Private (hotel_partner, admin)
router.put('/:id', protect, authorize('hotel_partner', 'admin'), async (req, res) => {
  try {
    let hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }

    // Check ownership
    if (hotel.partnerId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this hotel'
      });
    }

    hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      hotel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
