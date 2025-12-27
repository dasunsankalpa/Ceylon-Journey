import React, { useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, Grid } from '@mui/material';
import { toast } from 'react-toastify';

const Transport = () => {
  const [rideData, setRideData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    vehicleType: 'car'
  });

  const handleBookRide = async (e) => {
    e.preventDefault();
    // This would integrate with PickMe API
    toast.info('Transport booking feature coming soon!');
  };

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>
        Transport & Rides
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Book a Ride
            </Typography>
            
            <Box component="form" onSubmit={handleBookRide}>
              <TextField
                fullWidth
                label="Pickup Location"
                value={rideData.pickupLocation}
                onChange={(e) => setRideData({ ...rideData, pickupLocation: e.target.value })}
                required
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                label="Dropoff Location"
                value={rideData.dropoffLocation}
                onChange={(e) => setRideData({ ...rideData, dropoffLocation: e.target.value })}
                required
                sx={{ mb: 2 }}
              />
              
              <TextField
                fullWidth
                select
                label="Vehicle Type"
                value={rideData.vehicleType}
                onChange={(e) => setRideData({ ...rideData, vehicleType: e.target.value })}
                SelectProps={{ native: true }}
                sx={{ mb: 3 }}
              >
                <option value="car">Car</option>
                <option value="tuk-tuk">Tuk-Tuk</option>
                <option value="van">Van</option>
              </TextField>
              
              <Button type="submit" variant="contained" fullWidth size="large">
                Book Ride
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Transport Options
            </Typography>
            <Typography variant="body1" paragraph>
              • PickMe Integration - Book instant rides
            </Typography>
            <Typography variant="body1" paragraph>
              • Airport Transfers
            </Typography>
            <Typography variant="body1" paragraph>
              • City Tours
            </Typography>
            <Typography variant="body1" paragraph>
              • Long Distance Travel
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Transport;
