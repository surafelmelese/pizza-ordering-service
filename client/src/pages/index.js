import { useEffect, useState } from 'react';
import { getAllPizzas } from '../api/pizzaApi';
import { Box, Typography, Grid, Container, CircularProgress } from '@mui/material';
import { useCart } from '../context/CartContext';
import PizzaCard from '../components/Product/PizzaCard';

const Home = () => {
  const [groupedPizzas, setGroupedPizzas] = useState({});
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  console.log("Cart data", addToCart)

  useEffect(() => {
    const fetchPizzas = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false); 
      }
    };

    fetchPizzas();
  }, []);

  return (
    <Container sx={{ padding: '20px' }}>
      <Typography variant="h3" align="center" gutterBottom color="primary">
        Delicious Pizzas Near You
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '200px' }}>
          <CircularProgress />
        </Box>
      ) : Object.keys(groupedPizzas).length === 0 ? (
        <Typography variant="h6" align="center">No pizzas available.</Typography>
      ) : (
        <Box sx={{ marginBottom: '20px' }}>
          <Grid container spacing={4}>
            {Object.entries(groupedPizzas).flatMap(([restaurantName, pizzas]) =>
              pizzas.map(pizza => (
                <Grid item xs={12} sm={6} md={4} key={`${restaurantName}-${pizza.id}`}>
                  <PizzaCard 
                    pizza={pizza} 
                    restaurantName={restaurantName} 
                    buttonType="add" 
                    onButtonClick={() => addToCart(pizza)} 
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default Home;