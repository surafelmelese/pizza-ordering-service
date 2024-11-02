import apiClient from '../utils/apiClient';

export const getAllRoles = () => apiClient.get('/api/role');
export const getRole = (id) => apiClient.get(`/api/role/${id}`)
export const createRole = (role) => apiClient.post('/api/role', role);
export const updateRole = (id, role) => apiClient.put(`/api/role/${id}`, role)
export const deleteRole = (id) => apiClient.delete(`/api/role/${id}`);