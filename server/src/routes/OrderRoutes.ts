// routes/orderRoutes.ts
import express from 'express';
import { createOrderController, getAllOrdersController } from '../controllers/OrderController';

const router = express.Router();

router.post('/createOrders', createOrderController);
router.get('/allOrders', getAllOrdersController);

export default router;