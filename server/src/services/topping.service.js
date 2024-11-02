import dbClient from '../config/db.js';

export const getAllToppings = async () => {
    const query = 'SELECT * FROM toppings';
    try {
        const result = await dbClient.query(query);
        return result.rows; 
    } catch (err) {
        console.error('Error fetching toppings:', err);
        throw err;
    }
};


export const createTopping = async (name) => {
    const query = 'INSERT INTO toppings (name) VALUES ($1) RETURNING *';
    const values = [name];
    try {
        const result = await dbClient.query(query, values);
        return result.rows[0]; 
    } catch (err) {
        console.error('Error creating topping:', err);
        throw err;
    }
};


export const getToppingById = async (id) => {
    const query = 'SELECT * FROM toppings WHERE id = $1';
    const values = [id];
    try {
        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching topping by ID:', err);
        throw err;
    }
};

export const updateTopping = async (id, name) => {
    const query = 'UPDATE toppings SET name = $1 WHERE id = $2 RETURNING *';
    const values = [name, id];
    try {
        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error updating topping:', err);
        throw err;
    }
};

export const deleteTopping = async (id) => {
    const query = 'DELETE FROM toppings WHERE id = $1 RETURNING *';
    const values = [id];
    try {
        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting topping:', err);
        throw err;
    }
};