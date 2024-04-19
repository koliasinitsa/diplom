// controllers/orderController.ts
import { Request, Response } from 'express';
import { createOrderServices, deleteOrderService, getAllOrdersService } from '../Services/OrderServices';

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const { method, startDate, endDate, itemId, userId } = req.body;

    const order = await createOrderServices(method, new Date(startDate), new Date(endDate), itemId, userId);

    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Could not create order' });
  }
};

export async function getAllOrdersController(req: Request, res: Response) {
  try {
    const orders = await getAllOrdersService();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
}

export async function deleteOrderController(req: Request, res: Response) {
  const orderId = parseInt(req.params.orderId);

  try {
    await deleteOrderService(orderId);
    res.status(200).json({ message: 'Order and associated payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting order and payment:', error);
    res.status(500).json({ error: 'Error deleting order and payment' });
  }
}