const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['beach', 'mountain', 'cultural', 'wildlife', 'adventure', 'city'],
    required: true
  },
  location: {
    province: String,
    district: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  images: [String],
  highlights: [String],
  bestTimeToVisit: String,
  howToReach: String,
  nearbyAttractions: [String],
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  offlineMapData: String, // For offline functionality
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Destination', destinationSchema);
