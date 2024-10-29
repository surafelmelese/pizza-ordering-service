import express from 'express';
import multer from 'multer';
import {
    createPizzaWithToppings,
    getPizzas,
    getPizzaById,
    updatePizza,
    deletePizza,
} from '../controllers/pizza.controller.js';
import { auth } from '../middleware/auth.js';

const pizzaRouter = express.Router();
const upload = multer({ dest: 'assets/pizza/' }); // Set up multer to handle file uploads

// All routes are protected by auth middleware
pizzaRouter.get('/api/pizza', getPizzas);                         // Get all pizzas for a restaurant
pizzaRouter.post('/api/pizza', auth, upload.single('image'), createPizzaWithToppings);  // Create a new pizza with toppings and image
pizzaRouter.get('/api/pizza/:id', auth, getPizzaById);                  // Get a pizza by ID
pizzaRouter.put('/api/pizza/:id', auth, upload.single('image'), updatePizza);   // Update a pizza by ID, with optional image update
pizzaRouter.delete('/api/pizza/:id', auth, deletePizza);                // Delete a pizza by ID

export default pizzaRouter;