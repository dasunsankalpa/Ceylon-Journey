const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookingType: {
    type: String,
    enum: ['hotel', 'transport', 'ticket', 'package'],
    required: true
  },
  // For hotel bookings
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel'
  },
  roomType: String,
  checkIn: Date,
  checkOut: Date,
  
  // For transport bookings
  transportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transport'
  },
  pickupLocation: String,
  dropoffLocation: String,
  travelDate: Date,
  
  // For ticket bookings
  ticketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket'
  },
  visitDate: Date,
  numberOfTickets: Number,
  
  // Common fields
  totalAmount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'LKR'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  paymentId: String,
  qrCode: String, // For digital tickets
  guests: Number,
  specialRequests: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
