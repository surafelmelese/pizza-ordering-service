// src/pages/login.js

import React from 'react';
import { Button, TextField, Typography, Container } from '@mui/material';

const Login = () => {
    return (
        <Container maxWidth="xs">
            <Typography variant="h5" component="h1" gutterBottom>
                Login
            </Typography>
            <form>
                <TextField label="Email" fullWidth margin="normal" />
                <TextField label="Password" type="password" fullWidth margin="normal" />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default Login;