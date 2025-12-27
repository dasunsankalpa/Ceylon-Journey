import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextField,
  CircularProgress,
  Rating,
  Chip
} from '@mui/material';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const HotelDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    roomType: '',
    guests: 1
  });

  useEffect(() => {
    fetchHotelDetails();
  }, [id]);

  const fetchHotelDetails = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/hotels/${id}`);
      setHotel(res.data.hotel);
    } catch (error) {
      console.error('Error fetching hotel:', error);
      toast.error('Failed to load hotel details');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to make a booking');
      return;
    }

    try {
      const selectedRoom = hotel.rooms.find(r => r.type === bookingData.roomType);
      
      const booking = {
        bookingType: 'hotel',
        hotelId: hotel._id,
        roomType: bookingData.roomType,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        totalAmount: selectedRoom?.price || 0
      };

      await axios.post(`${process.env.REACT_APP_API_URL}/bookings`, booking);
      toast.success('Booking created successfully!');
      setBookingData({ checkIn: '', checkOut: '', roomType: '', guests: 1 });
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!hotel) {
    return (
      <Container sx={{ my: 4 }}>
        <Typography variant="h5">Hotel not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ my: 4 }}>
      <Grid container spacing={4}>
        {/* Hotel Details */}
        <Grid item xs={12} md={8}>
          <Typography variant="h3" gutterBottom>
            {hotel.name}
          </Typography>
          
          <Rating value={hotel.rating} readOnly sx={{ mb: 2 }} />
          
          <Typography variant="body1" paragraph>
            {hotel.description}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Location
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {hotel.location?.address}, {hotel.location?.city}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Amenities
          </Typography>
          <Box sx={{ mb: 2 }}>
            {hotel.amenities?.map((amenity, index) => (
              <Chip key={index} label={amenity} sx={{ mr: 1, mb: 1 }} />
            ))}
          </Box>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Available Rooms
          </Typography>
          {hotel.rooms?.map((room, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">{room.type}</Typography>
              <Typography variant="body2" color="text.secondary">
                {room.description}
              </Typography>
              <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                LKR {room.price} / night
              </Typography>
              <Typography variant="body2">
                Capacity: {room.capacity} guests
              </Typography>
            </Paper>
          ))}
        </Grid>

        {/* Booking Form */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h5" gutterBottom>
              Book This Hotel
            </Typography>
            
            <Box component="form" onSubmit={handleBooking}>
              <TextField
                fullWidth
                label="Check-in Date"
                type="date"
                value={bookingData.checkIn}
                onChange={(e) => setBookingData({ ...bookingData, checkIn: e.target.value })}
                required
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Check-out Date"
                type="date"
                value={bookingData.checkOut}
                onChange={(e) => setBookingData({ ...bookingData, checkOut: e.target.value })}
                required
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                select
                label="Room Type"
                value={bookingData.roomType}
                onChange={(e) => setBookingData({ ...bookingData, roomType: e.target.value })}
                required
                SelectProps={{ native: true }}
                sx={{ mb: 2 }}
              >
                <option value="">Select Room Type</option>
                {hotel.rooms?.map((room, index) => (
                  <option key={index} value={room.type}>
                    {room.type} - LKR {room.price}
                  </option>
                ))}
              </TextField>
              
              <TextField
                fullWidth
                label="Number of Guests"
                type="number"
                value={bookingData.guests}
                onChange={(e) => setBookingData({ ...bookingData, guests: e.target.value })}
                required
                inputProps={{ min: 1 }}
                sx={{ mb: 3 }}
              />
              
              <Button type="submit" variant="contained" fullWidth size="large">
                Book Now
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HotelDetail;
