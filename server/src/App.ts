import express, { Request, Response, ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/AuthRoutes';
import userRoutes from './routes/UserRoutes';
import profileRoutes from './routes/ProfileRoutes';
import ItemRoutes from './routes/ItemRoutes';

dotenv.config(); // Загрузка переменных окружения из файла .env

const app = express();
//const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/api', profileRoutes);
app.use('/api', ItemRoutes);

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// POST запрос для создания заказа айтема
app.post('/orders', async (req: Request, res: Response) => {
  try {
    const { method, startDate, endDate, itemId, userId } = req.body;

    // Создание заказа айтема
    const order = await prisma.order.create({
      data: {
        user: { connect: { id: userId } },
        car: { connect: { id: itemId } }, // Предполагается, что itemId соответствует ID машины
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        payment: {
          create: {
            method
          }
        }
      }
    });

    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Could not create order' });
  }
});

// Error handling middleware
app.use((err: ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
