// src/components/CustomerRegisterForm.js
import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { createUser } from '../api/userApi'; // API function for customer registration
import { useAuth } from '../context/AuthContext'; // Import your AuthContext
import { useRouter } from 'next/router'; // Import useRouter for navigation

const CustomerRegisterForm = () => {
  const { login } = useAuth(); // Use login from AuthContext
  const router = useRouter(); // Initialize router for navigation
  const [customer, setCustomer] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    role_name: 'customer',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (customer.password !== customer.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      // Register the customer
      await createUser(customer);
      alert('Customer registered successfully!');

      // Automatically log in the new customer using AuthContext
      await login(customer.email, customer.password); // Use the login function from AuthContext

      // Redirect to the home page after successful login
      router.push('/'); // Redirect to the home page
    } catch (error) {
      console.error('Error registering customer', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Customer Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="full_name"
          value={customer.full_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          name="email"
          value={customer.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={customer.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={customer.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Phone Number"
          name="phone_number"
          value={customer.phone_number}
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

export default CustomerRegisterForm;