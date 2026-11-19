import api from './api';

export const loginUser = async (email, password) => {
  return await api.post('/auth/login', { email, password });
};

export const registerUser = async (name, email, password) => {
  return await api.post('/auth/register', { name, email, password });
};

export const getMe = async () => {
  return await api.get('/auth/me');
};

export const updateProfile = async (profileData) => {
  return await api.patch('/auth/profile', profileData);
};
