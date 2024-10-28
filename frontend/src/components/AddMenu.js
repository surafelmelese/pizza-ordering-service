import React, { useEffect, useState } from 'react';
import { Typography, Box, TextField, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { getAllToppings } from '../api/toppingApi'; // Import the function to get toppings
import { createPizza } from '../api/pizzaApi'; // Import the function to create pizza

const AddMenu = () => {
  const [name, setName] = useState(''); // State for pizza name
  const [basePrice, setBasePrice] = useState(''); // State for pizza base price
  const [toppings, setToppings] = useState([]); // State for available toppings
  const [selectedToppings, setSelectedToppings] = useState([]); // State for selected toppings

  // Fetch toppings on component mount
  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const response = await getAllToppings();
        setToppings(response.data); // Assuming the response data is an array of toppings
      } catch (error) {
        console.error('Error fetching toppings:', error);
      }
    };

    fetchToppings();
  }, []);

  // Handle topping selection
  const handleToppingChange = (toppingId) => {
    setSelectedToppings((prev) => {
      if (prev.includes(toppingId)) {
        return prev.filter((id) => id !== toppingId); // Remove topping if already selected
      } else {
        return [...prev, toppingId]; // Add topping if not selected
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const pizzaData = {
      name,
      base_price: parseFloat(basePrice), // Changed to base_price and converted to a number
      toppings: selectedToppings, // Send the list of selected toppings
    };

    try {
      await createPizza(pizzaData); // Send data to create pizza
      console.log(pizzaData)
      // Clear the form after submission
      setName('');
      setBasePrice(''); // Reset base price
      setSelectedToppings([]); // Reset selected toppings
    } catch (error) {
      console.error('Error creating pizza:', error);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
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
          {toppings.map((topping) => (
            <FormControlLabel
              key={topping.id}
              control={
                <Checkbox
                  checked={selectedToppings.includes(topping.id)}
                  onChange={() => handleToppingChange(topping.id)}
                />
              }
              label={topping.name}
            />
          ))}
        </FormGroup>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Pizza
        </Button>
      </form>
    </Box>
  );
};

export default AddMenu;