import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button, Typography, Box, Grid, Snackbar } from '@mui/material';
import { useRouter } from 'next/router';
import PizzaCard from '../Product/PizzaCard';
import { createOrder } from '../../api/orderApi';

const Cart = () => {
  const { cart, clearCart, removeFromCart, getOrderData } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOrder = async () => {
    if (user) {
      const isCustomer = user.user.role_name && user.user.role_name.toLowerCase() === 'customer';
      if (isCustomer) {
        const orderData = getOrderData();

        try {
          await createOrder(orderData);
          setSnackbarMessage('Order placed successfully! Please wait a few moments while we prepare it for you.');
          setOpenSnackbar(true);
          clearCart();
        } catch (error) {
          console.error("Error placing order:", error);
          setSnackbarMessage('Failed to place order. Please try again.');
          setOpenSnackbar(true);
        }
      } else {
        setSnackbarMessage('You must be logged in as a customer to place an order.');
        setOpenSnackbar(true);
      }
    } else {
      router.push('/login');
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box sx={{ padding: '10px' }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">Cart</Typography>
      <Typography variant="h5" gutterBottom align="center">
        Total Price: ${cart.reduce((total, item) => total + parseFloat(item.base_price) * item.quantity, 0).toFixed(2)}
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="body1" align="center" color="text.secondary">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={2}>
          {cart.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id} sx={{ marginBottom: '20px' }}>
              <PizzaCard 
                pizza={item} 
                restaurantName={item.restaurant_name} 
                quantity={item.quantity} 
                buttonType="remove"
                onButtonClick={() => removeFromCart(item.id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {cart.length > 0 && (
        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleOrder}>
            Place Order
          </Button>
        </Box>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={<Button color="inherit" onClick={handleCloseSnackbar}>Close</Button>}
      />
    </Box>
  );
};

export default Cart;
