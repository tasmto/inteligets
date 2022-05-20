import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
// * When using :colon based routes make sure they are below their more exact counterparts otherwise they will take over

export default router;
