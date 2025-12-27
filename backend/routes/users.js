const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone, country, preferredLanguage } = req.body;

    req.user.name = name || req.user.name;
    req.user.phone = phone || req.user.phone;
    req.user.country = country || req.user.country;
    req.user.preferredLanguage = preferredLanguage || req.user.preferredLanguage;

    await req.user.save();

    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
