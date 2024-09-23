// components/TopRestaurants.js
import { Box, Paper, Typography, Grid, Avatar } from '@mui/material';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';

const sampleRestaurants = [
    {
        name: "Azmera Pizza",
        description: "Delicious pizzas made with fresh ingredients.",
        orders: 2000,
        image: "/images/azmera-pizza.jpg" // Replace with your actual image path
    },
    {
        name: "Pasta Heaven",
        description: "Authentic Italian pasta dishes.",
        orders: 1500,
        image: "/images/pasta-heaven.jpg" // Replace with your actual image path
    },
    {
        name: "Burger Hub",
        description: "Juicy burgers made to order.",
        orders: 3000,
        image: "/images/burger-hub.jpg" // Replace with your actual image path
    },
];

const TopRestaurants = () => {
    return (
        <Grid container spacing={2}>
            {sampleRestaurants.map((restaurant, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper 
                        elevation={3} 
                        sx={{ 
                            p: 2, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            bgcolor: 'rgba(255, 255, 255, 0.8)', 
                            borderRadius: '8px',
                            transition: 'transform 0.3s', 
                            '&:hover': {
                                transform: 'scale(1.05)', 
                                boxShadow: 10,
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar 
                                alt={restaurant.name} 
                                src={restaurant.image} 
                                sx={{ width: 56, height: 56, border: '2px solid #ffab00' }} 
                            />
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                                    {restaurant.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {restaurant.description}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <BatteryFullIcon fontSize="large" color="primary" sx={{ fontSize: 40 }} />
                            <Box sx={{ textAlign: 'center', ml: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                    Number of Order
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {Math.round(restaurant.orders / 1000)}K
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default TopRestaurants;
