import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Box, Button, TextField, Typography, Container, Grid, Paper } from '@mui/material';

const Login = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => login(data.email, data.password);

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: '20px', borderRadius: '8px' }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            {...register('email')}
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            autoComplete="email"
            inputProps={{ style: { fontSize: 16 } }} // Style the input text
          />
          <TextField
            {...register('password')}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            autoComplete="current-password"
            inputProps={{ style: { fontSize: 16 } }} // Style the input text
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '16px', padding: '10px' }} // Increased padding for better touch target
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
