import api from './api';

export const fetchCart = async () => {
  return await api.get('/cart');
};

export const addCartItem = async (bookId, quantity = 1) => {
  return await api.post('/cart/items', { bookId, quantity });
};

export const updateCartQty = async (bookId, quantity) => {
  return await api.patch(`/cart/items/${bookId}`, { quantity });
};

export const removeCartItem = async (bookId) => {
  return await api.delete(`/cart/items/${bookId}`);
};

export const clearCartItems = async () => {
  return await api.delete('/cart');
};
