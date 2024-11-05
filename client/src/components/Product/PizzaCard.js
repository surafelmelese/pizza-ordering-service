import { CardContent, Typography, Button, Box,Grid,FormControlLabel,Checkbox, Paper } from '@mui/material';
import Image from 'next/image';
import defaultPizzaImage from '../../../public/images/defaultPizzaImage.jpg';

const PizzaCard = ({ pizza, restaurantName, quantity, onButtonClick, buttonLabel, quantityControl, isCart, onToppingChange }) => {
  const pizzaImageUrl = pizza.image_url
    ? `/assets/pizza/${pizza.image_url}`
    : defaultPizzaImage.src;

  return (
    <Paper 
      elevation={2} 
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: 1,
        height: '100%',
      }}
    >
      <Image
        src={defaultPizzaImage.src}
        alt={pizza.name || 'Pizza Image'}
        width={150}
        height={150}
        style={{ borderRadius: '80%', marginBottom: 1 }}
        onError={(e) => { e.target.src = defaultPizzaImage.src; }}
      />
      <CardContent sx={{ textAlign: 'center', width: '100%' }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          {pizza.name}
        </Typography>
        {pizza.description && (
          <Typography variant="body2" color="text.secondary">
            {pizza.description}
          </Typography>
        )}
        {isCart && pizza.toppings && (
      <Box sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          {pizza.toppings.map((topping) => (
            <Grid item key={topping} xs={6} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={pizza.toppings.includes(topping)}
                    onChange={(e) => onToppingChange(pizza.id, topping, e.target.checked)}
                    sx={{
                      '&.Mui-checked': {
                        color: 'orange', 
                      },
                    }}
                  />
                }
                label={<Typography variant="body2">{topping}</Typography>}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    )}
        {quantity && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#dee0df',
              color: 'white',
              borderRadius: '16px',
              maxWidth: '100px',
              padding: '4px 0px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            Quantity: {quantity}
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            {pizza.base_price && `Birr ${Number(pizza.base_price).toFixed(2)}`}
          </Typography>
          <Button 
            variant="contained" 
            sx={{ bgcolor: 'orange', color: 'white', borderRadius: '16px' }} 
            onClick={() => onButtonClick(pizza)}
          >
            {buttonLabel}
          </Button>
        </Box>
        {quantityControl}
      </CardContent>
      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          width: '100%', 
          alignItems: 'center', 
        }}
      >
        <Image
          src={defaultPizzaImage.src}
          alt={restaurantName || 'Restaurant Logo'}
          width={30}
          height={30}
          style={{ borderRadius: '50%', marginRight: 8 }}
        />
        <Typography 
          variant="body2" 
          fontWeight="bold" 
          color="text.secondary" 
          sx={{ flexGrow: 1, textAlign: 'right', marginRight: 2 }}
        >
          {restaurantName}
        </Typography>
      </Box>
    </Paper>
  );
};

export default PizzaCard;
