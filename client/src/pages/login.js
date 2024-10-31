import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { Box, Button, TextField, Container } from '@mui/material';
import Image from 'next/image';
import pizzaLogo from '../../public/images/pizzaLogo.png';
import AuthHeader from '../components/AuthHeader';

const Login = () => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => login(data.email, data.password);

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'stretch' }}>
      <Box 
        sx={{ 
          flex: 1, 
          backgroundColor: 'orange', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: { xs: '200px', md: '100vh' }, // Responsive height
          mb: { xs: 2, md: 0 }, // Margin bottom for small screens
        }}
      >
        <Image
          src={pizzaLogo.src}
          alt={'Default Pizza Image'}
          width={300}
          height={400}
          layout="responsive"
          onError={(e) => { e.target.src = pizzaLogo.src; }}
        />
      </Box>

      <Box 
        flex={1} 
        sx={{ 
          padding: 2,
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
        }}
      >
        <AuthHeader title="Pizza Login" />
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register('email')}
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            required
            autoComplete="email"
            inputProps={{ style: { fontSize: 16 } }}
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
            inputProps={{ style: { fontSize: 16 } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '16px', padding: '10px' }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
