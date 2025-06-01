import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1.80/api/auth',
});

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const register = async (username, email, password) => {
  const response = await api.post('/register', { username, email, password });
  return response.data;
};

export const checkAuth = async (token) => {
  const response = await api.get('/check', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};