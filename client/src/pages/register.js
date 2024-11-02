import { useState } from 'react';
import CustomerRegisterForm from '../components/Auth/CustomerRegisterForm';
import RestaurantRegisterForm from '../components/Auth/RestaurantRegisterForm';
import AdminRegisterForm from '../components/Auth/AdminRegisterForm'; 
import { Button, Container, Box, Grid } from '@mui/material';
import AuthHeader from '../components/Auth/AuthHeader';
import Image from 'next/image';
import pizzaLogo from '../../public/images/pizzaLogo.png';

const Register = () => {
  const [currentForm, setCurrentForm] = useState('admin');

  const handleRestaurantCreated = () => {
    setCurrentForm('admin');
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
    <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'stretch' }}>
      <Box 
        sx={{ 
          flex: 1, 
          backgroundColor: 'orange', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: { xs: '200px', md: '100vh' },
          mb: { xs: 2, md: 0 },
        }}
      >
        <Image
          src={pizzaLogo.src}
          alt={'Default Pizza Image'}
          width={300}
          height={300}
          layout="responsive"
          onError={(e) => { e.target.src = pizzaLogo.src; }}
        />
      </Box>

      <Box 
        flex={1} 
        sx={{ 
          padding: 2,
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <AuthHeader title={`Register as ${currentForm === 'restaurant' ? 'Restaurant' : 'Customer'}`} />

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Button
            onClick={() => setCurrentForm('customer')}
            variant={currentForm !== 'restaurant' ? "contained" : "outlined"}
            color="primary"
            fullWidth
            sx={{ mr: 1 }}
          >
            Register as Customer
          </Button>
          <Button
            onClick={() => setCurrentForm('restaurant')}
            variant={currentForm === 'restaurant' ? "contained" : "outlined"}
            color="primary"
            fullWidth
          >
            Register as Restaurant
          </Button>
        </Box>

        <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center" mt={2}>
          {renderForm()}
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
