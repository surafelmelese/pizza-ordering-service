// components/FeaturedPizza.js
import { Box, Typography, Button } from '@mui/material';

const FeaturedPizza = ({ title, description }) => {
    return (
        <Box 
            sx={{ 
                p: 3, 
                bgcolor: '#FDE2B2', 
                borderRadius: 2, 
                textAlign: 'center', 
                boxShadow: 3, 
                margin: '0 auto', 
            }}
        >
            <Typography 
                variant="h4" 
                sx={{ 
                    fontWeight: 'bold', 
                    mb: 2, 
                    color: '#C67C04', 
                }}
            >
                {title}
            </Typography>
            <Typography 
                variant="body1" 
                sx={{ 
                    mb: 3, 
                    color: '#804C1B', 
                }}
            >
                {description}
            </Typography>
            <Button 
                variant="contained" 
                sx={{ 
                    bgcolor: '#C67C04', 
                    color: 'white',
                    '&:hover': {
                        bgcolor: '#A65E03', 
                    }
                }}
            >
                Order Now
            </Button>
        </Box>
    );
};

export default FeaturedPizza;