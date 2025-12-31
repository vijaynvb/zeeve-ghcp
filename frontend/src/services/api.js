// Axios instance centralizes HTTP configuration and helpers.
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/v1';

const api = axios.create({
  baseURL: API_BASE_URL
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const registerUser = (payload) => api.post('/auth/register', payload);
export const loginUser = (payload) => api.post('/auth/login', payload);
export const getProfile = () => api.get('/users/me');
export const updateProfile = (payload) => api.patch('/users/me', payload);
export const listTodos = (params) => api.get('/todos', { params });
export const createTodo = (payload) => api.post('/todos', payload);
export const updateTodo = (id, payload) => api.patch(`/todos/${id}`, payload);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
export const listUserDetails = () => api.get('/user-details');
export const createUserDetail = (payload) => api.post('/user-details', payload);

export default api;
