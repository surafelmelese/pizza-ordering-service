import dbClient from "../config/db.js"; 

export const createOrder = async (userId, orderData) => {
    const { status, restaurant_id, total_price, items } = orderData;
    console.log("Order data", orderData)

    try {
        // Begin transaction
        await dbClient.query('BEGIN');

        const orderQuery = `
            INSERT INTO orders (user_id, restaurant_id, status, total_price)
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const orderValues = [userId, restaurant_id, status, total_price];
        const orderResult = await dbClient.query(orderQuery, orderValues);
        const orderId = orderResult.rows[0].id;

        for (let item of items) {
            const { pizza_id, quantity, price, toppings } = item;

            const itemQuery = `
                INSERT INTO order_items (order_id, pizza_id, quantity, price)
                VALUES ($1, $2, $3, $4) RETURNING id`;
            const itemValues = [orderId, pizza_id, quantity, price];
            const itemResult = await dbClient.query(itemQuery, itemValues);
            const orderItemId = itemResult.rows[0].id;

            if (toppings && toppings.length > 0) {
                const toppingValues = toppings.map(toppingId => `(${orderItemId}, ${toppingId})`).join(',');
                const toppingQuery = `
                    INSERT INTO order_toppings (order_item_id, topping_id)
                    VALUES ${toppingValues}`;
                await dbClient.query(toppingQuery);
            }
        }

        // Commit transaction
        await dbClient.query('COMMIT');

        return orderResult.rows[0];
    } catch (err) {
        // Rollback transaction in case of error
        await dbClient.query('ROLLBACK');
        throw err;
    }
};

export const getAllOrders = async (restaurant_id) => {
    const query = `
        SELECT o.id, oi.pizza_id, p.name AS pizza_name, oi.quantity, o.status, 
               profile.phone_number, o.created_at,
               array_remove(array_agg(t.id), NULL) AS toppings  -- Remove NULL toppings
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN profile ON o.user_id = profile.user_id
        JOIN pizzas p ON oi.pizza_id = p.id  -- Join pizzas table to get pizza name
        LEFT JOIN order_toppings ot ON oi.id = ot.order_item_id
        LEFT JOIN toppings t ON ot.topping_id = t.id
        WHERE o.restaurant_id = $1  -- Filter by restaurant_id in the orders table
        GROUP BY o.id, oi.pizza_id, p.name, oi.quantity, profile.phone_number, o.status, o.created_at;
    `;

    try {
        const result = await dbClient.query(query, [restaurant_id]);
        return result.rows;
    } catch (err) {
        console.error('Error fetching orders:', err);
        throw err;
    }
};
export const getAllOrdersByUser = async (user_id) => { 
    const query = `
                    SELECT 
                        p.name AS pizza_name, 
                        r.name AS restaurant_name,
                        array_remove(array_agg(DISTINCT t.name), NULL) AS toppings, 
                        p.base_price, 
                        o.status
                    FROM 
                        orders o
                    JOIN 
                        order_items oi ON o.id = oi.order_id
                    JOIN 
                        pizzas p ON oi.pizza_id = p.id
                    JOIN 
                        restaurants r ON p.restaurant_id = r.id
                    LEFT JOIN 
                        order_toppings ot ON oi.id = ot.order_item_id
                    LEFT JOIN 
                        toppings t ON ot.topping_id = t.id
                    WHERE 
                        o.user_id = $1
                    GROUP BY 
                        p.name, r.name, p.base_price, o.status;
    `;

    try {
        const result = await dbClient.query(query, [user_id]);
        return result.rows;
    } catch (err) {
        console.error('Error fetching orders:', err);
        throw err;
    }
};




// Get order by ID
export const getOrderById = async (orderId) => {
    const query = `
        SELECT o.id, oi.pizza_id, oi.quantity, o.status, p.phone_number,
               array_remove(array_agg(t.id), NULL) AS toppings  -- Remove NULL toppings
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN profile p ON o.user_id = p.user_id
        LEFT JOIN order_toppings ot ON oi.id = ot.order_item_id
        LEFT JOIN toppings t ON ot.topping_id = t.id
        WHERE o.id = $1
        GROUP BY o.id, oi.pizza_id, oi.quantity, p.phone_number, o.status
    `;

    try {
        const result = await dbClient.query(query, [orderId]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};


// Update an order with items and toppings
export const updateOrder = async (orderId, orderData) => {
    const { status, total_price, items } = orderData;

    try {
        // Begin transaction
        await dbClient.query('BEGIN');

        // Update the order status and total price
        const orderQuery = `
            UPDATE orders 
            SET status = $1, total_price = $2 
            WHERE id = $3 
            RETURNING *`;
        const orderValues = [status, total_price, orderId];
        const orderResult = await dbClient.query(orderQuery, orderValues);

        // Update or replace order items
        for (let item of items) {
            const { item_id, pizza_id, quantity, price, toppings } = item;

            // Check if the item exists in the order (i.e., updating an existing item)
            if (item_id) {
                // Update the order item
                const itemUpdateQuery = `
                    UPDATE order_items
                    SET pizza_id = $1, quantity = $2, price = $3
                    WHERE id = $4 AND order_id = $5
                    RETURNING id`;
                const itemUpdateValues = [pizza_id, quantity, price, item_id, orderId];
                await dbClient.query(itemUpdateQuery, itemUpdateValues);

                // Clear existing toppings for the item
                const deleteToppingsQuery = `DELETE FROM order_toppings WHERE order_item_id = $1`;
                await dbClient.query(deleteToppingsQuery, [item_id]);

                // Reinsert toppings for the updated item
                if (toppings && toppings.length > 0) {
                    const toppingValues = toppings.map(toppingId => `(${item_id}, ${toppingId})`).join(',');
                    const toppingQuery = `
                        INSERT INTO order_toppings (order_item_id, topping_id)
                        VALUES ${toppingValues}`;
                    await dbClient.query(toppingQuery);
                }

            } else {
                // Insert new item if item_id is not provided (adding a new item to the order)
                const itemInsertQuery = `
                    INSERT INTO order_items (order_id, pizza_id, quantity, price)
                    VALUES ($1, $2, $3, $4) RETURNING id`;
                const itemInsertValues = [orderId, pizza_id, quantity, price];
                const itemInsertResult = await dbClient.query(itemInsertQuery, itemInsertValues);
                const newItemId = itemInsertResult.rows[0].id;

                // Insert toppings for the new item
                if (toppings && toppings.length > 0) {
                    const toppingValues = toppings.map(toppingId => `(${newItemId}, ${toppingId})`).join(',');
                    const toppingQuery = `
                        INSERT INTO order_toppings (order_item_id, topping_id)
                        VALUES ${toppingValues}`;
                    await dbClient.query(toppingQuery);
                }
            }
        }

        // Commit transaction
        await dbClient.query('COMMIT');

        return orderResult.rows[0]; // Return the updated order
    } catch (err) {
        // Rollback transaction in case of error
        await dbClient.query('ROLLBACK');
        throw err;
    }
};

// Delete an order
export const deleteOrder = async (orderId) => {
    const query = `DELETE FROM orders WHERE id = $1 RETURNING *`;
    try {
        const result = await dbClient.query(query, [orderId]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

export const updateOrderStatus = async (orderId, orderData) => {
    const { status } = orderData;

    try {
        // Begin transaction
        await dbClient.query('BEGIN');

        const orderQuery = `
            UPDATE orders 
            SET status = $1 
            WHERE id = $2 
            RETURNING *`;
        const orderValues = [status, orderId];
        const orderResult = await dbClient.query(orderQuery, orderValues);

        await dbClient.query('COMMIT');

        if (orderResult.rowCount === 0) {
            throw new Error(`Order with ID ${orderId} not found.`);
        }

        return orderResult.rows[0];
    } catch (err) {
        await dbClient.query('ROLLBACK');
        throw err;
    }
};
