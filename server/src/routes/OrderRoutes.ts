// routes/orderRoutes.ts
import express from 'express';
import { createOrderController, deleteOrderController, getAllOrdersController } from '../controllers/OrderController';

const router = express.Router();

router.post('/createOrders', createOrderController);
router.get('/allOrders', getAllOrdersController);
router.delete('/deleteOrders/:orderId', deleteOrderController);

export default router;