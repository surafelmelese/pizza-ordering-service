import { Box, Typography, Stack, IconButton, InputBase } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import Link from 'next/link';

const Footer = () => {
    const [feedback, setFeedback] = useState('');

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSendFeedback = () => {
        console.log('Feedback sent:', feedback);
        setFeedback(''); // Clear feedback input
    };

    return (
        <Box 
            sx={{
                bgcolor: '#FDE2B2', // Match the pizza theme color
                p: 3, // Padding for the footer
                borderTop: '2px solid #C67C04', // Slight border to separate footer
                display: 'flex',
                justifyContent: 'space-between', // Space between links and logo/feedback
                alignItems: 'center',
            }}
        >
            {/* Left Section: Navigation Links */}
            <Stack direction="row" spacing={3}>
                <Link href="/" passHref>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <HomeIcon sx={{ color: '#804C1B' }} />
                        <Typography sx={{ color: '#804C1B' }}>Home</Typography>
                    </Stack>
                </Link>
                <Link href="/order" passHref>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <ShoppingCartIcon sx={{ color: '#804C1B' }} />
                        <Typography sx={{ color: '#804C1B' }}>Order</Typography>
                    </Stack>
                </Link>
                <Link href="/about" passHref>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <InfoIcon sx={{ color: '#804C1B' }} />
                        <Typography sx={{ color: '#804C1B' }}>About Us</Typography>
                    </Stack>
                </Link>
            </Stack>

            {/* Right Section: Logo and Feedback Input */}
            <Stack alignItems="flex-end">
                {/* Pizza Logo */}
                <Stack direction="row" alignItems="center" spacing={1}>
                    <LocalPizzaIcon sx={{ color: '#C67C04', fontSize: '3rem' }} />
                    <Typography variant="h5" sx={{ color: '#C67C04', fontWeight: 'bold' }}>
                        Pizza
                    </Typography>
                </Stack>

                {/* Feedback Input */}
                <Stack direction="row" spacing={1} alignItems="center" width="100%">
                    <InputBase
                        placeholder="Your Feedback"
                        value={feedback}
                        onChange={handleFeedbackChange}
                        sx={{
                            bgcolor: 'white',
                            px: 2,
                            py: 1,
                            borderRadius: '20px',
                            border: '1px solid #C67C04',
                            width: '100%',
                            pr: '40px', // Add padding to the right for the icon
                        }}
                    />
                    <IconButton 
                        onClick={handleSendFeedback}
                        sx={{ 
                            bgcolor: '#C67C04', 
                            color: 'white', 
                            position: 'absolute', // Position icon inside the input
                            right: '10px', // Right spacing
                            '&:hover': { bgcolor: '#A45D02' } 
                        }}
                    >
                        <SendIcon />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Footer;