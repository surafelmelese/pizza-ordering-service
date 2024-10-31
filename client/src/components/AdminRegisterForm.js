import { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { createUser } from '../api/userApi';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const AdminRegisterPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [admin, setAdmin] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    role_name: 'admin'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (admin.password !== admin.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try {
      await createUser(admin);
      alert('Admin registered successfully!');
      await login(admin.email, admin.password);
      router.push('/admin');
    } catch (error) {
      console.error('Error registering admin', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Admin Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="full_name"
          value={admin.full_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          name="email"
          value={admin.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={admin.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={admin.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Phone Number"
          name="phone_number"
          value={admin.phone_number}
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

export default AdminRegisterPage;