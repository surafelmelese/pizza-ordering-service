import dbClient from '../config/db.js';

// Get all toppings (shared across all restaurants)
export const getAllToppings = async () => {
    const query = 'SELECT * FROM toppings';
    try {
        const result = await dbClient.query(query);
        return result.rows; // Return all toppings
    } catch (err) {
        console.error('Error fetching toppings:', err);
        throw err;
    }
};

// Create a new topping (shared, not restaurant-specific)
export const createTopping = async (name) => {
    const query = 'INSERT INTO toppings (name) VALUES ($1) RETURNING *';
    const values = [name];
    try {
        const result = await dbClient.query(query, values);
        return result.rows[0]; // Return the created topping
    } catch (err) {
        console.error('Error creating topping:', err);
        throw err;
    }
};

// Get a topping by ID
export const getToppingById = async (id) => {
    const query = 'SELECT * FROM toppings WHERE id = $1';
    const values = [id];
    try {
        const result = await dbClient.query(query, values);
        return result.rows[0]; // Return the topping found by ID
    } catch (err) {
        console.error('Error fetching topping by ID:', err);
        throw err;
    }
};

// Update a topping by ID
export const updateTopping = async (id, name) => {
    const query = 'UPDATE toppings SET name = $1 WHERE id = $2 RETURNING *';
    const values = [name, id];
    try {
        const result = await dbClient.query(query, values);
        return result.rows[0]; // Return the updated topping
    } catch (err) {
        console.error('Error updating topping:', err);
        throw err;
    }
};

// Delete a topping by ID
export const deleteTopping = async (id) => {
    const query = 'DELETE FROM toppings WHERE id = $1 RETURNING *';
    const values = [id];
    try {
        const result = await dbClient.query(query, values);
        return result.rows[0]; // Return the deleted topping
    } catch (err) {
        console.error('Error deleting topping:', err);
        throw err;
    }
};