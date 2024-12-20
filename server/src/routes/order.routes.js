import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    updateOrderStatus,
    getAllOrdersByUser,
    deleteOrder
} from '../controllers/order.controller.js';
import { auth } from '../middleware/auth.js';
import { checkPermission } from '../middleware/permission.js';

const orderRouter = express.Router();
orderRouter.post('/api/orders', auth, checkPermission('create', 'Order'), createOrder);
orderRouter.get('/api/orders',auth, getAllOrders);
orderRouter.get('/api/orders/:orderId', auth, checkPermission('read', 'Order'), getOrderById);
orderRouter.put('/api/orders/:orderId', auth, checkPermission('update', 'Order'), updateOrder);
orderRouter.patch('/api/orders/:orderId/status', auth, checkPermission('update', 'Order'), updateOrderStatus);
orderRouter.get('/api/user/orders', auth, getAllOrdersByUser);
orderRouter.delete('/api/orders/:orderId', auth, checkPermission('delete', 'Order'), deleteOrder);

export default orderRouter;