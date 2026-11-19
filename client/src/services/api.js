/**
 * API Service for Pandora Bookstore Frontend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const request = async (endpoint, options = {}) => {
  // Support both relative /api/endpoint and full URLs
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // Add auth token if available
  const token = localStorage.getItem('pandora_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error.message);
    throw error;
  }
};

export const checkApiHealth = async () => {
  try {
    const data = await request('/health');
    return data;
  } catch (err) {
    return { success: false, status: 'offline', message: err.message };
  }
};

export default {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  patch: (endpoint, body, options) => request(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
  checkHealth: checkApiHealth,
};
