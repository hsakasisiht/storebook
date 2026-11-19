import { Router } from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

// All cart endpoints require customer authentication
router.use(authenticate);

router.get('/', getCart);
router.post('/items', addToCart);
router.patch('/items/:bookId', updateCartItem);
router.delete('/items/:bookId', removeFromCart);
router.delete('/', clearCart);

export default router;
