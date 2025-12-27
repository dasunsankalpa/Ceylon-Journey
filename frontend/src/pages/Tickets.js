import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, Button, Box, CircularProgress } from '@mui/material';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/tickets`);
      setTickets(res.data.tickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
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
        Tickets & Attractions
      </Typography>

      <Grid container spacing={3}>
        {tickets.map((ticket) => (
          <Grid item xs={12} sm={6} md={4} key={ticket._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {ticket.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {ticket.description}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Type:</strong> {ticket.type}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Location:</strong> {ticket.location?.city}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Adult (Foreign):</strong> LKR {ticket.pricing?.adult?.foreign}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Adult (Local):</strong> LKR {ticket.pricing?.adult?.local}
                  </Typography>
                </Box>
                <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                  Book Ticket
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Tickets;
