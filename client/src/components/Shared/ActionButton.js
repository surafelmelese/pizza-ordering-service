import React from 'react';
import { Button } from '@mui/material';
const ActionButton = ({ variant, color, onClick, startIcon, children, sx }) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      startIcon={startIcon}
      sx={{
        mt: 2,
        width: '100%',
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
