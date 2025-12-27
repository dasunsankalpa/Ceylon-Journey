import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', mt: 8, py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Sri Lanka Tourism
            </Typography>
            <Typography variant="body2">
              Your gateway to exploring the pearl of the Indian Ocean.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/destinations" color="inherit" display="block" sx={{ mb: 1 }}>
              Destinations
            </Link>
            <Link href="/hotels" color="inherit" display="block" sx={{ mb: 1 }}>
              Hotels
            </Link>
            <Link href="/tickets" color="inherit" display="block" sx={{ mb: 1 }}>
              Tickets
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">
              Email: info@srilankatourism.com
            </Typography>
            <Typography variant="body2">
              Phone: +94 11 234 5678
            </Typography>
          </Grid>
        </Grid>
        
        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            © {new Date().getFullYear()} Sri Lanka Tourism. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
