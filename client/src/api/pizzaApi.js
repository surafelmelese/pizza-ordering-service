import apiClient from '../utils/apiClient';

export const getAllPizzas = () => apiClient.get('api/pizza');

export const getPizza = (id) => apiClient.get(`/api/pizza/${id}`)
export const createPizza = (pizza) => apiClient.post('/api/pizza', pizza);
export const updatePizza = (id, pizza) => apiClient.put(`/api/pizza/${id}`, pizza)
export const deletePizza = (id) => apiClient.delete(`/api/pizza/${id}`);
