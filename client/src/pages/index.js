import { useEffect, useState } from 'react';
import { getAllPizzas } from '../api/pizzaApi';
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
} from '@mui/material';

const Home = () => {
  const [groupedPizzas, setGroupedPizzas] = useState({});

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const allPizzaData = await getAllPizzas();
        const allPizzas = allPizzaData.data;

        // Group pizzas by restaurant_id
        const pizzasByRestaurant = allPizzas.reduce((acc, pizza) => {
          const restaurantId = pizza.restaurant_id;
          if (!acc[restaurantId]) {
            acc[restaurantId] = [];
          }
          acc[restaurantId].push(pizza);
          return acc;
        }, {});

        setGroupedPizzas(pizzasByRestaurant);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <Container sx={{ padding: '40px' }}>
      <Typography variant="h3" align="center" gutterBottom color="primary">
        Delicious Pizzas Near You
      </Typography>
      {Object.keys(groupedPizzas).length === 0 ? (
        <Typography variant="h6" align="center">No pizzas available.</Typography>
      ) : (
        Object.entries(groupedPizzas).map(([restaurantId, pizzas]) => (
          <Box key={restaurantId} sx={{ marginBottom: '40px' }}>
            <Typography variant="h4" align="center" gutterBottom>
              Restaurant {restaurantId}
            </Typography>
            <Divider sx={{ marginBottom: '20px' }} />
            <Grid container spacing={4}>
              {pizzas.map(pizza => (
                <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                  <Card>
                    {pizza.image_url && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={pizza.image_url}
                        alt={pizza.name}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h5">{pizza.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ${pizza.base_price}
                      </Typography>
                      {pizza.description && (
                        <Typography variant="body2" color="text.secondary">
                          {pizza.description}
                        </Typography>
                      )}
                      <Typography variant="body2" color="text.secondary">
                        Toppings: {pizza.toppings.join(", ")}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}
    </Container>
  );
};

export default Home;
