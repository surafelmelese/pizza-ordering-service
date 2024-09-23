import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar';
import FeaturedPizzaCarousel from '../components/FeaturedPizzaCarousel';
import PizzaPaper from '../components/PizzaPaper'
import TopRestaurants from '../components/TopRestaurants';
import samplePizzas from '../data/samplePizzas';
import Image from 'next/image';
import { Typography, Stack, Box, Grid } from '@mui/material';

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const pizzas = [
        { name: 'Margherita', toppings: ['Tomato', 'Mozzarella', 'Basil'], price: 10 },
        { name: 'Pepperoni', toppings: ['Tomato', 'Mozzarella', 'Pepperoni'], price: 12 },
    ];

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPizzas = pizzas.filter(pizza =>
        pizza.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <Stack 
                spacing={0} // Remove spacing between children
                sx={{ 
                    bgcolor: '#FDE2B2', // Background color matching pizza theme
                    p: 0, // Remove padding
                    position: 'relative',
                    height: '100vh',
                    flexDirection: { xs: 'column', md: 'row-reverse' }, // Move image to the right
                }}
            >
                <Box 
                    sx={{ 
                        flex: 1, 
                        position: 'relative', 
                        height: '100%', 
                        overflow: 'hidden', 
                        width: '100%',
                        m: 0, // Remove margin
                        p: 0, // Remove padding
                    }}
                >
                    <Image 
                        src="/images/pizza-image.png" 
                        alt="Pizza Image" 
                        layout="fill"
                        objectFit="cover" // Cover the entire right side
                        style={{
                            filter: 'blur(4px)', // Mild blur for blending
                            opacity: 0.7, // Lower opacity for a subtle look
                        }}
                    />
                </Box>

                <Box 
                    sx={{ 
                        flex: 1, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        textAlign: 'center',
                        gap: 2,
                        px: { xs: 0, md: 4 }, // Remove horizontal padding for mobile
                        pt: 0, // Remove top padding
                        m: 0, // Remove margin
                    }}
                >
                    <Typography 
                        variant="h1" 
                        sx={{ 
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            color: '#C67C04', // Darker orange tone matching the theme
                            fontWeight: '700',
                        }}
                        gutterBottom
                    >
                        Order Us
                    </Typography>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            fontSize: { xs: '1rem', md: '1.25rem' }, 
                            color: '#804C1B', // Muted brown tone
                        }}
                        gutterBottom
                    >
                        Choose from our wide variety of hand-crafted pizzas made with fresh ingredients and lots of love.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', m: 0, p: 0 }}>
                        <SearchBar 
                            placeholder="Search for pizzas..." 
                            value={searchQuery} 
                            onChange={handleSearch} 
                            sx={{ 
                                bgcolor: 'white', // Set background to white
                                width: '100%', 
                                borderRadius: '50px',
                                border: '2px solid #C67C04', // Border in theme color
                                maxWidth: '500px',
                                m: 0, // Remove margin
                                px: 0, // Remove horizontal padding
                                py: 1.5,
                                '& input': {
                                    bgcolor: 'white', // Ensure input is white
                                },
                            }} 
                        />
                    </Box>
                </Box>
            </Stack>
            
            <Typography variant="h1" 
                        sx={{ 
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            color: '#00000', // Darker orange tone matching the theme
                            fontWeight: '700',
                        }}>
                Featured Pizzas
            </Typography>
            <FeaturedPizzaCarousel />
            
            <Typography variant="h1" 
                        sx={{ 
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            color: '#00000', // Darker orange tone matching the theme
                            fontWeight: '700',
                        }}>
                Top Restorants
            </Typography>
            <TopRestaurants />
            <Typography variant="h1" 
                        sx={{ 
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            color: '#00000', // Darker orange tone matching the theme
                            fontWeight: '700',
                        }}>
                Popular Pizzas
            </Typography>
            <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                {samplePizzas.map((pizza, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <PizzaPaper pizza={pizza} />
                    </Grid>
                ))}
            </Grid>
        </Box>
        <Typography variant="h1" 
                        sx={{ 
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            color: '#00000', // Darker orange tone matching the theme
                            fontWeight: '700',
                        }}> Fasting
        </Typography>
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
                {samplePizzas.map((pizza, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <PizzaPaper pizza={pizza} />
                    </Grid>
                ))}
            </Grid>
        </Box>
            <Footer/>
        </>
    );
};

export default HomePage;
