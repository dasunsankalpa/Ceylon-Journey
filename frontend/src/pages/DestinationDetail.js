import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, Grid, Paper, Chip, CircularProgress } from '@mui/material';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestination();
  }, [id]);

  const fetchDestination = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/destinations/${id}`);
      setDestination(res.data.destination);
    } catch (error) {
      console.error('Error fetching destination:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!destination) {
    return (
      <Container sx={{ my: 4 }}>
        <Typography variant="h5">Destination not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>
        {destination.name}
      </Typography>
      
      <Chip label={destination.category} color="primary" sx={{ mb: 3 }} />
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="body1" paragraph>
            {destination.description}
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            Highlights
          </Typography>
          <Box component="ul">
            {destination.highlights?.map((highlight, index) => (
              <li key={index}>
                <Typography variant="body1">{highlight}</Typography>
              </li>
            ))}
          </Box>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            Best Time to Visit
          </Typography>
          <Typography variant="body1" paragraph>
            {destination.bestTimeToVisit}
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
            How to Reach
          </Typography>
          <Typography variant="body1" paragraph>
            {destination.howToReach}
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Location
            </Typography>
            <Typography variant="body2">
              {destination.location?.district}, {destination.location?.province}
            </Typography>
          </Paper>

          {destination.nearbyAttractions && destination.nearbyAttractions.length > 0 && (
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Nearby Attractions
              </Typography>
              {destination.nearbyAttractions.map((attraction, index) => (
                <Chip key={index} label={attraction} sx={{ mr: 0.5, mb: 0.5 }} size="small" />
              ))}
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DestinationDetail;
