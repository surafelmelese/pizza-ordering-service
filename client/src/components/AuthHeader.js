// src/components/AuthHeader.js
import { Box, Typography } from '@mui/material';
import PizzaIcon from '@mui/icons-material/LocalPizza';

const AuthHeader = ({ title }) => {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <PizzaIcon sx={{ color: '#FF6600', mr: 1 }} />
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
    </Box>
  );
};

export default AuthHeader;
