const express = require('express');
const router = express.Router();
const axios = require('axios');
const { protect } = require('../middleware/auth');

// @route   POST /api/transport/pickme/book
// @desc    Book a PickMe ride
// @access  Private
router.post('/pickme/book', protect, async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation, vehicleType } = req.body;

    // Call PickMe API (example - adjust based on actual API documentation)
    const pickmeResponse = await axios.post(
      `${process.env.PICKME_API_URL}/rides/book`,
      {
        pickup: pickupLocation,
        dropoff: dropoffLocation,
        vehicle_type: vehicleType,
        customer_id: req.user.id
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.PICKME_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      ride: pickmeResponse.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/transport/pickme/estimate
// @desc    Get ride estimate
// @access  Public
router.get('/pickme/estimate', async (req, res) => {
  try {
    const { pickupLat, pickupLng, dropoffLat, dropoffLng } = req.query;

    // Call PickMe API for estimate
    const estimate = await axios.get(
      `${process.env.PICKME_API_URL}/rides/estimate`,
      {
        params: {
          pickup_lat: pickupLat,
          pickup_lng: pickupLng,
          dropoff_lat: dropoffLat,
          dropoff_lng: dropoffLng
        },
        headers: {
          'Authorization': `Bearer ${process.env.PICKME_API_KEY}`
        }
      }
    );

    res.json({
      success: true,
      estimate: estimate.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
