const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// @route   GET /api/tickets
// @desc    Get all tickets/attractions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { type, city } = req.query;

    let query = { isActive: true };
    
    if (type) {
      query.type = type;
    }
    
    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }

    const tickets = await Ticket.find(query).sort({ name: 1 });

    res.json({
      success: true,
      count: tickets.length,
      tickets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/tickets/:id
// @desc    Get single ticket/attraction
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket/Attraction not found'
      });
    }

    res.json({
      success: true,
      ticket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
