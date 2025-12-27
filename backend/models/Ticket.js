const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['national_park', 'museum', 'historical_site', 'attraction'],
    required: true
  },
  description: String,
  location: {
    city: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  images: [String],
  pricing: {
    adult: {
      local: Number,
      foreign: Number
    },
    child: {
      local: Number,
      foreign: Number
    }
  },
  openingHours: {
    weekdays: String,
    weekends: String
  },
  restrictions: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);
