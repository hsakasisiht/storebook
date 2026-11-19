import { Router } from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js';
import { createCategory } from '../controllers/categoryController.js';
import {
  getAdminOrders,
  updateOrderStatus,
  getOrderById,
} from '../controllers/orderController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeAdmin } from '../middleware/authorizeRole.js';

const router = Router();

// Middleware: All admin endpoints require authentication and admin role
router.use(authenticate, authorizeAdmin);

// Admin Book Management
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/books', createBook);
router.patch('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

// Admin Category Management
router.post('/categories', createCategory);

// Admin Order Management
router.get('/orders', getAdminOrders);
router.get('/orders/:id', getOrderById);
router.patch('/orders/:id/status', updateOrderStatus);

export default router;
