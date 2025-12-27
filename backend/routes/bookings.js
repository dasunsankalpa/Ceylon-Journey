const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const QRCode = require('qrcode');
const { protect } = require('../middleware/auth');

// @route   POST /api/bookings
// @desc    Create a new booking
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      userId: req.user.id
    };

    const booking = await Booking.create(bookingData);

    // Generate QR code for ticket bookings
    if (booking.bookingType === 'ticket') {
      const qrData = {
        bookingId: booking._id,
        userId: booking.userId,
        ticketId: booking.ticketId,
        visitDate: booking.visitDate,
        numberOfTickets: booking.numberOfTickets
      };
      
      const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
      booking.qrCode = qrCode;
      await booking.save();
    }

    res.status(201).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/bookings
// @desc    Get all bookings for logged in user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('hotelId')
      .populate('ticketId')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get single booking
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('hotelId')
      .populate('ticketId');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking
// @access  Private
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
