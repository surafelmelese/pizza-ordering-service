import * as toppingService from '../services/topping.service.js';

// Get all toppings
export const getToppings = async (req, res) => {
    try {
        const toppings = await toppingService.getAllToppings();
        res.json(toppings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new topping
export const createTopping = async (req, res) => {
    const { name } = req.body;
    try {
        const newTopping = await toppingService.createTopping(name);
        res.status(201).json(newTopping);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a topping by ID
export const getToppingById = async (req, res) => {
    const toppingId = req.params.id;
    try {
        const topping = await toppingService.getToppingById(toppingId);
        if (!topping) {
            return res.status(404).json({ msg: 'Topping not found' });
        }
        res.json(topping);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a topping by ID
export const updateTopping = async (req, res) => {
    const toppingId = req.params.id;
    const { name } = req.body;
    try {
        const updatedTopping = await toppingService.updateTopping(toppingId, name);
        if (!updatedTopping) {
            return res.status(404).json({ msg: 'Topping not found' });
        }
        res.json(updatedTopping);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a topping by ID
export const deleteTopping = async (req, res) => {
    const toppingId = req.params.id;
    try {
        const deletedTopping = await toppingService.deleteTopping(toppingId);
        if (!deletedTopping) {
            return res.status(404).json({ msg: 'Topping not found' });
        }
        res.json(deletedTopping);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};