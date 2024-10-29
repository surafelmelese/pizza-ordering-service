import * as pizzaService from '../services/pizza.service.js';
import { uploadImage } from '../utils/uploadImage.js'; // Assume this handles file uploads and returns a URL

// Create a new pizza with toppings and image
export const createPizzaWithToppings = async (req, res) => {
    const { name, description, base_price, toppings } = req.body;
    const restaurant_id = req.restaurant_id; // Get restaurant_id from auth middleware
    try {
        const image_url = req.file ? await uploadImage(req.file) : null; // Handle image upload
        const newPizza = await pizzaService.createPizzaWithToppings(
            restaurant_id, name, description, base_price, toppings, image_url
        );
        res.status(201).json(newPizza);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all pizzas for a restaurant
export const getPizzas = async (req, res) => {
    try {
        const pizzas = await pizzaService.getAllPizzas();
        res.json(pizzas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a pizza by ID
export const getPizzaById = async (req, res) => {
    const pizzaId = req.params.id;
    try {
        const pizza = await pizzaService.getPizzaById(pizzaId);
        if (!pizza) {
            return res.status(404).json({ msg: 'Pizza not found' });
        }
        res.json(pizza);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a pizza by ID, including its image
export const updatePizza = async (req, res) => {
    const pizzaId = req.params.id;
    const { name, description, base_price } = req.body;
    try {
        const image_url = req.file ? await uploadImage(req.file) : null; // Handle image upload
        const updatedPizza = await pizzaService.updatePizza(pizzaId, name, description, base_price, image_url);
        if (!updatedPizza) {
            return res.status(404).json({ msg: 'Pizza not found' });
        }
        res.json(updatedPizza);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a pizza by ID
export const deletePizza = async (req, res) => {
    const pizzaId = req.params.id;
    try {
        const deletedPizza = await pizzaService.deletePizza(pizzaId);
        if (!deletedPizza) {
            return res.status(404).json({ msg: 'Pizza not found' });
        }
        res.json(deletedPizza);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};