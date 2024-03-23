import express, { Request, Response, ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { Pool } from 'pg';
import authRoutes from './routes/AuthRoutes';
import userRoutes from './routes/UserRoutes';
import profileRoutes from './routes/ProfileRoutes';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import * as fs from "fs";

dotenv.config(); // Загрузка переменных окружения из файла .env


const prisma = new PrismaClient();
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


app.get('/cars', async (req: Request, res: Response) => {
  try {
    const cars = await prisma.car.findMany({
      include: {
        type: {
          select: {
            type: true,
            numberOfSeats: true,
            typeEngine: true,
            fuelRate: true,
          },
        },
        tarif: {
          select: {
            costDay: true,
            cost3Day: true,
            costWeek: true,
          },
        },
        transmission: {
          select: {
            transmission: true,
          },
        },
        model: {
          select: {
            name: true,
            year: true,
          },
        },
      },
    });

    const formattedCars = cars.map(car => ({
      id: car.id,
      type: car.type.type,
      numberOfSeats: car.type.numberOfSeats,
      typeEngine: car.type.typeEngine,
      fuelRate: car.type.fuelRate,
      costDay: car.tarif.costDay,
      cost3Day: car.tarif.cost3Day,
      costWeek: car.tarif.costWeek,
      transmission: car.transmission.transmission,
      name: car.model.name,
      year: car.model.year,
    }));

    res.json(formattedCars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ error: 'Error fetching cars' });
  }
});


const upload = multer({ dest: 'uploads/' });


app.post('/cars', upload.single('images'), async (req, res) => {
  try {
    const { type, numberOfSeats, typeEngine, 
      fuelRate, costDay, cost3Day, costWeek, 
      transmission, name, year } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    // Чтение байтов изображения из временного файла
    const photoData = await fs.promises.readFile(req.file.path);
    console.log("photoData", photoData)
    const createdCar = await prisma.car.create({
      data: {
        type: {
          create: {
            type,
            numberOfSeats: parseFloat(numberOfSeats), // Преобразование в число с плавающей точкой
            typeEngine,
            fuelRate: parseFloat(fuelRate), // Преобразование в число с плавающей точкой
          },
        },
        tarif: {
          create: {
            costDay: parseFloat(costDay), // Преобразование в число с плавающей точкой
            cost3Day: parseFloat(cost3Day), // Преобразование в число с плавающей точкой
            costWeek: parseFloat(costWeek), // Преобразование в число с плавающей точкой
          },
        },
        transmission: {
          create: {
            transmission,
          },
        },
        model: {
          create: {
            name,
            year: parseFloat(year), // Преобразование в число с плавающей точкой
          },
        },
        photo: {
          create: {
            photo: photoData, // Байты изображения
          },
        }
      },
      include: {
        type: true,
        tarif: true,
        transmission: true,
        model: true,
        photo: true,
      },
    });
    res.status(201).json(createdCar);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ error: 'Error creating car' });
  }
});


// Error handling middleware
app.use((err: ErrorRequestHandler, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
