import express, { Request, Response, ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';


import authRoutes from './routes/AuthRoutes';
import userRoutes from './routes/UserRoutes';

dotenv.config(); // Загрузка переменных окружения из файла .env


//const prisma = new PrismaClient();
const app = express();
//const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());


// Routes
app.use('/auth', authRoutes);
app.use('/api', userRoutes);

// Error handling middleware
app.use((err: ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;