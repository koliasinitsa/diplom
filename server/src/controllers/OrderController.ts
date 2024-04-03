// controllers/orderController.ts
import { Request, Response } from 'express';
import { createOrder } from '../Services/OrderServices';

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const { method, startDate, endDate, itemId, userId } = req.body;

    const order = await createOrder(method, new Date(startDate), new Date(endDate), itemId, userId);

    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Could not create order' });
  }
};