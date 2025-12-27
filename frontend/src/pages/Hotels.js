import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  Box,
  Rating,
  Chip,
  CircularProgress
} from '@mui/material';
import { LocationOn as LocationIcon } from '@mui/icons-material';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    rating: ''
  });

  useEffect(() => {
    fetchHotels();
  }, [filters]);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.city) params.city = filters.city;
      if (filters.rating) params.rating = filters.rating;

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/hotels`, { params });
      setHotels(res.data.hotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
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
        Hotels in Sri Lanka
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          label="Search by City"
          name="city"
          value={filters.city}
          onChange={handleFilterChange}
          size="small"
        />
        <TextField
          label="Minimum Rating"
          name="rating"
          type="number"
          value={filters.rating}
          onChange={handleFilterChange}
          size="small"
          inputProps={{ min: 0, max: 5, step: 0.5 }}
        />
      </Box>

      {/* Hotels Grid */}
      <Grid container spacing={3}>
        {hotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="div"
                sx={{ height: 200, bgcolor: 'grey.300' }}
                image={hotel.images?.[0]}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {hotel.name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {hotel.location?.city}
                  </Typography>
                </Box>

                <Rating value={hotel.rating} readOnly size="small" sx={{ mb: 1 }} />
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {hotel.description?.substring(0, 100)}...
                </Typography>

                {hotel.amenities?.slice(0, 3).map((amenity, index) => (
                  <Chip
                    key={index}
                    label={amenity}
                    size="small"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </CardContent>
              
              <CardActions>
                <Button
                  size="small"
                  component={Link}
                  to={`/hotels/${hotel._id}`}
                  fullWidth
                  variant="contained"
                >
                  View Details & Book
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {hotels.length === 0 && (
        <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
          No hotels found. Try adjusting your filters.
        </Typography>
      )}
    </Container>
  );
};

export default Hotels;
