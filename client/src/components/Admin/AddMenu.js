import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  FormControlLabel,
  FormGroup,
  Button,
  Checkbox,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { getAllToppings } from '../../api/toppingApi';
import { createPizza } from '../../api/pizzaApi';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/CloudUpload';
import ActionButton from '../Shared/ActionButton';

const AddMenu = () => {
  const [name, setName] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTopping, setNewTopping] = useState('');

  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const response = await getAllToppings();
        setToppings(response.data);
      } catch (error) {
        console.error('Error fetching toppings:', error);
      }
    };
    fetchToppings();
  }, []);

  const handleToppingChange = (toppingId) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId) ? prev.filter((id) => id !== toppingId) : [...prev, toppingId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pizzaData = {
      name,
      base_price: parseFloat(basePrice),
      toppings: selectedToppings,
    };

    try {
      await createPizza(pizzaData);
      setName('');
      setBasePrice('');
      setSelectedToppings([]);
    } catch (error) {
      console.error('Error creating pizza:', error);
    }
  };

  const handleAddToppingClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewTopping('');
  };

  const handleAddNewTopping = () => {
    setToppings([...toppings, { id: toppings.length + 1, name: newTopping }]);
    handleDialogClose();
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2, color: 'orange' }}>
        Add Menu
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Base Price"
          variant="outlined"
          fullWidth
          margin="normal"
          type="number"
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          required
        />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Toppings</Typography>
        <FormGroup>
          <Grid container spacing={2}>
            {toppings.map((topping) => (
              <Grid item xs={12} sm={6} md={4} key={topping.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedToppings.includes(topping.id)}
                      onChange={() => handleToppingChange(topping.id)}
                      sx={{
                        color: selectedToppings.includes(topping.id) ? 'orange' : 'default',
                        '&.Mui-checked': {
                          color: 'orange',
                        },
                        '&.Mui-checked:hover': {
                          backgroundColor: 'rgba(255, 102, 0, 0.2)',
                        },
                      }}
                    />
                  }
                  label={topping.name}
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      color: selectedToppings.includes(topping.id) ? 'orange' : 'inherit',
                      fontWeight: selectedToppings.includes(topping.id) ? 'bold' : 'normal',
                    },
                    border: '1px solid #ddd',
                    borderRadius: 1,
                    padding: '8px',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 102, 0, 0.1)',
                    },
                  }}
                />
              </Grid>
            ))}
            <Grid item xs={12} textAlign="center" sx={{ mt: 2 }}>
              <Typography
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: 'orange',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: 'bold',
                  '&:hover': {
                    color: 'darkorange',
                  },
                }}
                onClick={handleAddToppingClick}
              >
                <AddIcon sx={{ color: 'orange', mr: 0.5 }} />
                Add Topping
              </Typography>
            </Grid>
          </Grid>
        </FormGroup>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ActionButton
            variant="outlined"
            color="orange"
            startIcon={<UploadIcon />}
            sx={{
              mt: 4,
              borderColor: 'orange',
              '&:hover': {
                borderColor: 'orange',
                backgroundColor: 'rgba(255, 102, 0, 0.2)',
              },
            }}
          >
            Upload Pizza Photo
          </ActionButton>
          <ActionButton
            type="submit"
            variant="contained"
            color="orange"
            startIcon={<AddIcon sx={{ color: '#FF6600' }} />}
            sx={{
              mt: 5,
              fontSize: '1.5rem',
              padding: '10px 20px',
              borderRadius: '8px',
              boxShadow: 2,
              bgcolor: 'orange',
              '&:hover': {
                bgcolor: 'rgba(255, 102, 0, 0.2)',
                boxShadow: 4,
              },
            }}
          >
            Submit
          </ActionButton>
        </Box>
      </form>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add a New Topping</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Topping Name"
            fullWidth
            value={newTopping}
            onChange={(e) => setNewTopping(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddNewTopping} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddMenu;