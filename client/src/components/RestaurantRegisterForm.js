import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { createRestaurant } from '../api/restaurantApi';

const RestaurantRegisterForm = ({ onRestaurantCreated }) => { 
  const [restaurant, setRestaurant] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    restaurant_name: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (restaurant.password !== restaurant.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      await createRestaurant(restaurant);
      alert('Restaurant registered successfully!');
      onRestaurantCreated();
    } catch (error) {
      console.error('Error registering restaurant', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Restaurant Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="full_name"
          value={restaurant.full_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          name="email"
          value={restaurant.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={restaurant.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={restaurant.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Phone Number"
          name="phone_number"
          value={restaurant.phone_number}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Restaurant Name"
          name="restaurant_name"
          value={restaurant.restaurant_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Location"
          name="location"
          value={restaurant.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default RestaurantRegisterForm;
