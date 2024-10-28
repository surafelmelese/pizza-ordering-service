import express from 'express';
import {
    getToppings,
    createTopping,
    getToppingById,
    updateTopping,
    deleteTopping,
} from '../controllers/topping.controller.js';
import { auth } from '../middleware/auth.js';

const toppingRouter = express.Router();

// All routes are protected by auth middleware
toppingRouter.get('/api/topping', auth, getToppings);                  // Get all toppings
toppingRouter.post('/api/topping', auth, createTopping);                // Create a new topping
toppingRouter.get('/api/topping/:id', auth, getToppingById);            // Get a topping by ID
toppingRouter.put('/api/topping/:id', auth, updateTopping);              // Update a topping by ID
toppingRouter.delete('/api/topping/:id', auth, deleteTopping);           // Delete a topping by ID

export default toppingRouter;