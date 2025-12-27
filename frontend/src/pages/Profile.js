import React, { useContext, useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    country: user?.country || '',
    preferredLanguage: user?.preferredLanguage || 'en'
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    toast.info('Profile update feature coming soon!');
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>
        My Profile
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleUpdate}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Email"
            value={user?.email}
            disabled
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            sx={{ mb: 3 }}
          />
          
          <Button type="submit" variant="contained" size="large">
            Update Profile
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
