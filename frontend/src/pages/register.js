// src/pages/register.js
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { TextField, Button, Box, Typography } from '@mui/material';

const RegisterPage = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer', // default role is customer
    });

    const handleInputChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Register logic
    };

    return (
        <>
            <Navbar />
            <Box display="flex" justifyContent="center" mt={5}>
                <Box component="form" onSubmit={handleRegister} width="300px">
                    <Typography variant="h5" mb={3}>Register</Typography>
                    <TextField
                        label="Name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" fullWidth>
                        Register
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default RegisterPage;