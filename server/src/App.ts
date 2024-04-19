import express, { Request, Response, ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import authRoutes from './routes/AuthRoutes';
import userRoutes from './routes/UserRoutes';
import profileRoutes from './routes/ProfileRoutes';
import ItemRoutes from './routes/ItemRoutes';
import OrderRoutes from './routes/OrderRoutes';

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
app.use('/authRoutes', authRoutes);
app.use('/userRoutes', userRoutes);
app.use('/profileRoutes', profileRoutes);
app.use('/ItemRoutes', ItemRoutes);
app.use('/OrderRoutes', OrderRoutes);


// Error handling middleware
app.use((err: ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
