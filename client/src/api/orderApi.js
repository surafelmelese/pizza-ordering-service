import apiClient from '../utils/apiClient';

export const getAllOrders = () => apiClient.get('/api/orders');
export const getOrder = (id) => apiClient.get(`/api/orders/${id}`)
export const getAllOrdersByUser = () => apiClient.get(`/api/user/orders`)
export const createOrder = (orders) => apiClient.post('/api/orders', orders);
export const updateOrder = (id, orders) => apiClient.put(`/api/orders/${id}`, orders)
export const updateOrderStatus = (id, orders) => apiClient.patch(`/api/orders/${id}/status`, orders)
export const deleteOrder = (id) => apiClient.delete(`/api/orders/${id}`);