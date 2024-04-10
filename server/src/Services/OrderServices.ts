// services/orderService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrderServices = async (
  method: string,
  startDate: Date, endDate: Date,
  itemId: number, userId: number
) => {
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
export async function getAllOrdersService() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: {
          select: {
            email: true
          }
        },
        car: {
          select: {
            model: {
              select: {
                brand: {
                  select: {
                    name: true
                  }
                },
                name: true
              }
            }
          }
        },
        payment: {
          select: {
            method: true
          }
        }
      }
    });

    return orders.map(order => ({
      id: order.id,
      userEmail: order.user.email,
      startDate: order.startDate,
      endDate: order.endDate,
      paymentMethod: order.payment.method,
      carBrand: order.car.model.brand.name,
      carModel: order.car.model.name
    }));
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Error fetching orders');
  }
}