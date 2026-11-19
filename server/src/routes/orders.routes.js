import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from '../controllers/orderController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

router.post('/', createOrder);
router.get('/my', getMyOrders);
router.get('/:id', getOrderById);

export default router;
