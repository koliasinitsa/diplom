// services/orderService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (method: string, startDate: Date, endDate: Date, itemId: number, userId: number) => {
  try {
    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        car: { connect: { id: itemId } },
        startDate,
        endDate,
        payment: {
          create: {
            method
          }
        }
      }
    });
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Could not create order');
  }
};