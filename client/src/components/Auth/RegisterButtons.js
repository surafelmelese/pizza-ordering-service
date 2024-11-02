import { Button, Grid } from '@mui/material';

const RegisterButtons = ({ currentForm, setCurrentForm }) => {
  return (
    <Grid container spacing={1} justifyContent="center">
      <Grid item xs={6}>
        <Button
          onClick={() => setCurrentForm('customer')}
          variant={currentForm !== 'restaurant' ? "contained" : "outlined"}
          color="primary"
          fullWidth
        >
          Register as Customer
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          onClick={() => setCurrentForm('restaurant')}
          variant={currentForm === 'restaurant' ? "contained" : "outlined"}
          color="primary"
          fullWidth
        >
          Register as Restaurant
        </Button>
      </Grid>
    </Grid>
  );
};

export default RegisterButtons;