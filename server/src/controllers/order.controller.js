import * as OrderService from "../services/order.service.js";

// Create a new order
export const createOrder = async (req, res) => {
    const { orderData } = req.body;
    const userId = req.user_id;
    const restaurantId = req.restaurant_id;

    try {
        const newOrder = await OrderService.createOrder(userId, restaurantId, orderData);
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all orders with detailed information
export const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderService.getAllOrders();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await OrderService.getOrderById(orderId);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update an order
export const updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const orderData = req.body;

    try {
        const updatedOrder = await OrderService.updateOrder(orderId, orderData);
        if (updatedOrder) {
            res.status(200).json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an order
export const deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        const deletedOrder = await OrderService.deleteOrder(orderId);
        if (deletedOrder) {
            res.status(200).json(deletedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};