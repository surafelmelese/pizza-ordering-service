import { Box, Typography, Divider, Avatar, Stack } from '@mui/material';
import Image from 'next/image';
import Button from './Button'
const PizzaPaper = ({ pizza }) => {
    return (
        <Box 
            sx={{ 
                bgcolor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                p: 3,
                maxWidth: '400px',
                mx: 'auto',
                mb: 2, // Add some margin at the bottom
            }}
        >
            {/* Pizza Image */}
            <Box sx={{ position: 'relative', height: '200px', mb: 2 }}>
                <Image 
                    src={pizza.image} 
                    alt={pizza.name}
                    layout="fill"
                    objectFit="cover"
                    style={{ borderRadius: '8px' }}
                />
            </Box>

            {/* Title */}
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {pizza.name}
            </Typography>

            {/* Description */}
            <Typography variant="body2" sx={{ mb: 2 }}>
                {pizza.description}
            </Typography>

            {/* Price and Button Row */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    ${pizza.price.toFixed(2)}
                </Typography>
                <Button 
                        href="/order" 
                        sx={{ 
                            fontWeight: 'bold',
                            bgcolor: 'orange', 
                            color: 'white', 
                            '&:hover': { bgcolor: 'darkorange' } 
                        }}
                        onClick={() => handleLinkClick('/order')}
                    >
                        Order
                    </Button>
            </Stack>

            {/* Horizontal Line */}
            <Divider sx={{ mb: 2 }} />

            {/* Profile Image and Name Row */}
            <Stack direction="row" alignItems="center">
                <Avatar alt="Azmera Pizza" src="/images/profile-image.png" sx={{ width: 40, height: 40, mr: 1 }} />
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Azmera Pizza
                </Typography>
            </Stack>
        </Box>
    );
};

export default PizzaPaper;