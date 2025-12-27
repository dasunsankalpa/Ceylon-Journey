const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    city: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  images: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  amenities: [String],
  rooms: [{
    type: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    capacity: Number,
    available: {
      type: Boolean,
      default: true
    },
    description: String
  }],
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Hotel', hotelSchema);
