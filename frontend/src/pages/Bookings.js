import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Chip,
  Button,
  CircularProgress
} from '@mui/material';
import QRCode from 'react-qr-code';
import { format } from 'date-fns';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/bookings`);
      setBookings(res.data.bookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>
        My Bookings
      </Typography>

      {bookings.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            You don't have any bookings yet
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} key={booking._id}>
              <Paper sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Chip
                        label={booking.bookingType}
                        color="primary"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={booking.status}
                        color={getStatusColor(booking.status)}
                      />
                    </Box>

                    <Typography variant="h6" gutterBottom>
                      {booking.hotelId?.name || booking.ticketId?.name || 'Booking'}
                    </Typography>

                    {booking.bookingType === 'hotel' && (
                      <>
                        <Typography variant="body2">
                          <strong>Room:</strong> {booking.roomType}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Check-in:</strong> {booking.checkIn ? format(new Date(booking.checkIn), 'PPP') : 'N/A'}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Check-out:</strong> {booking.checkOut ? format(new Date(booking.checkOut), 'PPP') : 'N/A'}
                        </Typography>
                      </>
                    )}

                    {booking.bookingType === 'ticket' && (
                      <>
                        <Typography variant="body2">
                          <strong>Visit Date:</strong> {booking.visitDate ? format(new Date(booking.visitDate), 'PPP') : 'N/A'}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Tickets:</strong> {booking.numberOfTickets}
                        </Typography>
                      </>
                    )}

                    <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                      Total: LKR {booking.totalAmount}
                    </Typography>
                  </Grid>

                  {booking.qrCode && (
                    <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" gutterBottom>
                        Your Ticket QR Code
                      </Typography>
                      <Box sx={{ p: 2, bgcolor: 'white', display: 'inline-block' }}>
                        <QRCode value={booking.qrCode} size={128} />
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Bookings;
