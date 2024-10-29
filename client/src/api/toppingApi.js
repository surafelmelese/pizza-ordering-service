// src/api/blogApi.js
import apiClient from '../utils/apiClient';

export const getAllToppings = () => apiClient.get('/api/topping');
export const getTopping = (id) => apiClient.get(`/api/topping/${id}`)
export const createTopping = (topping) => apiClient.post('/api/topping', topping);
export const updateTopping = (id, topping) => apiClient.put(`/api/topping/${id}`, topping)
export const deleteTopping = (id) => apiClient.delete(`/api/topping/${id}`);