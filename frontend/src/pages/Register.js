import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem
} from '@mui/material';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    preferredLanguage: 'en'
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await register(formData);
    
    if (result.success) {
      toast.success('Registration successful!');
      navigate('/');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Register
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            select
            label="Preferred Language"
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleChange}
            sx={{ mb: 3 }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="si">සිංහල</MenuItem>
            <MenuItem value="ta">தமிழ்</MenuItem>
          </TextField>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
          >
            Register
          </Button>
          
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#1976d2' }}>
                Login here
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
