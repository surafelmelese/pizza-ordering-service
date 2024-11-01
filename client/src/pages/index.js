import { useEffect, useState } from 'react';
import { getAllPizzas } from '../api/pizzaApi';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Button,
} from '@mui/material';
import Image from 'next/image';
import defaultPizzaImage from '../../public/images/defaultPizzaImage.jpg';
import { useCart } from '../context/CartContext';

const IMAGE_BASE_URL = '/assets/pizza/';

const Home = () => {
  const [groupedPizzas, setGroupedPizzas] = useState({});
  const { addToCart, getOrderData} = useCart();
  console.log("cart data", getOrderData())

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const storedData = localStorage.getItem('groupedPizzas');

        if (storedData) {
          setGroupedPizzas(JSON.parse(storedData));
        } else {
          const response = await getAllPizzas();
          const allPizzaData = response.data;

          const pizzasByRestaurant = allPizzaData.reduce((acc, pizza) => {
            const restaurantName = pizza.restaurant_name;

            if (!acc[restaurantName]) {
              acc[restaurantName] = [];
            }
            acc[restaurantName].push(pizza);
            return acc;
          }, {});

          setGroupedPizzas(pizzasByRestaurant);
          localStorage.setItem('groupedPizzas', JSON.stringify(pizzasByRestaurant));
        }
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    };

    fetchPizzas();
  }, []);

  const handleAddToCart = (pizza) => {
    addToCart(pizza);
    console.log(`${pizza.name} has been added to your cart!`);
  };

  return (
    <Container sx={{ padding: '40px' }}>
      <Typography variant="h3" align="center" gutterBottom color="primary">
        Delicious Pizzas Near You
      </Typography>
      {Object.keys(groupedPizzas).length === 0 ? (
        <Typography variant="h6" align="center">No pizzas available.</Typography>
      ) : (
        <Box sx={{ marginBottom: '40px' }}>
          <Grid container spacing={4}>
            {Object.entries(groupedPizzas).flatMap(([restaurantName, pizzas]) =>
              pizzas.map(pizza => {
                const pizzaImageUrl = pizza.image_url
                  ? `${IMAGE_BASE_URL}${pizza.image_url}`
                  : defaultPizzaImage.src;

                return (
                  <Grid item xs={12} sm={6} md={4} key={`${restaurantName}-${pizza.id}`}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Image
                        src={defaultPizzaImage.src}
                        alt={pizza.name || 'Default Pizza Image'}
                        width={150}
                        height={150}
                        layout="fixed"
                        style={{ borderRadius: '50%' }}
                        onError={(e) => { e.target.src = defaultPizzaImage.src; }}
                      />
                      <CardContent sx={{ width: '100%', textAlign: 'center' }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                          {pizza.name}
                        </Typography>
                        {pizza.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {pizza.description}
                          </Typography>
                        )}
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Toppings: {pizza.toppings.join(", ")}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                          <Typography variant="h6" fontWeight="bold" color="primary">
                            {pizza.base_price && `Birr ${Number(pizza.base_price).toFixed(2)}`}
                          </Typography>
                          <Button
                            variant="contained"
                            sx={{ bgcolor: 'orange', color: 'white' }}
                            onClick={() => handleAddToCart(pizza)}
                          >
                            Add to Cart
                          </Button>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                          <Image
                            src={defaultPizzaImage.src}
                            alt={restaurantName || 'Restaurant Logo'}
                            width={30}
                            height={30}
                            layout="fixed"
                            style={{ borderRadius: '50%' }}
                          />
                          <Typography variant="body2" fontWeight="bold" color="text.secondary">
                            {restaurantName}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default Home;
