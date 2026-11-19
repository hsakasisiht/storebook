import api from './api';
import { FALLBACK_BOOKS } from './bookService';

export const getAdminBooks = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const endpoint = query ? `/admin/books?${query}` : '/admin/books';
  try {
    return await api.get(endpoint);
  } catch (err) {
    return {
      success: true,
      books: FALLBACK_BOOKS,
      pagination: { total: FALLBACK_BOOKS.length, page: 1, pages: 1, limit: 20 },
    };
  }
};

export const createBook = async (bookData) => {
  return await api.post('/admin/books', bookData);
};

export const updateBook = async (id, bookData) => {
  return await api.patch(`/admin/books/${id}`, bookData);
};

export const deleteBook = async (id) => {
  return await api.delete(`/admin/books/${id}`);
};

export const createCategory = async (categoryData) => {
  return await api.post('/admin/categories', categoryData);
};
