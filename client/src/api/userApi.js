import apiClient from '../utils/apiClient';

export const getAllUsers = () => apiClient.get('/api/users');
export const getUser = (id) => apiClient.get(`/api/users/${id}`)
export const createUser = (users) => apiClient.post('/api/user', users);
export const loginUser = (users) => apiClient.post('/api/login', users);
export const updateUser = (id, users) => apiClient.put(`/api/users/${id}`, users)
export const deleteUser = (id) => apiClient.delete(`/api/users/${id}`);