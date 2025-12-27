const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

// @route   POST /api/payments/create-payment-intent
// @desc    Create payment intent for Stripe
// @access  Private
router.post('/create-payment-intent', protect, async (req, res) => {
  try {
    const { amount, currency, bookingId } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: currency || 'lkr',
      metadata: {
        bookingId,
        userId: req.user.id
      }
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   POST /api/payments/confirm
// @desc    Confirm payment and update booking
// @access  Private
router.post('/confirm', protect, async (req, res) => {
  try {
    const { bookingId, paymentIntentId } = req.body;

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update booking
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          paymentStatus: 'paid',
          status: 'confirmed',
          paymentId: paymentIntentId
        },
        { new: true }
      );

      res.json({
        success: true,
        message: 'Payment confirmed successfully',
        booking
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment not successful'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
