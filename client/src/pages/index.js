import { useEffect, useState } from 'react';
import { getAllPizzas } from '../api/pizzaApi';
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Grid,
  Container,
} from '@mui/material';
import Image from 'next/image';
import defaultPizzaImage from '../../public/images/defaultPizzaImage.jpg';

const Home = () => {
  const [groupedPizzas, setGroupedPizzas] = useState({});

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const allPizzaData = await getAllPizzas();
        const allPizzas = allPizzaData.data;

        const pizzasByRestaurant = allPizzas.reduce((acc, pizza) => {
          const restaurantId = pizza.restaurant_id;
          console.log("Pizza image URL:", pizza.image_url);
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
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Image
                      // src={
                      //     (pizza.image_url && pizza.image_url.startsWith('/') 
                      //       ? pizza.image_url 
                      //       : pizza.image_url ? `/assets/pizza/${pizza.image_url}` : defaultPizzaImage.src)}
                      src={
                        defaultPizzaImage.src
                      }
                      alt={pizza.name || 'Default Pizza Image'}
                      width={300}
                      height={200}
                      layout="responsive"
                      onError={(e) => { e.target.src = defaultPizzaImage.src }}
                    />
                    <CardContent>
                      <Typography variant="h5" gutterBottom>{pizza.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: ${pizza.base_price && Number(pizza.base_price).toFixed(2)}
                      </Typography>
                      {pizza.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {pizza.description}
                        </Typography>
                      )}
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
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