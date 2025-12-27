import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActions, Button, Box, CircularProgress, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/destinations`);
      setDestinations(res.data.destinations);
    } catch (error) {
      console.error('Error fetching destinations:', error);
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

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>
        Explore Sri Lanka
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        Discover the beautiful destinations across the island
      </Typography>

      <Grid container spacing={3}>
        {destinations.map((destination) => (
          <Grid item xs={12} sm={6} md={4} key={destination._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="div"
                sx={{ height: 200, bgcolor: 'grey.300' }}
                image={destination.images?.[0]}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {destination.name}
                </Typography>
                <Chip label={destination.category} size="small" color="primary" sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {destination.description?.substring(0, 120)}...
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/destinations/${destination._id}`} fullWidth variant="outlined">
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Destinations;
