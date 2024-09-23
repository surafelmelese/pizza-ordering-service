// src/components/Navbar.js
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
    const [activeLink, setActiveLink] = useState('');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <AppBar 
            position="static" 
            sx={{ bgcolor: '#FAFAFA', boxShadow: 'none' }} // More whitish background and no elevation
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex'}}>
                        <IconButton 
                        edge="start" 
                        color="inherit" 
                        component={Link} 
                        href="/" 
                        onClick={() => handleLinkClick('/')}
                    >
                        <img 
                            src="/images/pizza-logo.png" // Replace with an actual pizza-themed logo path
                            alt="Pizza Logo"
                            style={{ width: '40px', height: '40px' }} // Adjust size as needed
                        />
                    </IconButton>

                    <Typography 
                        variant="h6" 
                        sx={{ fontWeight: 'bold' }}
                    >
                        <Link href="/" passHref>
                            Pizza {/* Replace with actual logo name if needed */}
                        </Link>
                    </Typography>
                    </Box>
                    {/* Home Link */}
                    <Button 
                        component={Link} 
                        href="/" 
                        sx={{ 
                            fontWeight: 'bold',
                            color: activeLink === '/' ? 'orange' : 'black', 
                            '&:hover': { color: 'orange' } 
                        }}
                        onClick={() => handleLinkClick('/')}
                    >
                        Home
                    </Button>

                    {/* Order Link */}
                    <Button 
                        component={Link} 
                        href="/order" 
                        sx={{ 
                            fontWeight: 'bold',
                            color: activeLink === '/order' ? 'orange' : 'black', 
                            '&:hover': { color: 'orange' } 
                        }}
                        onClick={() => handleLinkClick('/order')}
                    >
                        Order
                    </Button>

                    {/* Who We Are Link */}
                    <Button 
                        component={Link} 
                        href="/who-we-are" 
                        sx={{ 
                            fontWeight: 'bold',
                            color: activeLink === '/who-we-are' ? 'orange' : 'black', 
                            '&:hover': { color: 'orange' } 
                        }}
                        onClick={() => handleLinkClick('/who-we-are')}
                    >
                        Who We Are
                    </Button>

                    {/* Register Button */}
                    <Button 
                        component={Link} 
                        href="/register" 
                        sx={{ 
                            fontWeight: 'bold',
                            bgcolor: 'orange', 
                            color: 'white', 
                            '&:hover': { bgcolor: 'darkorange' } 
                        }}
                        onClick={() => handleLinkClick('/register')}
                    >
                        Register
                    </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
