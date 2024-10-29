// src/api/blogApi.js
import apiClient from '../utils/apiClient';
export const createRestaurant = (restaurant) => apiClient.post('/api/restaurant', restaurant);