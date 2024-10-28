import { useState } from 'react';
import CustomerRegisterForm from '../components/CustomerRegisterForm';
import RestaurantRegisterForm from '../components/RestaurantRegisterForm';
import AdminRegisterForm from '../components/AdminRegisterForm'; // Import the AdminRegisterForm
import { Button, Typography, Container, Box, Grid, Paper } from '@mui/material';

const Register = () => {
  const [currentForm, setCurrentForm] = useState('admin'); // Track current form type

  const handleRestaurantCreated = () => {
    setCurrentForm('admin'); // Change to admin registration form after restaurant is created
  };

  const renderForm = () => {
    switch (currentForm) {
      case 'customer':
        return <CustomerRegisterForm />;
      case 'restaurant':
        return <RestaurantRegisterForm onRestaurantCreated={handleRestaurantCreated} />;
      case 'admin':
        return <AdminRegisterForm />;
      default:
        return <CustomerRegisterForm />;
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7f7f7',
        padding: 2,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, width: '100%', height: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register as {currentForm === 'restaurant' ? 'Restaurant' : 'Customer'}
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={6}>
            <Button
              onClick={() => {
                setCurrentForm('customer'); // Switch to customer registration
              }}
              variant={currentForm !== 'restaurant' ? "contained" : "outlined"}
              color="primary"
              fullWidth
            >
              Register as Customer
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => {
                setCurrentForm('restaurant'); // Switch to restaurant registration
              }}
              variant={currentForm === 'restaurant' ? "contained" : "outlined"}
              color="primary"
              fullWidth
            >
              Register as Restaurant
            </Button>
          </Grid>
        </Grid>

        <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
          {renderForm()} {/* Render the appropriate form based on currentForm state */}
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
