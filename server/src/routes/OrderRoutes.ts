// routes/orderRoutes.ts
import express from 'express';
import { createOrderController } from '../controllers/OrderController';

const router = express.Router();

router.post('/createOrders', createOrderController);

export default router;