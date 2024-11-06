import dbClient from '../config/db.js';

export const createPizzaWithToppings = async (restaurant_id, name, description, base_price, toppings, image_url) => {
    try {
        await dbClient.query('BEGIN');

        const pizzaQuery = `
            INSERT INTO pizzas (name, restaurant_id, description, base_price, image_url)
            VALUES ($1, $2, $3, $4, $5) RETURNING *
        `;
        const pizzaValues = [name, restaurant_id, description, base_price, image_url];
        const pizzaResult = await dbClient.query(pizzaQuery, pizzaValues);
        const pizzaId = pizzaResult.rows[0].id;

        for (let toppingId of toppings) {
            const pizzaToppingQuery = 'INSERT INTO pizza_toppings (pizza_id, topping_id) VALUES ($1, $2)';
            const pizzaToppingValues = [pizzaId, toppingId];
            await dbClient.query(pizzaToppingQuery, pizzaToppingValues);
        }

        await dbClient.query('COMMIT');
        return pizzaResult.rows[0];
    } catch (err) {
        await dbClient.query('ROLLBACK');
        console.error('Error creating pizza with toppings and image:', err);
        throw err;
    }
};

export const getAllPizzas = async () => {
    const query = `
        SELECT p.id, p.name, p.description, p.base_price, p.image_url, 
               p.restaurant_id, r.name AS restaurant_name,
               COALESCE(array_agg(t.name) FILTER (WHERE t.name IS NOT NULL), '{}') AS toppings
        FROM pizzas p
        LEFT JOIN pizza_toppings pt ON p.id = pt.pizza_id
        LEFT JOIN toppings t ON pt.topping_id = t.id
        LEFT JOIN restaurants r ON p.restaurant_id = r.id
        GROUP BY p.id, r.name;
    `;
    try {
        const result = await dbClient.query(query);
        return result.rows; 
    } catch (err) {
        console.error('Error fetching pizzas:', err);
        throw err;
    }
};


// Get a pizza by ID with its image
export const getPizzaById = async (pizzaId) => {
    const query = `
        SELECT p.*, array_agg(t.name) AS toppings
        FROM pizzas p
        LEFT JOIN pizza_toppings pt ON p.id = pt.pizza_id
        LEFT JOIN toppings t ON pt.topping_id = t.id
        WHERE p.id = $1
        GROUP BY p.id
    `;
    const values = [pizzaId];
    try {
        const result = await dbClient.query(query, values);
        return result.rows[0]; // Return the pizza found by ID with its image
    } catch (err) {
        console.error('Error fetching pizza by ID:', err);
        throw err;
    }
};

export const updatePizza = async (pizzaId, name, description, base_price, image_url) => {
    const query = `
        UPDATE pizzas
        SET name = $1, description = $2, base_price = $3, image_url = $4
        WHERE id = $5
        RETURNING *
    `;
    const values = [name, description, base_price, image_url, pizzaId];
    try {
        const result = await dbClient.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.error('Error updating pizza:', err);
        throw err;
    }
};

// Delete a pizza by ID
export const deletePizza = async (pizzaId) => {
    const query = 'DELETE FROM pizzas WHERE id = $1 RETURNING *';
    const values = [pizzaId];
    try {
        const result = await dbClient.query(query, values);
        return result.rows[0]; // Return the deleted pizza
    } catch (err) {
        console.error('Error deleting pizza:', err);
        throw err;
    }
};