import api from './api';

export const createOrder = async (orderData) => {
  return await api.post('/orders', orderData);
};

export const getMyOrders = async () => {
  return await api.get('/orders/my');
};

export const getOrderById = async (id) => {
  return await api.get(`/orders/${id}`);
};

export const getAdminOrders = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `/admin/orders?${query}` : '/admin/orders';
  return await api.get(endpoint);
};

export const updateOrderStatus = async (id, status) => {
  return await api.patch(`/admin/orders/${id}/status`, { status });
};
